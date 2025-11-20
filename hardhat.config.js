require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { getHardhatNetworkConfig } = require("./config/networks");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    // Local Hardhat Network
    hardhat: {
      chainId: 31337
    },
    
    // Ethereum Mainnet (L1 - Settlement Layer)
    mainnet: getHardhatNetworkConfig("mainnet"),
    
    // Ethereum Sepolia (L1 Testnet - Default for development)
    sepolia: getHardhatNetworkConfig("sepolia"),
    
    // Base Mainnet (L2 - User Interaction Layer)
    base: getHardhatNetworkConfig("base"),
    
    // Base Sepolia (L2 Testnet - Development)
    baseSepolia: getHardhatNetworkConfig("baseSepolia"),
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      base: process.env.BASESCAN_API_KEY || "",
      baseSepolia: process.env.BASESCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  },
};
