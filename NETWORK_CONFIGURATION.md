# 🌐 MEMETH Network Configuration

## Architecture Philosophy

**ETH is the only real settlement asset. Everything else is virtual exposure.**

MEMETH uses a **hybrid L1/L2 architecture**:
- **L1 (Ethereum)**: Settlement layer - Final ETH settlements, treasury
- **L2 (Base)**: User interaction layer - Position management, lower gas

---

## 📊 Supported Networks

### Development Networks (Default)

#### 1. Ethereum Sepolia (L1 Testnet)
- **Chain ID**: `11155111`
- **Purpose**: L1 Settlement Layer (Testing)
- **RPC**: `https://ethereum-sepolia-rpc.publicnode.com`
- **Explorer**: https://sepolia.etherscan.io
- **Faucet**: https://sepoliafaucet.com
- **Gas**: Moderate (testnet)
- **Use for**: Testing treasury settlements, final ETH transactions

#### 2. Base Sepolia (L2 Testnet)
- **Chain ID**: `84532`
- **Purpose**: L2 User Interaction (Testing)
- **RPC**: `https://sepolia.base.org`
- **Explorer**: https://sepolia.basescan.org
- **Faucet**: https://bridge.base.org/deposit (bridge from Sepolia)
- **Gas**: Low (~10-100x cheaper than L1)
- **Use for**: Testing user interactions, position management

---

### Production Networks (Later)

#### 3. Ethereum Mainnet (L1 Production)
- **Chain ID**: `1`
- **Purpose**: L1 Settlement Layer (Production)
- **RPC**: `https://eth.llamarpc.com`
- **Explorer**: https://etherscan.io
- **Gas**: High
- **Use for**: Real ETH settlements, treasury operations
- **Status**: ⚠️ **Configured but DO NOT deploy yet**

#### 4. Base (L2 Production)
- **Chain ID**: `8453`
- **Purpose**: L2 User Interaction (Production)
- **RPC**: `https://mainnet.base.org`
- **Explorer**: https://basescan.org
- **Gas**: Low (~10-100x cheaper than L1)
- **Use for**: User interactions, position management
- **Status**: ⚠️ **Configured but DO NOT deploy yet**

---

## 🔧 Configuration Files

### 1. Shared Network Config (`config/networks.js`)

Central configuration file used by both Hardhat and frontend.

**Key Functions**:
- `getHardhatNetworkConfig(networkName)` - For contract deployment
- `getWeb3ChainConfig(networkName)` - For frontend Web3
- `getL1Networks()` - Get L1 networks (Ethereum)
- `getL2Networks()` - Get L2 networks (Base)
- `getTestnetNetworks()` - Get testnet networks
- `getDefaultNetworks()` - Get default development networks

**Features**:
- Type-safe network mapping
- RPC URL management
- Chain ID constants
- Block explorer links
- Network metadata (isL1, isTestnet, purpose)

---

### 2. Hardhat Config (`hardhat.config.js`)

Updated with all networks using shared config.

**Networks configured**:
```javascript
{
  hardhat: { chainId: 31337 },           // Local
  sepolia: getHardhatNetworkConfig("sepolia"),
  baseSepolia: getHardhatNetworkConfig("baseSepolia"),
  mainnet: getHardhatNetworkConfig("mainnet"),
  base: getHardhatNetworkConfig("base"),
}
```

**Etherscan verification**:
- Supports Etherscan (Ethereum)
- Supports Basescan (Base)
- Custom chains configured for Base networks

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

### 4. Environment Variables

#### Root `.env`:
```bash
DEPLOYER_PRIVATE_KEY=          # For deployment
SEPOLIA_RPC_URL=               # Sepolia RPC
BASE_SEPOLIA_RPC_URL=          # Base Sepolia RPC
MAINNET_RPC_URL=               # Mainnet RPC (optional)
BASE_RPC_URL=                  # Base RPC (optional)
ETHERSCAN_API_KEY=             # For verification
BASESCAN_API_KEY=              # For Base verification
```

#### Frontend `.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE_SEPOLIA=
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

---

## 🚀 Deployment Commands

### Local Development
```bash
# Start local Hardhat node
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.js --network hardhat
```

