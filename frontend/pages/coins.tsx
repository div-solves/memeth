import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MemeCard from '../components/MemeCard';

/**
 * Coins Gallery Page
 * Displays all memecoins with filtering and sorting options
 * 
 * TODO: Replace mock data with actual contract data via hooks
 */

type SortOption = 'newest' | 'volume' | 'holders' | 'price';

export default function CoinsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('volume');

  // Mock data - TODO: Replace with real contract/API data
  const allCoins = [
    {
      id: 1,
      name: "Moon Dog",
      symbol: "MOON",
      imageUri: "/placeholder.png",
      currentPrice: 0.0001,
      priceChange: 125.5,
      totalExposure: 12.5,
      activityScore: 0.95,
      holders: 234,
      volume24h: 45.2,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      name: "Laser Eyes Pepe",
      symbol: "LASER",
      imageUri: "/placeholder.png",
      currentPrice: 0.00005,
      priceChange: -15.2,
      totalExposure: 8.3,
      activityScore: 0.65,
      holders: 189,
      volume24h: 23.7,
      createdAt: new Date('2024-01-20'),
    },
    {
      id: 3,
      name: "Shiba Rocket",
      symbol: "SHIB",
      imageUri: "/placeholder.png",
      currentPrice: 0.00001,
      priceChange: 45.8,
      totalExposure: 15.7,
      activityScore: 0.80,
      holders: 312,
      volume24h: 67.8,
      createdAt: new Date('2024-01-10'),
    },
    {
      id: 4,
      name: "Diamond Hands",
      symbol: "DIAM",
      imageUri: "/placeholder.png",
      currentPrice: 0.00015,
      priceChange: 89.3,
      totalExposure: 22.1,
      activityScore: 0.92,
      holders: 445,
      volume24h: 92.3,
      createdAt: new Date('2024-01-05'),
    },
    {
      id: 5,
      name: "Wojak Tears",
      symbol: "WOJAK",
      imageUri: "/placeholder.png",
      currentPrice: 0.000008,
      priceChange: -32.1,
      totalExposure: 5.2,
      activityScore: 0.45,
      holders: 98,
      volume24h: 12.4,
      createdAt: new Date('2024-01-25'),
    },
    {
      id: 6,
      name: "Chad Coin",
      symbol: "CHAD",
      imageUri: "/placeholder.png",
      currentPrice: 0.00012,
      priceChange: 156.7,
      totalExposure: 18.9,
      activityScore: 0.88,
      holders: 367,
      volume24h: 78.5,
      createdAt: new Date('2024-01-12'),
    },
  ];

  // Filter and sort coins
  const filteredAndSortedCoins = useMemo(() => {
    let filtered = allCoins;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'holders':
          return b.holders - a.holders;
        case 'price':
          return b.currentPrice - a.currentPrice;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortBy]);

  return (
    <div className="container">
      <Head>
        <title>All Memecoins - MEMETH</title>
        <meta name="description" content="Browse all available memecoins on MEMETH" />
      </Head>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            MEMETH
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/coins" className="nav-link active">Coins</Link>
            <Link href="/create" className="nav-link">Create</Link>
          </div>
          <div className="nav-wallet">
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="main">
        <section className="page-header">
          <h1 className="page-title">All Memecoins</h1>
          <p className="page-subtitle">
            Explore virtual meme assets. No tokens, no rugs, pure exposure.
          </p>
        </section>

        {/* Filters and Search */}
        <section className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="sort-controls">
            <label className="sort-label">Sort by:</label>
            <div className="sort-buttons">
              <button
                className={`sort-btn ${sortBy === 'volume' ? 'active' : ''}`}
                onClick={() => setSortBy('volume')}
              >
                📊 Volume
              </button>
              <button
                className={`sort-btn ${sortBy === 'holders' ? 'active' : ''}`}
                onClick={() => setSortBy('holders')}
              >
                👥 Holders
              </button>
              <button
                className={`sort-btn ${sortBy === 'newest' ? 'active' : ''}`}
                onClick={() => setSortBy('newest')}
              >
                🆕 Newest
              </button>
              <button
                className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                onClick={() => setSortBy('price')}
              >
                💰 Price
              </button>
            </div>
          </div>
        </section>

        {/* Coins Grid */}
        <section className="coins-section">
          {filteredAndSortedCoins.length > 0 ? (
            <div className="coins-grid">
              {filteredAndSortedCoins.map((coin) => (
                <MemeCard key={coin.id} {...coin} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No coins found</h3>
              <p>Try adjusting your search query</p>
            </div>
          )}
        </section>

        {/* Stats Summary */}
        <section className="stats-summary">
          <div className="stat-box">
            <div className="stat-value">{allCoins.length}</div>
            <div className="stat-label">Total Memecoins</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">
              {allCoins.reduce((sum, coin) => sum + coin.volume24h, 0).toFixed(1)} ETH
            </div>
            <div className="stat-label">24h Volume</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">
              {allCoins.reduce((sum, coin) => sum + coin.holders, 0)}
            </div>
            <div className="stat-label">Total Holders</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">0.5%</div>
            <div className="stat-label">Platform Fee</div>
          </div>
        </section>
      </main>

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

        .nav-link.active {
          color: #667eea;
          background: rgba(102, 126, 234, 0.15);
          font-weight: 600;
        }

        /* Main Content */
        .main {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }

        /* Page Header */
        .page-header {
          text-align: center;
          padding: 2rem 0 3rem;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 900;
          color: white;
          margin: 0 0 1rem 0;
        }

        .page-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Filters Section */
        .filters-section {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .search-box {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .search-input {
          width: 100%;
          padding: 1rem 3rem 1rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 15px;
          font-size: 1.1rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: #667eea;
        }

        .search-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.5rem;
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .sort-label {
          font-weight: 600;
          color: #333;
        }

        .sort-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .sort-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sort-btn:hover {
          border-color: #667eea;
          color: #667eea;
        }

        .sort-btn.active {
          border-color: #667eea;
          background: #667eea;
          color: white;
        }

        /* Coins Section */
        .coins-section {
          margin-bottom: 2rem;
        }

        .coins-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .empty-state {
          background: white;
          border-radius: 20px;
          padding: 4rem 2rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: #666;
        }

        /* Stats Summary */
        .stats-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-box {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #666;
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
          .nav-content {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .nav-links {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .page-title {
            font-size: 2rem;
          }

          .coins-grid {
            grid-template-columns: 1fr;
          }

          .sort-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .sort-buttons {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
