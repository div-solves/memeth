# 🚀 MEMETH - The End of Trading Scams

**The ETH-Native Virtual Meme Market**

> No Tokens • No Rugpulls • No Bullshit

MEMETH is a revolutionary platform that enables meme culture exposure without the risks of traditional meme tokens. By using virtual positions settled in ETH, we eliminate rugpulls, scam tokens, liquidity pool drains, and all the typical Web3 scams.

## 🎯 Core Principles

- ✅ **All value stays in ETH** - No fake tokens that can be rugpulled
- ✅ **Virtual exposure only** - Mathematical modeling instead of token trading
- ✅ **Transparent settlements** - Everything on-chain on Base
- ✅ **No bonding curves** - No manipulated pricing mechanisms
- ✅ **No liquidity pools** - Nothing to drain or exploit
- ✅ **Security first** - Honest, fair, and transparent

## 🏗️ Architecture

### Smart Contracts (`/contracts`)

**MemethPlatform.sol**
- Base mainnet deployment
- Holds all ETH deposits
- Processes position settlements
- Tracks meme metadata
- NO token creation
- Minimalistic and secure

### Offchain Engine (`/engine`)

**pricing.ts**
- Mathematical price calculations
- No manipulation, pure formulas
- Exposure-based pricing
- Activity scoring

**exposure.ts**
- Position management
- Virtual P&L calculations
- Portfolio tracking
- Risk validation

**simulation.ts**
- Market scenario testing
- Risk analysis
- Value at Risk (VaR)
- Position sizing suggestions

**index.ts**
- Engine initialization
- Configuration management
- Status monitoring

### Frontend (`/frontend`)

**Next.js-based UI inspired by pump.fun**
- Meme cards with live stats
- Position opening interface
- Create meme flow
- Portfolio dashboard
- Clean, modern design

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Ethereum wallet (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/div-solves/memeth.git
cd memeth

# Install root dependencies (contracts, engine)
npm install

# Install frontend dependencies
cd frontend
npm install

# Compile smart contracts
npm run compile:contracts

# Run frontend development server
cd frontend
npm run dev
```

### Building for Production

```bash
# Build frontend for production
cd frontend
npm run build

# The static export will be in frontend/out/ directory
# Ready for deployment to any static hosting service
```

### Running Tests

```bash
# Test smart contracts
npm test

# Type check
npm run type-check

# Lint code
npm run lint
```

## 📁 Project Structure

```
memeth/
├── contracts/              # Solidity smart contracts
│   ├── MemethTreasury.sol # L1 treasury contract
│   └── MemeRegistry.sol   # Meme registry
│
├── engine/                # Offchain calculation engine
│   ├── pricing.ts         # Price calculations
│   ├── exposure.ts        # Position management
│   ├── simulation.ts      # Risk simulation
│   └── index.ts           # Engine entry point
│
├── frontend/              # Next.js frontend
│   ├── pages/             # Page components
│   ├── components/        # React components
│   └── public/            # Static assets
│
├── ARCHITECT_BRIEFING.md  # Full system design document
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── hardhat.config.js      # Hardhat configuration
└── README.md              # This file
```

## 🧮 How It Works

### 1. Meme Creation
Users create memes in the registry (small ETH fee). No tokens are minted - only metadata is stored.

### 2. Opening Positions
Users deposit ETH and open virtual exposure positions on memes they believe in.

### 3. Price Dynamics
Prices are calculated mathematically based on:
- Total exposure
- Activity score
- Volatility
- Market dynamics

### 4. Settlement
When users close positions, P&L is calculated and settled in ETH through the L1 treasury.

## 🔒 Security Features

- **No token contracts** - Can't be exploited or rugpulled
- **No liquidity pools** - Nothing to drain
- **Base L2 settlement** - Fast, secure, and low-cost transactions
- **Minimalistic contracts** - Less code = less attack surface
- **No admin keys for funds** - User funds are always safe
- **Transparent accounting** - All balances visible on-chain

## 🌍 Network Support

- **Base Mainnet** - Primary deployment for optimal user experience and low gas costs

## 🚢 Deployment

### Frontend Deployment (Hostinger or Static Hosting)

The frontend is configured for static export and can be deployed to any static hosting service:

```bash
# Build the static export
cd frontend
npm run build

# The 'out' directory contains all static files
# Upload the contents to your hosting provider
```

#### Hostinger Deployment Steps

1. **Build locally:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload to Hostinger:**
   - Use Hostinger's File Manager or FTP client
   - Upload all files from `frontend/out/` to your `public_html` directory
   - Ensure all files and folders are uploaded

3. **Configure .htaccess for client-side routing:**
   Create or update `.htaccess` in `public_html`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Test your deployment** by visiting your domain

For detailed deployment instructions, see [frontend/README.md](./frontend/README.md)

### Contract Deployment

Smart contracts can be deployed to Base mainnet:

```bash
# Deploy to Base mainnet
npm run deploy:baseMainnet

# Verify on Basescan
npm run verify:baseMainnet

# Console on Base mainnet
npm run console:baseMainnet

# For local testing
npm run node
```

## 📊 Roadmap

- [x] Core architecture design
- [x] Smart contract scaffolding
- [x] Offchain engine implementation
- [x] Frontend UI scaffolding
- [x] **Complete trading platform UI** ✨
  - [x] Memecoin gallery with filters/search
  - [x] Create memecoin page with image upload
  - [x] Trading interface with charts
  - [x] 0.5% platform fee integration
  - [x] Trade history and analytics
  - [x] Static export for deployment
- [ ] Contract testing and auditing
- [ ] Frontend integration with contracts
- [ ] L2 bridge integration
- [ ] Testnet deployment
- [ ] Security audit
- [ ] Mainnet launch

## 🤝 Contributing

We welcome contributions! Please read our [ARCHITECT_BRIEFING.md](./ARCHITECT_BRIEFING.md) to understand the system design and principles.

### Development Principles

1. **Security above all** - No shortcuts on security
2. **Transparency** - All mechanisms must be clear
3. **User protection** - Never compromise user safety
4. **Honesty** - No misleading features or marketing
5. **Simplicity** - Keep it minimal and maintainable

## 📜 License

MIT License - See LICENSE file for details

## ⚠️ Disclaimer

MEMETH is experimental software. Use at your own risk. This is not financial advice. All positions are virtual exposure and should be treated as speculative.

---

**Built with ❤️ for the Ethereum community**

*Ending trading scams, one meme at a time.*