### Testnet Deployment (Current)
```bash
# Deploy to Sepolia (L1 Testnet)
npx hardhat run scripts/deploy.js --network sepolia

# Deploy to Base Sepolia (L2 Testnet)
npx hardhat run scripts/deploy.js --network baseSepolia

# Verify on Sepolia
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>

# Verify on Base Sepolia
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS>
```

### Production Deployment (Later!)
```bash
# ⚠️ DO NOT RUN THESE YET - Only after security audit!

# Deploy to Ethereum Mainnet (L1)
npx hardhat run scripts/deploy.js --network mainnet

# Deploy to Base (L2)
npx hardhat run scripts/deploy.js --network base
```

---

## 🎮 Frontend Commands

### Start Development Server
```bash
cd frontend
npm run dev
```

### Connect to Networks
The frontend automatically supports:
- **Default (Development)**: Sepolia, Base Sepolia
- **Available (Production)**: Mainnet, Base (marked as "later")

Users can switch networks using their wallet's network selector.

---

## 📋 Network Selection Guide

### When to use each network:

#### Use Sepolia when:
- Testing L1 settlement logic
- Testing treasury operations
- Need final ETH settlements
- Testing cross-chain bridges

#### Use Base Sepolia when:
- Testing user interactions
- Testing position management
- Want lower gas costs
- Testing frequent transactions

#### Use Mainnet when (later):
- Production L1 settlements
- Real ETH treasury operations
- Maximum security required

#### Use Base when (later):
- Production user interactions
- Lower gas for users
- Scalable operations

---

## 🔍 Network Metadata

### Chain Information

| Network | Chain ID | Type | Purpose | Gas Cost | Status |
|---------|----------|------|---------|----------|--------|
| Hardhat | 31337 | Local | Development | N/A | ✅ Ready |
| Sepolia | 11155111 | L1 Testnet | Settlement Testing | Moderate | ✅ Ready |
| Base Sepolia | 84532 | L2 Testnet | Interaction Testing | Low | ✅ Ready |
| Mainnet | 1 | L1 | Settlement | High | ⚠️ Later |
| Base | 8453 | L2 | Interaction | Low | ⚠️ Later |

### Network Relationships

```
                    TESTNET                         MAINNET
                                                    
┌─────────────────────────────┐      ┌─────────────────────────────┐
│  Ethereum Sepolia (L1)      │      │  Ethereum Mainnet (L1)      │
│  • Settlement Layer         │      │  • Settlement Layer         │
│  • Treasury                 │      │  • Treasury                 │
│  • Final ETH Settlements    │      │  • Final ETH Settlements    │
└──────────────┬──────────────┘      └──────────────┬──────────────┘
               │                                     │
               │ Bridge                              │ Bridge
               │                                     │
┌──────────────┴──────────────┐      ┌──────────────┴──────────────┐
│  Base Sepolia (L2)          │      │  Base (L2)                  │
│  • User Interaction         │      │  • User Interaction         │
│  • Position Management      │      │  • Position Management      │
│  • Lower Gas Costs          │      │  • Lower Gas Costs          │
└─────────────────────────────┘      └─────────────────────────────┘
```

---

## 🛠️ Adding New Networks (Future)

To add support for additional networks (e.g., Arbitrum, Optimism):

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

### Block Explorers
- **Etherscan**: https://etherscan.io
- **Sepolia Etherscan**: https://sepolia.etherscan.io
- **Basescan**: https://basescan.org
- **Base Sepolia**: https://sepolia.basescan.org

---

## 🔒 Security Considerations

### Private Keys
- ⚠️ **NEVER** commit private keys to git
- Use separate wallets for testnet and mainnet
- Use test wallets with minimal funds for development
- Use hardware wallets or multi-sig for production

### RPC URLs
- Public RPCs may have rate limits
- Consider using your own RPC providers for production
- Redundant RPC providers recommended

### Network Configuration
- Always verify chain IDs before transactions
- Double-check network before mainnet deployment
- Test thoroughly on testnets first

---

*Last Updated: 2025-11-20*  
*Configuration Version: 1.0.0*  
*Networks: 5 (1 local, 2 testnet, 2 mainnet)*
