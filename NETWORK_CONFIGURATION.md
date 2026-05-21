# 🌐 MEMETH Network Configuration

## Architecture Philosophy

**ETH is the only real settlement asset. Everything else is virtual exposure.**

MEMETH is deployed on **Base mainnet** for optimal user experience:
- **Base (L2)**: All operations - Position management, settlements, low gas costs

---

## 📊 Supported Networks

### Production Network (Primary)

#### Base Mainnet
- **Chain ID**: `8453`
- **Purpose**: All platform operations
- **RPC**: `https://mainnet.base.org`
- **Explorer**: https://basescan.org
- **Gas**: Low (~10-100x cheaper than Ethereum L1)
- **Use for**: All user interactions, position management, settlements
- **Status**: ✅ **Production ready**

---

### Local Development

#### Hardhat Local Network
- **Chain ID**: `31337`
- **Purpose**: Local testing and development
- **Use for**: Contract testing, development

---

## 🔧 Configuration Files

### 1. Shared Network Config (`config/networks.js`)

Central configuration file used by both Hardhat and frontend.

**Key Functions**:
- `getHardhatNetworkConfig(networkName)` - For contract deployment
- `getWeb3ChainConfig(networkName)` - For frontend Web3

**Features**:
- Type-safe network mapping
- RPC URL management
- Chain ID constants
- Block explorer links
- Network metadata

---

### 2. Hardhat Config (`hardhat.config.js`)

Updated with Base mainnet configuration using shared config.

**Networks configured**:
```javascript
{
  hardhat: { chainId: 31337 },           // Local
  base: getHardhatNetworkConfig("base"), // Base mainnet
}
```

**Basescan verification**:
- Supports Basescan for Base mainnet
- Custom chains configured for verification

---

### 3. Frontend Web3 Config (`frontend/config/web3.ts`)

RainbowKit + Wagmi configuration for wallet connection.

**Features**:
- Multi-chain support (Sepolia, Base Sepolia, Mainnet, Base)
- Contract address mapping per network
- Network detection helpers
- UI labels with badge indicators

**Key Functions**:
```typescript
getContractAddress(chainId)    // Get contract for network
isTestnet(chainId)              // Check if testnet
isL1Network(chainId)            // Check if L1 (Ethereum)
isL2Network(chainId)            // Check if L2 (Base)
getNetworkLabel(chainId)        // UI label
```

---

### 3. Environment Variables

#### Root `.env`:
```bash
DEPLOYER_PRIVATE_KEY=          # For deployment
RPC_URL_BASE_MAINNET=          # Base mainnet RPC (optional, has default)
BASESCAN_API_KEY=              # For contract verification
REPORT_GAS=false               # Optional gas reporting
```

#### Frontend `.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

---

## 🚀 Deployment Commands

### Local Development
```bash
# Start local Hardhat node
npm run node

# Deploy to local network
npx hardhat run scripts/deploy.js --network hardhat
```

### Production Deployment
```bash
# Deploy to Base mainnet
npm run deploy:baseMainnet

# Verify on Basescan (replace <ADDRESS> with deployed contract address)
npx hardhat verify --network base <ADDRESS>

# Console on Base mainnet
npm run console:baseMainnet
```

---

## 🎮 Frontend Commands

### Start Development Server
```bash
cd frontend
npm run dev
```

### Connect to Networks
The frontend is configured for Base mainnet:
- **Production**: Base mainnet (Chain ID: 8453)

Users connect via their wallet to Base mainnet.

---

## 📋 Network Selection Guide

### Use Base Mainnet for:
- All production operations
- User interactions
- Position management
- Low gas costs
- Scalable operations

### Use Hardhat local for:
- Development testing
- Contract development
- Testing before deployment

---

## 🔍 Network Metadata

### Chain Information

| Network | Chain ID | Type | Purpose | Gas Cost | Status |
|---------|----------|------|---------|----------|--------|
| Hardhat | 31337 | Local | Development | N/A | ✅ Ready |
| Base | 8453 | L2 | Production | Low | ✅ Ready |

### Network Architecture

```
┌─────────────────────────────┐
│  Base Mainnet (L2)          │
│  • All Operations           │
│  • Position Management      │
│  • User Interaction         │
│  • Low Gas Costs            │
│  • ~10-100x cheaper than L1 │
└─────────────────────────────┘
```

---

## 🛠️ Future Network Support

If expanding to additional networks in the future (e.g., Arbitrum, Optimism):

### 1. Update `config/networks.js`
```javascript
const NETWORKS = {
  // ... existing networks
  arbitrum: {
    name: "Arbitrum One",
    chainId: 42161,
    rpcUrl: process.env.ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc",
    // ... other config
  },
};
```

### 2. Update `hardhat.config.js`
```javascript
networks: {
  // ... existing networks
  arbitrum: getHardhatNetworkConfig("arbitrum"),
}
```

### 3. Update `frontend/config/web3.ts`
```typescript
import { arbitrum } from 'wagmi/chains';

export const chains = [
  // ... existing chains
  arbitrum,
];
```

### 4. Update environment files
Add RPC URLs and contract addresses for new network.

---

## 📚 Additional Resources

### Network Documentation
- **Ethereum**: https://ethereum.org/developers
- **Sepolia**: https://sepolia.dev
- **Base**: https://docs.base.org
- **Base Sepolia**: https://docs.base.org/network-information

### RPC Providers
- **Public RPCs**: Listed in config/networks.js
- **Alchemy**: https://www.alchemy.com
- **Infura**: https://infura.io
- **QuickNode**: https://www.quicknode.com

### Block Explorer
- **Basescan**: https://basescan.org

---

## 🔒 Security Considerations

### Private Keys
- ⚠️ **NEVER** commit private keys to git
- Use secure wallets with proper key management
- Use hardware wallets or multi-sig for production
- Implement proper access controls

### RPC URLs
- Public RPCs may have rate limits
- Consider using your own RPC providers for production
- Redundant RPC providers recommended

### Network Configuration
- Always verify chain IDs before transactions (Base: 8453)
- Double-check network before deployment
- Test thoroughly on local network first

---

*Last Updated: 2025-11-25*  
*Configuration Version: 1.0.0*  
*Networks: 2 (1 local, 1 mainnet)*
