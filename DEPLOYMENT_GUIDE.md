# 🚀 MEMETH Deployment Guide

Complete guide for deploying MEMETH contracts to Base mainnet and configuring the frontend.

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

# Edit .env and add your private key (use a secure wallet with proper key management!)
# Edit frontend/.env.local (we'll add contract addresses after deployment)
```

### 3. Get Base Mainnet ETH

Ensure you have sufficient ETH on Base mainnet for deployment:
- **Bridge ETH to Base**: https://bridge.base.org/deposit
- Bridge from Ethereum L1 to Base L2
- Deployment typically costs 0.001-0.01 ETH

### 4. Get API Keys (Required for Verification)

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

MEMETH is deployed on **Base mainnet** for optimal user experience:

### Base Mainnet
- **Chain ID**: 8453
- **RPC URL**: https://mainnet.base.org
- **Block Explorer**: https://basescan.org
- **Gas Costs**: ~10-100x cheaper than Ethereum L1
- **Purpose**: All contract operations, position management, and trading

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

### Step 2: Deploy to Base Mainnet

```bash
npm run deploy:baseMainnet
```

**Expected output:**
```
============================================================
MEMETH Platform Deployment
============================================================
Network: base
Deployer: 0x...
Balance: 0.234 ETH
============================================================

📦 Deploying MemethPlatform contract...
✅ MemethPlatform deployed to: 0xYourContractAddress
📝 Deployment info saved to: deployments/base.json

🪙 Adding initial memecoins...
   ✓ Added DOGE (Dogecoin) at 0.0001 ETH
   ✓ Added SHIB (Shiba Inu) at 0.00001 ETH
   ✓ Added PEPE (Pepe) at 0.000001 ETH

============================================================
✅ Deployment Complete!
============================================================
Contract Address: 0xYourContractAddress
Network: base
Block Explorer: https://basescan.org/address/0x...

Next steps:
1. Verify contract: npm run verify:baseMainnet
2. Interact with contract: npm run console:baseMainnet
3. Update frontend/.env with: NEXT_PUBLIC_CONTRACT_ADDRESS_BASE=0x...
============================================================
```

**What happens:**
1. Deploys MemethPlatform contract to Base mainnet
2. Adds initial memecoins for testing
3. Saves deployment info to `deployments/base.json`

**Save the contract address!** You'll need it for the frontend.

---

### Step 3: Verify Contract (Required)

```bash
npm run verify:baseMainnet
```

**Note**: You need your Basescan API key in `.env` for verification.

**Expected output:**
```
Successfully submitted source code for contract
contracts/MemethPlatform.sol:MemethPlatform at 0x...
for verification on the block explorer. Waiting for verification result...

Successfully verified contract MemethPlatform on Basescan.
https://basescan.org/address/0x...#code
```

---

### Step 4: Update Frontend Configuration

Edit `frontend/.env.local` and add your deployed contract address:

```bash
# From deployments/base.json
NEXT_PUBLIC_CONTRACT_ADDRESS_BASE=0xYourBaseMainnetContractAddress

# WalletConnect Project ID (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

---

### Step 5: Start Frontend

```bash
cd frontend
npm run dev
```

Visit: http://localhost:3000

**Connect wallet** to Base mainnet

---

## 🧪 Testing the Deployment

### 1. Connect Wallet
- Click "Connect Wallet" in the UI
- Select Base mainnet network
- Approve connection

### 2. Check Contract Info
```bash
npm run console:baseMainnet
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
**Solution**: Ensure you have enough ETH on Base mainnet. Bridge more from Ethereum L1.

### Issue 2: "Network not configured"
**Solution**: Check that `hardhat.config.js` has the correct Base network settings and your `.env` has `RPC_URL_BASE_MAINNET`

### Issue 3: "Private key not found"
**Solution**: Ensure `DEPLOYER_PRIVATE_KEY` is set in `.env` (without 0x prefix)

### Issue 4: "Verification failed"
**Solution**: 
- Ensure `BASESCAN_API_KEY` is set in `.env`
- Wait 1-2 minutes after deployment before verifying
- Check that the contract address is correct

### Issue 5: "Cannot connect wallet to Base"
**Solution**:
- Add Base network to your wallet manually
- Chain ID: 8453
- RPC: https://mainnet.base.org
- Block Explorer: https://basescan.org
- Most modern wallets have Base pre-configured

---

## 📊 Deployment Checklist

### Before Deployment
- [ ] Installed all dependencies (`npm install`)
- [ ] Created `.env` file with private key
- [ ] Have sufficient ETH on Base mainnet
- [ ] Have Basescan API key for verification

### Base Mainnet Deployment
- [ ] Compiled contracts successfully
- [ ] Deployed to Base mainnet
- [ ] Contract address saved
- [ ] Verified on Basescan
- [ ] Tested basic functions in console

### Frontend Setup
- [ ] Created `frontend/.env.local`
- [ ] Added Base mainnet contract address
- [ ] Added WalletConnect Project ID
- [ ] Started frontend (`npm run dev`)
- [ ] Connected wallet successfully
- [ ] Can see memecoins in UI

---

## 🎯 Production Best Practices

### 1. Security Audit
- Conduct formal security audit before launch
- Fix all critical and high issues
- Get sign-off from auditors

### 2. Setup Multi-Sig
- Transfer ownership to multi-sig wallet (e.g., Gnosis Safe)
- Require 2/3 or 3/5 signatures for admin actions
- Use Gnosis Safe on Base: https://app.safe.global

### 3. Monitoring
- Set up contract monitoring and alerts
- Monitor transaction volume and gas usage
- Track position metrics and platform health

### 4. Update Frontend
- Set production contract addresses
- Configure production environment
- Enable Base mainnet in wallet connection

---

## 📚 Additional Resources

### Network Documentation
- **Base**: https://docs.base.org
- **Base Network Information**: https://docs.base.org/network-information

### Development Tools
- **Hardhat**: https://hardhat.org/docs
- **RainbowKit**: https://rainbowkit.com/docs
- **Wagmi**: https://wagmi.sh
- **Viem**: https://viem.sh

### Bridges
- **Base Bridge**: https://bridge.base.org

### Block Explorer
- **Base**: https://basescan.org

---

## 🆘 Need Help?

- **GitHub Issues**: https://github.com/div-solves/memeth/issues
- **Documentation**: See all `.md` files in repository
- **Discord**: (to be created)

---

*Last Updated: 2025-11-25*  
*Version: 1.0.0*  
*Status: Base Mainnet Ready*
