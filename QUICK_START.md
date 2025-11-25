# 🚀 MEMETH Quick Start Guide

Welcome to MEMETH! This guide will help you get started quickly.

## 📋 What is MEMETH?

MEMETH is a virtual meme market where you can:
- Create memes (stored as metadata, not tokens)
- Open virtual exposure positions on memes
- Close positions and settle P&L in ETH
- Trade without risk of rugpulls or scams

**Key Difference:** No actual tokens are created. Everything is virtual exposure settled in real ETH.

## ⚡ Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Compile smart contracts
npm run compile:contracts

# 3. Run tests
npm test

# 4. Start the frontend
cd frontend
npm run dev
```

Visit http://localhost:3000 to see the UI!

## 🏗️ Architecture Overview

### 1. Smart Contracts (Solidity)
- **MemethTreasury.sol**: Holds ETH, settles positions
- **MemeRegistry.sol**: Stores meme metadata

### 2. Offchain Engine (TypeScript)
- **pricing.ts**: Calculate meme prices
- **exposure.ts**: Manage positions
- **simulation.ts**: Risk analysis

### 3. Frontend (Next.js + React)
- **index.tsx**: Main landing page
- **MemeCard.tsx**: Display meme stats
- **CreateMeme.tsx**: Create new memes

## 🔧 Key Concepts

### Virtual Exposure
Unlike traditional meme tokens, MEMETH uses **virtual positions**:
- You deposit ETH into the treasury
- You "open exposure" on a meme (no token transfer)
- Price changes based on mathematical formulas
- When you close, P&L is settled in ETH

### No Rugpull Risk
Because there are no real tokens:
- ❌ No liquidity pools to drain
- ❌ No admin keys to exploit
- ❌ No token contract to backdoor
- ✅ Only ETH in/out of treasury
- ✅ Pure mathematical settlement

### Fair Pricing
Prices are calculated based on:
- Total exposure on the meme
- Community activity score
- Volatility factor
- Time-based dynamics

## 📝 Example Flow

### Creating a Meme
```javascript
// User pays small creation fee
createMeme({
  name: "Doge to Moon",
  symbol: "MOON",
  imageUri: "ipfs://..."
})
// Result: Meme registered, no token created
```

### Opening a Position
```javascript
// User deposits ETH
deposit(1.0 ETH)

// User opens exposure
openPosition({
  memeId: 1,
  amount: 0.5 ETH
})
// Result: Virtual position created, 0.5 ETH locked
```

### Closing a Position
```javascript
// Price went from 0.0001 to 0.0002 ETH (+100%)
closePosition(positionId)

// User gets back: 0.5 ETH + 0.5 ETH profit = 1.0 ETH
// Settlement happens in ETH, no token involved
```

## 🧪 Testing

### Test Smart Contracts
```bash
npm test
```

### Type Check Everything
```bash
npm run type-check
```

### Lint Code
```bash
npm run lint
```

## 🛠️ Development Tools

### Useful Commands
```bash
# Build frontend
npm run build

# Run local Hardhat node
npm run node

# Deploy to Base mainnet
npm run deploy:baseMainnet

# Verify on Basescan (replace <ADDRESS> with deployed contract address)
npx hardhat verify --network base <ADDRESS>

# Console on Base mainnet
npm run console:baseMainnet
```

## 📚 Learn More

- Read [ARCHITECT_BRIEFING.md](./ARCHITECT_BRIEFING.md) for full system design
- Read [README.md](./README.md) for comprehensive documentation
- Check the code comments for implementation details

## 🔐 Security Notes

- Always audit contracts before mainnet
- Use multi-sig for treasury owner
- Test extensively on testnet
- Never skip security reviews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Submit a pull request

## 💬 Philosophy

> "We build systems that don't lie to users."

MEMETH is about:
- Honesty over hype
- Security over speed
- Math over marketing
- Users over profit

---

**Ready to build?** Start exploring the code!

The best place to start is:
1. `contracts/MemethTreasury.sol` - Understand the treasury
2. `engine/pricing.ts` - See how pricing works
3. `frontend/components/MemeCard.tsx` - See the UI

Happy coding! 🚀
