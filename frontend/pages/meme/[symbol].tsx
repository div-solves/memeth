import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CoinStats from '../../components/CoinStats';
import TradingChart from '../../components/TradingChart';
import TradeForm from '../../components/TradeForm';
import TradeHistory from '../../components/TradeHistory';

/**
 * Meme Detail Page
 * Enhanced with full trading platform features
 * 
 * Features:
 * - Comprehensive coin statistics
 * - Interactive trading chart with time intervals
 * - Trade form with 0.5% fee calculation
 * - Per-coin trade history
 * 
 * TODO: Connect to contract for real data
 */
export default function MemeDetail() {
  const router = useRouter();
  const { symbol } = router.query;

  // Mock data - TODO: Replace with real contract data
  const meme = {
    name: "Moon Dog",
    symbol: (symbol as string) || "MOON",
    imageUri: "/placeholder.png",
    currentPrice: 0.0001,
    priceChange24h: 125.5,
    totalExposure: 12.5,
    activityScore: 0.95,
    holders: 234,
    volume24h: 45.2,
    description: "The legendary Moon Dog, always reaching for the stars! 🚀",
    // Mock position data for trade form
    hasOpenPosition: false,
    positionSize: 0,
    entryPrice: 0,
  };

  return (
    <div className="container">
      <Head>
        <title>{meme.name} ({meme.symbol}) - MEMETH</title>
        <meta name="description" content={`Trade ${meme.name} virtual exposure on MEMETH`} />
      </Head>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            MEMETH
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/coins" className="nav-link">Coins</Link>
            <Link href="/create" className="nav-link">Create</Link>
          </div>
          <div className="nav-wallet">
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="main">
        {/* Meme Header with Image */}
        <section className="meme-header">
          <div className="meme-image">
            <img src={meme.imageUri} alt={meme.name} />
          </div>
          <div className="meme-info">
            <h1 className="meme-name">{meme.name}</h1>
            <p className="meme-description">{meme.description}</p>
          </div>
        </section>

        {/* Coin Statistics */}
        <section className="stats-section">
          <CoinStats
            symbol={meme.symbol}
            name={meme.name}
            currentPrice={meme.currentPrice}
            priceChange24h={meme.priceChange24h}
            holders={meme.holders}
            volume24h={meme.volume24h}
            totalExposure={meme.totalExposure}
            activityScore={meme.activityScore}
          />
        </section>

        {/* Trading Chart */}
        <section className="chart-section">
          <TradingChart
            symbol={meme.symbol}
            currentPrice={meme.currentPrice}
          />
        </section>

        {/* Trading and History Grid */}
        <section className="trading-grid">
          <div className="trading-column">
            <TradeForm
              symbol={meme.symbol}
              currentPrice={meme.currentPrice}
              hasOpenPosition={meme.hasOpenPosition}
              positionSize={meme.positionSize}
              entryPrice={meme.entryPrice}
            />
          </div>
          
          <div className="history-column">
            <TradeHistory symbol={meme.symbol} maxTrades={10} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Built on Ethereum • Virtual Meme Market Engine</p>
        <p className="footer-disclaimer">No tokens. No rugs. No scams.</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        /* Navigation */
        .nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 900;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #333;
          font-weight: 500;
          transition: color 0.2s;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        .nav-link:hover {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        /* Main Content */
        .main {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }

        /* Meme Header */
        .meme-header {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 2rem;
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .meme-image {
          width: 250px;
          height: 250px;
          border-radius: 15px;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .meme-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .meme-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .meme-name {
          font-size: 2.5rem;
          font-weight: 900;
          color: #333;
          margin: 0 0 1rem 0;
        }

        .meme-description {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
        }

        /* Stats Section */
        .stats-section {
          margin-bottom: 2rem;
        }

        /* Chart Section */
        .chart-section {
          margin-bottom: 2rem;
        }

        /* Trading Grid */
        .trading-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .trading-column,
        .history-column {
          min-height: 400px;
        }

        /* Footer */
        .footer {
          background: rgba(0, 0, 0, 0.2);
          color: white;
          text-align: center;
          padding: 2rem;
          margin-top: 2rem;
        }

        .footer p {
          margin: 0.5rem 0;
        }

        .footer-disclaimer {
          font-size: 0.85rem;
          opacity: 0.8;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .trading-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .nav-content {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .nav-links {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .meme-header {
            grid-template-columns: 1fr;
          }

          .meme-image {
            width: 100%;
            height: 250px;
          }

          .meme-name {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
