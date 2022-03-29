require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');

require('hardhat-contract-sizer');

require('dotenv').config();

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "01234567890123456789";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

module.exports = {
  solidity: "0.7.5",
  networks: {
    hardhat: {
      chainId: 3,
      gas: 8000000,
      gasMultiplier: 2,
      allowUnlimitedContractSize: true
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      gas: 8000000,
      gasMultiplier: 2,
      allowUnlimitedContractSize: true,
      accounts: [PRIVATE_KEY]
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      gas: 8000000,
      gasMultiplier: 2,
      allowUnlimitedContractSize: true,
      accounts: [PRIVATE_KEY]
    },
    mumbai: {
      // Infura
      // url: https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}
      url: "https://rpc-mumbai.matic.today",
      // url: "https://matic-mumbai.chainstacklabs.com/",
      accounts: [PRIVATE_KEY]
    },
    matic: {
      // Infura
      // url: https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY},
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
