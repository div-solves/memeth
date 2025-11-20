# memeth - The End of Trading Scams

**memeth** is an Ethereum-based memecoin trading simulator platform that revolutionizes the memecoin trading experience by eliminating the risks of rugpulls, scam tokens, and wallet-draining attacks.

## 🎯 Core Concept

memeth implements "Mimik-Trade" - a simulated trading system where:
- Users deposit **ETH only**
- All trading is simulated (no actual token purchases)
- Profits and losses are settled in **ETH only**
- Users can open LONG or SHORT positions on memecoins
- Leverage up to 10x available

## ✨ Key Benefits

### Security
- ❌ **No Rugpulls** - No actual tokens are purchased
- ❌ **No Scam Tokens** - Platform-controlled memecoin listings
- ❌ **No Wallet Draining** - Smart contract protected funds
- ✅ **Secure Gaming** - Community-driven memecoin trading fun

### Performance
- ⚡ **Minimal Gas Fees** - Only deposit/withdrawal/position operations
- ⚡ **Ultra-Fast Execution** - Instant position opening/closing
- ⚡ **No Slippage** - Positions execute at current price

## 🏗️ Smart Contract Architecture

### MemethPlatform Contract

The main contract implements:

#### Position Management
- Open LONG/SHORT positions with 1-10x leverage
- Close positions to realize profits/losses
- Track all user positions
- Automatic liquidation handling

#### Memecoin Registry
- Owner-managed memecoin listings
- Real-time price updates
- Symbol and name tracking

#### Fund Management
- ETH deposits via `deposit()` or direct transfer
- ETH withdrawals with balance verification
- Position collateral locking
- Profit/loss settlement

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/div-solves/memeth.git
cd memeth

# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm test
```

## 🧪 Testing

The platform includes comprehensive test coverage:

```bash
npm test
```

Tests cover:
- Deployment and initialization
- Deposits and withdrawals
- Memecoin management
- Position opening and closing
- Profit/loss calculations
- Security features (reentrancy protection)
- Edge cases and error handling

## 🚀 Deployment

Deploy to a network:

```bash
# Local Hardhat network
npx hardhat node

# In another terminal, deploy
npm run deploy

# Deploy to specific network
npm run deploy -- --network <network-name>
```

## 💡 Usage Examples

### For Users

1. **Deposit ETH**
```javascript
await memethPlatform.deposit({ value: ethers.parseEther("1.0") });
```

2. **Open a LONG Position**
```javascript
// Position on DOGE with 0.1 ETH at 5x leverage
await memethPlatform.openPosition("DOGE", 0, ethers.parseEther("0.1"), 5);
```

3. **Open a SHORT Position**
```javascript
// Short position on SHIB with 0.2 ETH at 3x leverage
await memethPlatform.openPosition("SHIB", 1, ethers.parseEther("0.2"), 3);
```

4. **Close a Position**
```javascript
await memethPlatform.closePosition(positionId);
```

5. **Withdraw ETH**
```javascript
await memethPlatform.withdraw(ethers.parseEther("0.5"));
```

### For Platform Owner

1. **Add a Memecoin**
```javascript
await memethPlatform.addMemecoin(
  "PEPE",                           // Symbol
  "Pepe",                           // Name
  ethers.parseEther("0.000001")     // Initial price
);
```

2. **Update Price**
```javascript
await memethPlatform.updatePrice("PEPE", ethers.parseEther("0.000002"));
```

## 📊 Contract Functions

### User Functions

| Function | Description |
|----------|-------------|
| `deposit()` | Deposit ETH to the platform |
| `withdraw(amount)` | Withdraw ETH from balance |
| `openPosition(symbol, type, amount, leverage)` | Open a trading position |
| `closePosition(positionId)` | Close and settle a position |
| `getUserOpenPositions(user)` | Get all open positions for a user |
| `getBalance(user)` | Check user's available balance |
| `calculateProfitLoss(positionId, exitPrice)` | Calculate P/L for a position |

### Owner Functions

| Function | Description |
|----------|-------------|
| `addMemecoin(symbol, name, price)` | Add new memecoin to platform |
| `updatePrice(symbol, price)` | Update memecoin price |

### View Functions

| Function | Description |
|----------|-------------|
| `getPrice(symbol)` | Get current price of a memecoin |
| `getAllMemecoins()` | Get list of all memecoins |
| `positions(id)` | Get details of a position |
| `memecoins(symbol)` | Get memecoin data |

## 🔒 Security Features

- **ReentrancyGuard**: Protection against reentrancy attacks
- **Ownable**: Access control for administrative functions
- **Input Validation**: Comprehensive checks on all parameters
- **Safe Math**: Built-in overflow protection (Solidity 0.8+)
- **Liquidation Protection**: Automatic loss capping at position amount

## 🎮 How It Works

### Position Profit/Loss Calculation

**LONG Position:**
- Profit when price increases
- Loss when price decreases
- Formula: `(exitPrice - entryPrice) / entryPrice * amount * leverage`

**SHORT Position:**
- Profit when price decreases
- Loss when price increases
- Formula: `(entryPrice - exitPrice) / entryPrice * amount * leverage`

### Example Trade

1. User deposits 1 ETH
2. Opens LONG position: 0.1 ETH on DOGE at 0.0001 ETH, 5x leverage
3. Price doubles to 0.0002 ETH
4. Profit: `(0.0002 - 0.0001) / 0.0001 * 0.1 * 5 = 0.5 ETH`
5. Close position: User gets back 0.1 ETH + 0.5 ETH profit = 0.6 ETH
6. Final balance: 0.9 ETH + 0.6 ETH = 1.5 ETH

## 🛣️ Roadmap

- [ ] Oracle integration for real memecoin prices
- [ ] Frontend web application
- [ ] Multiple position types (limit orders, stop-loss)
- [ ] Leaderboard and statistics
- [ ] Social features and community voting
- [ ] Mobile app

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Disclaimer

This platform is for entertainment and educational purposes. Trading memecoins carries risk. Only trade with funds you can afford to lose.
