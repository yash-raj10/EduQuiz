const { Client, ContractCallQuery, ContractFunctionParameters } = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    // Create your Hedera testnet client
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    // Contract information
    const contractAddress = "0.0.4706758";
    const functionName = "getLeaderboard";

    // Build the contract call query
    const query = new ContractCallQuery()
        .setContractId(contractAddress)
        .setGas(100000)
        .setFunction(functionName, new ContractFunctionParameters());

    // Execute the query
    const result = await query.execute(client);

    console.log("Leaderboard Data:", result);

    // Decode the returned data (array of structs)
    const leaderboardLength = result.getUint256(0).toNumber();
    const leaderboard = [];

    for (let i = 0; i < leaderboardLength; i++) {
        const playerAddress = result.getAddress(i * 3 + 1);  // Each struct has 3 elements
        const score = result.getUint256(i * 3 + 2).toNumber();
        const timestamp = result.getUint256(i * 3 + 3).toNumber();

        leaderboard.push({
            playerAddress: playerAddress,
            score: score,
            timestamp: new Date(timestamp * 1000).toLocaleString() // Convert to human-readable date
        });
    }

    console.log("Leaderboard Data:", leaderboard);
}

main().catch((error) => {
    console.error("Error in script:", error);
    process.exit(1);
});