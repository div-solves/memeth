# ⚡ MEMETH Quick Deploy Guide

**Get up and running in 5 minutes!**

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Copy environment templates
cp .env.example .env
cp frontend/.env.example frontend/.env.local

# Edit .env and add your private key (use test wallet!)
nano .env
```

Add to `.env`:
```bash
DEPLOYER_PRIVATE_KEY=your_private_key_without_0x
```

### 3. Get Testnet ETH
- **Sepolia**: https://sepoliafaucet.com
- **Base Sepolia**: https://bridge.base.org/deposit

### 4. Deploy to Sepolia
```bash
npm run deploy:sepolia
```

**Copy the contract address from output!**

### 5. Deploy to Base Sepolia
```bash
npm run deploy:baseSepolia
```

**Copy this contract address too!**

### 6. Update Frontend Config
Edit `frontend/.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xYourSepoliaAddress
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE_SEPOLIA=0xYourBaseSepoliaAddress
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=get_from_walletconnect_cloud
```

Get WalletConnect ID: https://cloud.walletconnect.com

### 7. Start Frontend
```bash
npm run dev
```

Visit: http://localhost:3000

### 8. Connect Wallet
- Click "Connect Wallet"
- Select Sepolia or Base Sepolia
- Start testing!

---

## 📋 All Commands

### Deployment
```bash
npm run deploy:sepolia          # Deploy to Sepolia (L1)
npm run deploy:baseSepolia      # Deploy to Base Sepolia (L2)
npm run deploy:local            # Deploy to local Hardhat
```

### Verification
```bash
npm run verify:sepolia <ADDRESS>      # Verify on Etherscan
npm run verify:baseSepolia <ADDRESS>  # Verify on Basescan
```

### Testing
```bash
npm run compile:contracts       # Compile Solidity
npm run test:contracts          # Run tests
npm run node                    # Start local Hardhat node
npm run console:sepolia         # Hardhat console on Sepolia
npm run console:baseSepolia     # Hardhat console on Base Sepolia
```

### Frontend
```bash
npm run dev                     # Start development server
npm run build                   # Build for production
npm run start                   # Start production server
```

---

## 🌐 Networks

### Development (Default)
- **Sepolia** (L1 Testnet) - Chain ID: 11155111
- **Base Sepolia** (L2 Testnet) - Chain ID: 84532

### Production (Later)
- **Ethereum Mainnet** (L1) - Chain ID: 1
- **Base** (L2) - Chain ID: 8453

---

## 📝 Environment Variables Cheat Sheet

### Root `.env`
```bash
DEPLOYER_PRIVATE_KEY=           # Your private key (no 0x)
SEPOLIA_RPC_URL=                # Optional (has default)
BASE_SEPOLIA_RPC_URL=           # Optional (has default)
ETHERSCAN_API_KEY=              # For verification
BASESCAN_API_KEY=               # For verification
```

### Frontend `.env.local`
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE_SEPOLIA=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

---

## 🆘 Common Issues

**"Insufficient funds"**
→ Get testnet ETH from faucets

**"Private key not found"**
→ Add `DEPLOYER_PRIVATE_KEY` to `.env`

**"Cannot connect wallet"**
→ Add network manually to your wallet (see DEPLOYMENT_GUIDE.md)

**"Verification failed"**
→ Wait 1-2 minutes after deployment, then try again

---

## 📚 Full Documentation

- **DEPLOYMENT_GUIDE.md** - Complete deployment walkthrough
- **NETWORK_CONFIGURATION.md** - Architecture and networks
- **START_HERE.md** - General project overview
- **NEXT_STEPS.md** - Development roadmap

---

## ✅ Deployment Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Created `.env` with private key
- [ ] Have Sepolia ETH (from faucet)
- [ ] Have Base Sepolia ETH (bridged from Sepolia)
- [ ] Deployed to Sepolia (`npm run deploy:sepolia`)
- [ ] Deployed to Base Sepolia (`npm run deploy:baseSepolia`)
- [ ] Updated `frontend/.env.local` with addresses
- [ ] Got WalletConnect Project ID
- [ ] Started frontend (`npm run dev`)
- [ ] Connected wallet successfully
- [ ] Tested basic functions

---

**Need help?** See full guides or open an issue!

*Last Updated: 2025-11-20*
