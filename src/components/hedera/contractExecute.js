import abi from "../../contracts/abi.js";
import axios from "axios";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function contractExecuteFcn(walletData, contractAddress, score) {
    console.log(`\n=======================================`);
    console.log(`- Executing the smart contract...🟠`);

    // ETHERS PROVIDER AND SIGNER
    const provider = walletData[1];
    const signer = provider.getSigner();

    // EXECUTE THE SMART CONTRACT
    let txHash;
    let finalLeaderboard;
    try {
        // EXECUTE CONTRACT FUNCTION TO ADD SCORE
        const gasLimit = 100000;
        const myContract = new ethers.Contract(contractAddress, abi, signer);
        const addScoreTx = await myContract.addScore(score, { gasLimit: gasLimit });
        const addScoreRx = await addScoreTx.wait();
        txHash = addScoreRx.transactionHash;

        // WAIT FOR THE TRANSACTION TO BE MINED
        await delay(5000); // DELAY TO ALLOW MIRROR NODES TO UPDATE BEFORE QUERYING

        // GET THE LEADERBOARD STATE
        finalLeaderboard = await getLeaderboardState();
        console.log(`- Score added. Transaction hash: \n${txHash} ✅`);
        console.log(`- Final leaderboard:`, finalLeaderboard);
    } catch (executeError) {
        console.log(`- ${executeError.message.toString()}`);
    }

    return [txHash, finalLeaderboard];

    async function getLeaderboardState() {
        const leaderboardInfo = await axios.get(`https://${walletData[2]}.mirrornode.hedera.com/api/v1/contracts/${contractAddress}/state`);

        let leaderboard = [];
        if (leaderboardInfo.data.state.length > 0) {
            leaderboard = leaderboardInfo.data.state.map((entry) => {
                const playerAddress = entry.playerAddress;
                const scoreHex = entry.score;
                const timestamp = entry.timestamp;
                const scoreDec = parseInt(scoreHex, 16);
                return { playerAddress, score: scoreDec, timestamp };
            });
        }
        return leaderboard;
    }
}

export default contractExecuteFcn;