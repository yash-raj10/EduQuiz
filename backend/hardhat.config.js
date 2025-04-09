require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = "";

//Token address: 0x80b865423DfAA4AD644871Ae11c2500Ba84e2C62

module.exports = {
  solidity: "0.8.23",
  // networks: {
  //   hedera: {
  //     url: `https://testnet.hashio.io/api`,
  //     accounts: [PRIVATE_KEY]
  //   }
  // }

  networks: {
    codexTestnet: {
      url: "https://rpc.open-campus-codex.gelato.digital",
      chainId: 656476,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
