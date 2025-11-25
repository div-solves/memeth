# ⚡ MEMETH Quick Deploy Guide

**Deploy to Base mainnet in 5 minutes!**

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

# Edit .env and add your private key
nano .env
```

Add to `.env`:
```bash
DEPLOYER_PRIVATE_KEY=your_private_key_without_0x
RPC_URL_BASE_MAINNET=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_api_key
```

### 3. Get Base Mainnet ETH
- **Bridge from Ethereum**: https://bridge.base.org/deposit

### 4. Deploy to Base Mainnet
```bash
npm run deploy:baseMainnet
```

**Copy the contract address from output!**

### 5. Verify Contract
```bash
npx hardhat verify --network base <CONTRACT_ADDRESS>
```

Replace `<CONTRACT_ADDRESS>` with your deployed address from step 4.

### 6. Update Frontend Config
Edit `frontend/.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE=0xYourBaseMainnetAddress
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
- Select Base mainnet
- Start trading!

---

## 📋 All Commands

### Deployment
```bash
npm run deploy:baseMainnet      # Deploy to Base mainnet
npm run node                    # Start local Hardhat node
```

### Verification
```bash
npx hardhat verify --network base <CONTRACT_ADDRESS>  # Verify on Basescan
```

### Testing
```bash
npm run compile:contracts       # Compile Solidity
npm test                        # Run tests
npm run type-check              # Type check TypeScript
npm run lint                    # Lint code
npm run console:baseMainnet     # Hardhat console on Base mainnet
```

### Frontend
```bash
npm run dev                     # Start development server
npm run build                   # Build for production
npm run start                   # Start production server
```

---

## 🌐 Network

### Production (Base Mainnet)
- **Base** (L2) - Chain ID: 8453
- **RPC**: https://mainnet.base.org
- **Explorer**: https://basescan.org

---

## 📝 Environment Variables Cheat Sheet

### Root `.env`
```bash
DEPLOYER_PRIVATE_KEY=           # Your private key (no 0x)
RPC_URL_BASE_MAINNET=           # Base mainnet RPC (default provided)
BASESCAN_API_KEY=               # For contract verification
REPORT_GAS=false                # Optional gas reporting
```

### Frontend `.env.local`
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

---

## 🆘 Common Issues

**"Insufficient funds"**
→ Bridge more ETH to Base mainnet

**"Private key not found"**
→ Add `DEPLOYER_PRIVATE_KEY` to `.env`

**"Cannot connect wallet"**
→ Add Base mainnet to your wallet (Chain ID: 8453)

**"Verification failed"**
→ Ensure `BASESCAN_API_KEY` is set and wait 1-2 minutes after deployment

---

## 📚 Full Documentation

- **DEPLOYMENT_GUIDE.md** - Complete deployment walkthrough
- **START_HERE.md** - General project overview
- **QUICK_START.md** - Development setup

---

## ✅ Deployment Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Created `.env` with private key and API keys
- [ ] Have Base mainnet ETH
- [ ] Deployed to Base mainnet (`npm run deploy:baseMainnet`)
- [ ] Verified contract (`npx hardhat verify --network base <ADDRESS>`)
- [ ] Updated `frontend/.env.local` with contract address
- [ ] Got WalletConnect Project ID
- [ ] Started frontend (`npm run dev`)
- [ ] Connected wallet successfully
- [ ] Tested basic functions

---

**Need help?** See full guides or open an issue!

*Last Updated: 2025-11-25*
