/**
 * Shared Network Configuration
 * 
 * This file provides type-safe network configurations for both
 * Hardhat deployment and frontend Web3 integration.
 * 
 * Philosophy: ETH L1 for settlement, L2 (Base) for UX/interaction
 */

// Chain IDs
const CHAIN_IDS = {
  MAINNET: 1,
  SEPOLIA: 11155111,
  BASE: 8453,
  BASE_SEPOLIA: 84532,
  HARDHAT: 31337,
};

// Network configurations
const NETWORKS = {
  mainnet: {
    name: "Ethereum Mainnet",
    chainId: CHAIN_IDS.MAINNET,
    rpcUrl: process.env.MAINNET_RPC_URL || "https://eth.llamarpc.com",
    blockExplorer: "https://etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    isTestnet: false,
    isL1: true,
    // Used for settlement only
    purpose: "L1 Settlement Layer",
  },
  sepolia: {
    name: "Ethereum Sepolia",
    chainId: CHAIN_IDS.SEPOLIA,
    rpcUrl: process.env.SEPOLIA_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com",
    blockExplorer: "https://sepolia.etherscan.io",
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
    },
    isTestnet: true,
    isL1: true,
    // Default testnet for development
    purpose: "L1 Development & Testing",
  },
  base: {
    name: "Base",
    chainId: CHAIN_IDS.BASE,
    rpcUrl: process.env.BASE_RPC_URL || "https://mainnet.base.org",
    blockExplorer: "https://basescan.org",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    isTestnet: false,
    isL1: false,
    // L2 for UX/interaction
    purpose: "L2 User Interaction Layer",
  },
  baseSepolia: {
    name: "Base Sepolia",
    chainId: CHAIN_IDS.BASE_SEPOLIA,
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
    blockExplorer: "https://sepolia.basescan.org",
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
    },
    isTestnet: true,
    isL1: false,
    // L2 testnet for development
    purpose: "L2 Development & Testing",
  },
  hardhat: {
    name: "Hardhat Network",
    chainId: CHAIN_IDS.HARDHAT,
    rpcUrl: "http://127.0.0.1:8545",
    blockExplorer: null,
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    isTestnet: true,
    isL1: true,
    purpose: "Local Development",
  },
};

/**
 * Get Hardhat network configuration
 * @param {string} networkName - Network name (mainnet, sepolia, base, baseSepolia)
 * @returns {object} Hardhat-compatible network config
 */
function getHardhatNetworkConfig(networkName) {
  const network = NETWORKS[networkName];
  if (!network) {
    throw new Error(`Unknown network: ${networkName}`);
  }

  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!privateKey && !network.isTestnet && networkName !== "hardhat") {
    console.warn(`⚠️  Warning: No DEPLOYER_PRIVATE_KEY set for ${networkName}`);
  }

  return {
    url: network.rpcUrl,
    chainId: network.chainId,
    accounts: privateKey ? [privateKey] : [],
    // Gas settings (can be overridden per network)
    gasPrice: networkName === "mainnet" || networkName === "base" ? "auto" : undefined,
    gas: networkName === "mainnet" || networkName === "base" ? "auto" : undefined,
  };
}

/**
 * Get frontend Web3 chain configuration (for RainbowKit/Wagmi)
 * @param {string} networkName - Network name
 * @returns {object} Chain config for wagmi
 */
function getWeb3ChainConfig(networkName) {
  const network = NETWORKS[networkName];
  if (!network) {
    throw new Error(`Unknown network: ${networkName}`);
  }

  return {
    id: network.chainId,
    name: network.name,
    network: networkName,
    nativeCurrency: network.nativeCurrency,
    rpcUrls: {
      default: { http: [network.rpcUrl] },
      public: { http: [network.rpcUrl] },
    },
    blockExplorers: network.blockExplorer
      ? {
          default: {
            name: network.name,
            url: network.blockExplorer,
          },
        }
      : undefined,
    testnet: network.isTestnet,
  };
}

/**
 * Get default networks for development
 * @returns {Array<string>} Network names
 */
function getDefaultNetworks() {
  return ["sepolia", "baseSepolia"];
}

/**
 * Get production networks
 * @returns {Array<string>} Network names
 */
function getProductionNetworks() {
  return ["mainnet", "base"];
}

/**
 * Get all testnet networks
 * @returns {Array<string>} Network names
 */
function getTestnetNetworks() {
  return Object.keys(NETWORKS).filter((key) => NETWORKS[key].isTestnet);
}

/**
 * Get L1 networks (for settlement)
 * @returns {Array<string>} Network names
 */
function getL1Networks() {
  return Object.keys(NETWORKS).filter((key) => NETWORKS[key].isL1);
}

/**
 * Get L2 networks (for UX/interaction)
 * @returns {Array<string>} Network names
 */
function getL2Networks() {
  return Object.keys(NETWORKS).filter((key) => !NETWORKS[key].isL1 && key !== "hardhat");
}

module.exports = {
  CHAIN_IDS,
  NETWORKS,
  getHardhatNetworkConfig,
  getWeb3ChainConfig,
  getDefaultNetworks,
  getProductionNetworks,
  getTestnetNetworks,
  getL1Networks,
  getL2Networks,
};
