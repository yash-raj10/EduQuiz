const { Client, ContractExecuteTransaction, Hbar, ContractFunctionParameters } = require("@hashgraph/sdk");
require("dotenv").config();

async function main() {
    // Create your Hedera testnet client
    const client = Client.forTestnet();
    client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);

    // Contract information
    const contractAddress = "0.0.4706758";
    const functionName = "addScore";

    // Build the contract execute transaction
    const transaction = new ContractExecuteTransaction()
      .setContractId(contractAddress)
      .setGas(100_000_000)
      .setFunction(
        functionName,
        new ContractFunctionParameters()
          .addAddress("0x41817bB3d9628B238cb8Ba0D909D27AB319abEfF")
          .addUint256("69")
      );

    // Execute the transaction and get the receipt
    const txResponse = await transaction.execute(client);
    const receipt = await txResponse.getReceipt(client);

    console.log("Transaction successful with status: ", receipt.status.toString());
}

main().catch((error) => {
    console.error("Error in script:", error);
    process.exit(1);
});