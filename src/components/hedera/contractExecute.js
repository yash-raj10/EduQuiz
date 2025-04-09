import abi from "../../contracts/abi.js";
import { ethers } from "ethers";

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

        // GET THE LEADERBOARD STATE
        finalLeaderboard = await myContract.getLeaderboard();
        console.log(`- Score added. Transaction hash: \n${txHash} ✅`);
        console.log(`- Final leaderboard:`, finalLeaderboard);
    } catch (executeError) {
        console.log(`- ${executeError.message.toString()}`);
    }

    return [txHash, finalLeaderboard];
}

export default contractExecuteFcn;