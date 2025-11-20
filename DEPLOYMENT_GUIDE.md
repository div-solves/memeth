# 🚀 MEMETH Deployment Guide

Complete guide for deploying MEMETH contracts and configuring the frontend.

---

## 📋 Prerequisites

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
# Copy example files
cp .env.example .env
cp frontend/.env.example frontend/.env.local

# Edit .env and add your private key (test wallet only!)
# Edit frontend/.env.local (we'll add contract addresses after deployment)
```

### 3. Get Testnet ETH

#### Sepolia ETH:
- **Faucet 1**: https://sepoliafaucet.com
- **Faucet 2**: https://www.alchemy.com/faucets/ethereum-sepolia
- **Faucet 3**: https://faucets.chain.link/sepolia

#### Base Sepolia ETH:
1. First, get Sepolia ETH (above)
2. Bridge to Base Sepolia: https://bridge.base.org/deposit
3. Or use Base Sepolia faucet: https://portal.cdp.coinbase.com/products/faucet

### 4. Get API Keys (Optional but Recommended)

#### Etherscan API Key:
- Visit: https://etherscan.io/apis
- Create account and generate API key
- Add to `.env`: `ETHERSCAN_API_KEY=your_key_here`

#### Basescan API Key:
- Visit: https://basescan.org/apis
- Create account and generate API key
- Add to `.env`: `BASESCAN_API_KEY=your_key_here`

#### WalletConnect Project ID:
- Visit: https://cloud.walletconnect.com
- Create new project
- Copy Project ID
- Add to `frontend/.env.local`: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_here`

---

## 🔧 Network Configuration

MEMETH uses a **hybrid L1/L2 architecture**:

### L1 (Ethereum)
- **Purpose**: Settlement layer
- **Networks**: Mainnet (production), Sepolia (testnet)
- **Use for**: Final ETH settlements, treasury
- **Gas**: Higher

### L2 (Base)
- **Purpose**: User interaction layer
- **Networks**: Base (production), Base Sepolia (testnet)
- **Use for**: Position management, trading UI
- **Gas**: Lower (~10-100x cheaper)

---

## 📦 Deployment Steps

### Step 1: Compile Contracts
```bash
npm run compile:contracts
```

**Expected output:**
```
Compiled 3 Solidity files successfully
```

---

### Step 2: Deploy to Sepolia (L1 Testnet)

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Expected output:**
```
============================================================
MEMETH Platform Deployment
============================================================
Network: sepolia
Deployer: 0x...
Balance: 1.234 ETH
============================================================

📦 Deploying MemethPlatform contract...
✅ MemethPlatform deployed to: 0xYourContractAddress
📝 Deployment info saved to: deployments/sepolia.json

🪙 Adding initial memecoins for testing...
   ✓ Added DOGE (Dogecoin) at 0.0001 ETH
   ✓ Added SHIB (Shiba Inu) at 0.00001 ETH
   ✓ Added PEPE (Pepe) at 0.000001 ETH

============================================================
✅ Deployment Complete!
============================================================
Contract Address: 0xYourContractAddress
Network: sepolia
Block Explorer: https://sepolia.etherscan.io/address/0x...

Next steps:
1. Verify contract: npx hardhat verify --network sepolia 0x...
2. Interact with contract: npx hardhat console --network sepolia
3. Update frontend/.env with: NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0x...
============================================================
```

**What happens:**
1. Deploys MemethPlatform contract
2. Adds 3 test memecoins (DOGE, SHIB, PEPE)
3. Saves deployment info to `deployments/sepolia.json`

**Save the contract address!** You'll need it for the frontend.

---

### Step 3: Deploy to Base Sepolia (L2 Testnet)

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

**Expected output:** (similar to Step 2)

**Save the contract address!**

---

### Step 4: Verify Contracts (Optional but Recommended)

#### Verify on Sepolia:
```bash
npx hardhat verify --network sepolia 0xYourContractAddress
```

#### Verify on Base Sepolia:
```bash
npx hardhat verify --network baseSepolia 0xYourContractAddress
```

**Note**: You need API keys in `.env` for verification.

**Expected output:**
```
Successfully submitted source code for contract
contracts/MemethPlatform.sol:MemethPlatform at 0x...
for verification on the block explorer. Waiting for verification result...

Successfully verified contract MemethPlatform on Etherscan.
https://sepolia.etherscan.io/address/0x...#code
```

---

### Step 5: Update Frontend Configuration

Edit `frontend/.env.local` and add your deployed contract addresses:

```bash
# From deployments/sepolia.json
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xYourSepoliaContractAddress

# From deployments/baseSepolia.json
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE_SEPOLIA=0xYourBaseSepoliaContractAddress

# WalletConnect Project ID (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

---

### Step 6: Start Frontend

```bash
cd frontend
npm run dev
```

Visit: http://localhost:3000

**Connect wallet** to either:
- Sepolia (L1 Testnet)
- Base Sepolia (L2 Testnet)

---

## 🧪 Testing the Deployment

### 1. Connect Wallet
- Click "Connect Wallet" in the UI
- Select Sepolia or Base Sepolia network
- Approve connection

### 2. Check Contract Info
```bash
npx hardhat console --network sepolia
```

In the console:
```javascript
const platform = await ethers.getContractAt("MemethPlatform", "0xYourContractAddress");

