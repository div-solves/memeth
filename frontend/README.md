# MEMETH Frontend

> Virtual Meme Market Trading Platform

A Next.js-based frontend for the MEMETH platform - enabling virtual memecoin trading without tokens, rugpulls, or scams.

## 🎯 Features

### Pages
- **Home (`/`)** - Landing page with featured memecoins and recent trades
- **Coins Gallery (`/coins`)** - Browse all memecoins with filtering and sorting
- **Create Memecoin (`/create`)** - Create new virtual meme assets with image upload
- **Coin Detail (`/meme/[symbol]`)** - Individual coin page with trading interface

### Components
- **MemeCard** - Displays memecoin with stats and quick trade buttons
- **TradingChart** - Interactive price chart with time intervals (1m, 5m, 1h, 1d, 1w)
- **TradeForm** - Buy/sell interface with 0.5% platform fee calculation
- **TradeHistory** - Trade feed with filtering (global or per-coin)
- **CoinStats** - Comprehensive coin statistics display

### Key Features
- 📊 **0.5% Platform Fee** - Transparently displayed throughout the UI
- 💹 **P&L Preview** - Real-time profit/loss calculations
- ⛽ **Gas Estimation** - Estimated gas costs for transactions
- 📈 **Live Charts** - Candlestick and line charts with zoom/pan
- 🔍 **Search & Filter** - Find coins by name, symbol, or sort by metrics
- 📱 **Responsive Design** - Mobile-friendly layout
- 🎨 **Meme-Centric UI** - Fun, colorful design with emojis and gradients

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# From the repository root
cd frontend

# Install dependencies (uses root node_modules via symlink)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Static Export for Hostinger

The frontend is configured for static export, making it perfect for deployment on static hosting services like Hostinger.

```bash
# Build static export
npm run build

# The static files will be in the 'out' directory
# Upload the 'out' directory contents to your hosting provider
```

#### Deployment to Hostinger

1. **Build the static export:**
   ```bash
   npm run build
   ```

2. **Upload files:**
   - Navigate to your Hostinger file manager or use FTP
   - Upload all files from the `out/` directory to your `public_html` folder
   - Ensure `.htaccess` or equivalent is configured for client-side routing

3. **Configure .htaccess (if needed):**
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

## 📁 Project Structure

```
frontend/
├── components/          # React components
│   ├── CoinStats.tsx    # Coin statistics display
│   ├── CreateMeme.tsx   # Meme creation modal (legacy)
│   ├── MemeCard.tsx     # Memecoin card component
│   ├── TradeForm.tsx    # Trading interface with fees
│   ├── TradeHistory.tsx # Trade feed/history
│   └── TradingChart.tsx # Price chart component
├── config/              # Configuration files
│   └── web3.ts          # Wagmi/RainbowKit config
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper with providers
│   ├── index.tsx        # Landing page
│   ├── coins.tsx        # Coins gallery
│   ├── create.tsx       # Create memecoin page
│   └── meme/
│       └── [symbol].tsx # Coin detail page
├── public/              # Static assets
│   ├── placeholder.png  # Placeholder image
│   └── memes/           # Uploaded meme images (TODO)
├── styles/              # Global styles
│   └── globals.css      # Base CSS styles
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## 🔧 Configuration

### Web3 Setup
The application uses Wagmi and RainbowKit for Web3 connectivity. Configuration is in `config/web3.ts`.

### Environment Variables
Create a `.env.local` file in the frontend directory:

```env
# Optional: Custom RPC URLs
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id
NEXT_PUBLIC_INFURA_ID=your_infura_id

# Contract addresses (TODO: Add after deployment)
NEXT_PUBLIC_TREASURY_ADDRESS=0x...
NEXT_PUBLIC_REGISTRY_ADDRESS=0x...
```

## 🎨 Styling

The application uses:
- **CSS-in-JS** with `styled-jsx` for component-scoped styles
- **Global CSS** for base styles and resets
- **Gradient backgrounds** inspired by modern DeFi platforms
- **Responsive design** with mobile-first approach

## 📊 Mock Data

Currently, the application uses mock data for demonstration. Integration points are marked with `// TODO:` comments.

### Mock Data Locations
- **Coin data**: `pages/coins.tsx` and `pages/index.tsx`
- **Price data**: `components/TradingChart.tsx`
- **Trade history**: `components/TradeHistory.tsx`
- **Position data**: `pages/meme/[symbol].tsx`

## 🔗 Integration Points

### Contract Integration (TODO)
1. **MemeRegistry Contract**
   - Create new memes
   - Fetch meme metadata
   - Query meme lists

2. **Treasury Contract**
   - Open positions
   - Close positions
   - Check balances
   - Fetch position data

3. **Events/Logs**
   - Trade history from blockchain events
   - Real-time price updates
   - Position updates

### API/Backend Integration (TODO)
- Price feed service for charts
- Trade history aggregation
- User position tracking
- Analytics and statistics

## 🛠️ Development

### Adding New Components

```typescript
// components/NewComponent.tsx
export default function NewComponent() {
  return (
    <div>
      {/* Component content */}
      
      <style jsx>{`
        /* Component styles */
      `}</style>
    </div>
  );
}
```

### Adding New Pages

```typescript
// pages/new-page.tsx
import Layout from '../components/Layout';

export default function NewPage() {
  return (
    <Layout>
      {/* Page content */}
    </Layout>
  );
}
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📝 License

MIT License - See LICENSE file in the repository root

## 🤝 Contributing

Contributions are welcome! Please see the main repository README for contribution guidelines.

## ⚠️ Important Notes

- **Virtual Exposure Only**: No ERC20 tokens are created
- **No Liquidity Pools**: No traditional AMM mechanics
- **ETH Settlement**: All positions settle in ETH
- **0.5% Platform Fee**: Applied to all trades
- **Gas Fees**: Users pay gas fees for on-chain transactions

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the main repository documentation
- Review the `ARCHITECT_BRIEFING.md` for system design

---

**Built with ❤️ for the Ethereum community**

*Ending trading scams, one meme at a time.*
