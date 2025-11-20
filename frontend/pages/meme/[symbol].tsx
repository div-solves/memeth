import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

/**
 * Meme Detail Page
 * Shows individual meme details with trading interface
 */
export default function MemeDetail() {
  const router = useRouter();
  const { symbol } = router.query;
  const [amount, setAmount] = useState('');

  // Mock data - will be replaced with real contract data
  const meme = {
    name: "Moon Dog",
    symbol: symbol || "MOON",
    imageUri: "/placeholder.png",
    currentPrice: 0.0001,
    priceChange24h: 125.5,
    totalExposure: 12.5,
    activityScore: 0.95,
    description: "The legendary Moon Dog, always reaching for the stars! 🚀",
  };

  // Mock price history for chart
  const priceHistory = [
    { time: '00:00', price: 0.00008 },
    { time: '04:00', price: 0.00009 },
    { time: '08:00', price: 0.00012 },
    { time: '12:00', price: 0.00011 },
    { time: '16:00', price: 0.00013 },
    { time: '20:00', price: 0.0001 },
  ];

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
            <Link href="/#explore" className="nav-link">← Back to Explore</Link>
          </div>
          <div className="nav-wallet">
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="main">
        {/* Meme Header */}
        <section className="meme-header">
          <div className="meme-image">
            <img src={meme.imageUri} alt={meme.name} />
          </div>
          <div className="meme-info">
            <h1 className="meme-name">{meme.name}</h1>
            <div className="meme-symbol">${meme.symbol}</div>
            <p className="meme-description">{meme.description}</p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-label">Virtual Price</div>
            <div className="stat-value">{meme.currentPrice.toFixed(6)} ETH</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">24h Change</div>
            <div className={`stat-value ${meme.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
              {meme.priceChange24h >= 0 ? '+' : ''}{meme.priceChange24h.toFixed(2)}%
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Exposure</div>
            <div className="stat-value">{meme.totalExposure.toFixed(2)} ETH</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Activity Score</div>
            <div className="stat-value">
              {'🔥'.repeat(Math.ceil(meme.activityScore * 5))}
            </div>
          </div>
        </section>

        {/* Price Chart (Mock) */}
        <section className="chart-section">
          <h2 className="section-title">24h Engine Price Chart</h2>
          <div className="chart-container">
            <div className="chart">
              {priceHistory.map((point, index) => (
                <div key={index} className="chart-bar" style={{
                  height: `${(point.price / 0.00015) * 100}%`
                }}>
                  <div className="chart-label">{point.time}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-note">
            (Mock chart - will be replaced with real-time price data)
          </div>
        </section>

        {/* Trading Interface */}
        <section className="trading-section">
          <h2 className="section-title">Trade Virtual Exposure</h2>
          
          <div className="trading-card">
            <div className="input-group">
              <label htmlFor="amount">Amount (ETH)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.01"
                min="0.001"
                step="0.001"
                className="amount-input"
              />
            </div>

            <div className="button-group">
              <button className="trade-button long">
                Open Long Position
              </button>
              <button className="trade-button close">
                Close Long Position
              </button>
            </div>

            <div className="disclaimer">
              <p>⚠️ Virtual exposure only. No ERC20 tokens. No liquidity pools.</p>
              <p>All positions are settled directly in ETH.</p>
            </div>
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
        }

        .nav-content {
          max-width: 1200px;
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
          flex: 1;
          margin-left: 2rem;
        }

        .nav-link {
          color: #333;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #667eea;
        }

        /* Main Content */
        .main {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }

        /* Meme Header */
        .meme-header {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .meme-image {
          width: 300px;
          height: 300px;
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
          font-size: 3rem;
          font-weight: 900;
          color: #333;
          margin: 0 0 0.5rem 0;
        }

        .meme-symbol {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 1.2rem;
          font-weight: 700;
          width: fit-content;
          margin-bottom: 1rem;
        }

        .meme-description {
          font-size: 1.2rem;
          color: #666;
          line-height: 1.6;
        }

        /* Stats Section */
        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .stat-label {
          font-size: 0.9rem;
          color: #999;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
        }

        .stat-value.positive {
          color: #10b981;
        }

        .stat-value.negative {
          color: #ef4444;
        }

        /* Chart Section */
        .chart-section {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #333;
          margin: 0 0 1.5rem 0;
        }

        .chart-container {
          background: #f9fafb;
          border-radius: 15px;
          padding: 2rem;
          height: 300px;
          display: flex;
          align-items: flex-end;
        }

        .chart {
          display: flex;
          gap: 1rem;
          align-items: flex-end;
          justify-content: space-around;
          width: 100%;
          height: 100%;
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px 8px 0 0;
          position: relative;
          min-height: 20px;
          transition: all 0.3s;
        }

        .chart-bar:hover {
          opacity: 0.8;
        }

        .chart-label {
          position: absolute;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          color: #666;
          white-space: nowrap;
        }

        .chart-note {
          text-align: center;
          font-size: 0.85rem;
          color: #999;
          margin-top: 2rem;
          font-style: italic;
        }

        /* Trading Section */
        .trading-section {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .trading-card {
          max-width: 600px;
          margin: 0 auto;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .amount-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 15px;
          font-size: 1.2rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .amount-input:focus {
          border-color: #667eea;
        }

        .button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .trade-button {
          padding: 1rem 2rem;
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .trade-button.long {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .trade-button.long:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .trade-button.close {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .trade-button.close:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }

        .disclaimer {
          background: #fef3c7;
          border: 2px solid #fbbf24;
          border-radius: 15px;
          padding: 1rem;
          text-align: center;
        }

        .disclaimer p {
          margin: 0.5rem 0;
          color: #78350f;
          font-size: 0.9rem;
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
        @media (max-width: 768px) {
          .meme-header {
            grid-template-columns: 1fr;
          }

          .meme-image {
            width: 100%;
            height: 300px;
            margin: 0 auto;
          }

          .meme-name {
            font-size: 2rem;
          }

          .button-group {
            grid-template-columns: 1fr;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