// Check owner
await platform.owner();

// Check memecoins
await platform.getAllMemecoins();

// Check a specific memecoin
await platform.memecoins("DOGE");
```

### 3. Test Deposit (Frontend)
1. Connect wallet
2. Click "Deposit" (when UI is built)
3. Deposit 0.1 ETH
4. Check balance

### 4. Test Position Opening (Frontend)
1. Find a meme (e.g., DOGE)
2. Click "Buy" (open LONG position)
3. Enter amount (e.g., 0.01 ETH)
4. Confirm transaction
5. Check your position

---

## 🚨 Common Issues & Solutions

### Issue 1: "Insufficient funds"
**Solution**: Get more testnet ETH from faucets (see Prerequisites)

### Issue 2: "Network not configured"
**Solution**: Check that `hardhat.config.js` has the correct network settings and your `.env` has RPC URLs

### Issue 3: "Private key not found"
**Solution**: Ensure `DEPLOYER_PRIVATE_KEY` is set in `.env` (without 0x prefix)

### Issue 4: "Verification failed"
**Solution**: 
- Ensure API keys are set in `.env`
- Wait 1-2 minutes after deployment before verifying
- Check that the contract address is correct

### Issue 5: "Cannot connect wallet to Sepolia"
**Solution**:
- Add Sepolia network to your wallet manually
- Chain ID: 11155111
- RPC: https://ethereum-sepolia-rpc.publicnode.com
- Block Explorer: https://sepolia.etherscan.io

### Issue 6: "Cannot connect wallet to Base Sepolia"
**Solution**:
- Add Base Sepolia network to your wallet manually
- Chain ID: 84532
- RPC: https://sepolia.base.org
- Block Explorer: https://sepolia.basescan.org

---

## 📊 Deployment Checklist

### Before Deployment
- [ ] Installed all dependencies (`npm install`)
- [ ] Created `.env` file with private key
- [ ] Have testnet ETH (Sepolia + Base Sepolia)
- [ ] (Optional) Have API keys for verification

### Sepolia Deployment
- [ ] Compiled contracts successfully
- [ ] Deployed to Sepolia
- [ ] Contract address saved
- [ ] (Optional) Verified on Etherscan
- [ ] Tested basic functions in console

### Base Sepolia Deployment
- [ ] Deployed to Base Sepolia
- [ ] Contract address saved
- [ ] (Optional) Verified on Basescan
- [ ] Tested basic functions in console

### Frontend Setup
- [ ] Created `frontend/.env.local`
- [ ] Added Sepolia contract address
- [ ] Added Base Sepolia contract address
- [ ] Added WalletConnect Project ID
- [ ] Started frontend (`npm run dev`)
- [ ] Connected wallet successfully
- [ ] Can see memecoins in UI

---

## 🎯 Production Deployment (Later!)

⚠️ **DO NOT deploy to mainnet yet!** Complete testnet testing first.

When ready for production:

### 1. Security Audit
- Conduct formal security audit
- Fix all critical and high issues
- Get sign-off from auditors

### 2. Mainnet Deployment

#### Deploy to Ethereum Mainnet (L1):
```bash
npx hardhat run scripts/deploy.js --network mainnet
```

#### Deploy to Base (L2):
```bash
npx hardhat run scripts/deploy.js --network base
```

### 3. Setup Multi-Sig
- Transfer ownership to multi-sig wallet (e.g., Gnosis Safe)
- Require 2/3 or 3/5 signatures for admin actions

### 4. Verify Contracts
```bash
npx hardhat verify --network mainnet 0xYourAddress
npx hardhat verify --network base 0xYourAddress
```

### 5. Update Frontend
- Set production contract addresses
- Update environment to production
- Enable mainnet networks in UI

---

## 📚 Additional Resources

### Network Documentation
- **Ethereum Sepolia**: https://sepolia.dev
- **Base**: https://docs.base.org
- **Base Sepolia**: https://docs.base.org/network-information

### Development Tools
- **Hardhat**: https://hardhat.org/docs
- **RainbowKit**: https://rainbowkit.com/docs
- **Wagmi**: https://wagmi.sh
- **Viem**: https://viem.sh

### Faucets & Bridges
- **Sepolia Faucet**: https://sepoliafaucet.com
- **Base Bridge**: https://bridge.base.org
- **Base Faucet**: https://portal.cdp.coinbase.com/products/faucet

### Block Explorers
- **Sepolia**: https://sepolia.etherscan.io
- **Base Sepolia**: https://sepolia.basescan.org
- **Mainnet**: https://etherscan.io
- **Base**: https://basescan.org

---

## 🆘 Need Help?

- **GitHub Issues**: https://github.com/div-solves/memeth/issues
- **Documentation**: See all `.md` files in repository
- **Discord**: (to be created)

---

*Last Updated: 2025-11-20*  
*Version: 1.0.0*  
*Status: Testnet Ready*
