/**
 * Web3 Configuration for MEMETH Frontend
 * 
 * RainbowKit + Wagmi setup with multi-network support
 * Philosophy: ETH L1 for settlement, L2 (Base) for UX/interaction
 */

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, base, baseSepolia } from 'wagmi/chains';

/**
 * Supported chains
 * 
 * Development (default): Sepolia + Base Sepolia
 * Production: Ethereum Mainnet + Base
 */
export const chains = [
  sepolia,        // L1 Testnet (default for development)
  baseSepolia,    // L2 Testnet (default for development)
  mainnet,        // L1 Mainnet (marked as "later")
  base,           // L2 Mainnet (marked as "later")
] as const;

/**
 * Get Wagmi configuration
 * 
 * Uses RainbowKit's getDefaultConfig for best practices
 */
export const config = getDefaultConfig({
  appName: 'MEMETH - Virtual Meme Trading',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains,
  ssr: true, // Enable server-side rendering
});

/**
 * Get contract address for current network
 * 
 * @param chainId - Chain ID of the network
 * @returns Contract address or undefined
 */
export function getContractAddress(chainId: number): string | undefined {
  const addresses: Record<number, string> = {
    // Sepolia (L1 Testnet)
    11155111: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA || '',
    
    // Base Sepolia (L2 Testnet)
    84532: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE_SEPOLIA || '',
    
    // Mainnet (L1)
    1: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET || '',
    
    // Base (L2)
    8453: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE || '',
    
    // Local Hardhat
    31337: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_HARDHAT || '',
  };

  return addresses[chainId];
}

/**
 * Check if network is a testnet
 * 
 * @param chainId - Chain ID
 * @returns true if testnet
 */
export function isTestnet(chainId: number): boolean {
  return [11155111, 84532, 31337].includes(chainId);
}

/**
 * Check if network is L1 (Ethereum)
 * 
 * @param chainId - Chain ID
 * @returns true if L1
 */
export function isL1Network(chainId: number): boolean {
  return [1, 11155111].includes(chainId);
}

/**
 * Check if network is L2 (Base)
 * 
 * @param chainId - Chain ID
 * @returns true if L2
 */
export function isL2Network(chainId: number): boolean {
  return [8453, 84532].includes(chainId);
}

/**
 * Get network label for UI
 * 
 * @param chainId - Chain ID
 * @returns Display name with badge
 */
export function getNetworkLabel(chainId: number): string {
  const labels: Record<number, string> = {
    1: 'Ethereum (Mainnet Later)',
    11155111: 'Sepolia (L1 Testnet)',
    8453: 'Base (Mainnet Later)',
    84532: 'Base Sepolia (L2 Testnet)',
    31337: 'Hardhat (Local)',
  };
  
  return labels[chainId] || 'Unknown Network';
}

/**
 * Get recommended network for development
 * 
 * @returns Chain ID of recommended network
 */
export function getRecommendedNetwork(): number {
  // Default to Sepolia for development
  return 11155111;
}

/**
 * Network configuration metadata
 */
export const networkMetadata = {
  sepolia: {
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    purpose: 'L1 Settlement Layer (Testnet)',
    isDefault: true,
    isTestnet: true,
    isL1: true,
  },
  baseSepolia: {
    name: 'Base Sepolia',
    chainId: 84532,
    purpose: 'L2 User Interaction (Testnet)',
    isDefault: true,
    isTestnet: true,
    isL1: false,
  },
  mainnet: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    purpose: 'L1 Settlement Layer (Production)',
    isDefault: false,
    isTestnet: false,
    isL1: true,
  },
  base: {
    name: 'Base',
    chainId: 8453,
    purpose: 'L2 User Interaction (Production)',
    isDefault: false,
    isTestnet: false,
    isL1: false,
  },
};
