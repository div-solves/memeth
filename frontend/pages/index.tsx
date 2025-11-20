import Head from 'next/head';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MemeCard from '../components/MemeCard';
import CreateMeme from '../components/CreateMeme';

/**
 * Main landing page - MEMETH Virtual Meme Market MVP
 * Clean, fun, ETH-native interface
 */
export default function Home() {
  // Mock data for demo - will be replaced with real contract data
  const trendingMemes = [
    {
      id: 1,
      name: "Moon Dog",
      symbol: "MOON",
      imageUri: "/placeholder.png",
      currentPrice: 0.0001,
      priceChange: 125.5,
      totalExposure: 12.5,
      activityScore: 0.95,
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
    },
  ];

  return (
    <div className="container">
      <Head>
        <title>MEMETH - The Virtual Meme-Market on Ethereum</title>
        <meta 
          name="description" 
          content="Trade meme-exposure without tokens, without rugs, without scams. ETH in. ETH out. Pure virtual markets." 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Header */}
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            <span className="logo-text">MEMETH</span>
          </Link>
          
          <div className="nav-links">
            <Link href="#explore" className="nav-link">Explore</Link>
            <Link href="#create" className="nav-link">Create Meme</Link>
            <Link href="https://github.com/div-solves/memeth" target="_blank" className="nav-link">
              Docs
            </Link>
          </div>

          <div className="nav-wallet">
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="main">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">
            Memeth – Virtual Meme Markets<br />
            <span className="hero-title-highlight">on Ethereum</span>
          </h1>
          <p className="hero-subtitle">
            Trade meme exposure without tokens, without liquidity pools, without rugs.<br />
            <strong>ETH in. ETH out. Pure virtual long positions.</strong>
          </p>
          <div className="hero-cta">
            <button className="cta-button cta-primary">
              Launch App
            </button>
            <button className="cta-button cta-secondary">
              What is Memeth?
            </button>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="value-props">
          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">🛡</div>
              <h3 className="value-title">No Tokens</h3>
              <p className="value-description">
                No ERC20 tokens. No supply. Nothing to rug.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3 className="value-title">Zero Slippage</h3>
              <p className="value-description">
                Virtual exposure engine – instant trades, no AMMs required.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3 className="value-title">ETH Settlement</h3>
              <p className="value-description">
                All positions settle directly in ETH.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🔥</div>
              <h3 className="value-title">Meme-Native</h3>
              <p className="value-description">
                Fun, fast, community-driven synthetic meme markets.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3 className="step-title">Deposit ETH</h3>
              <p className="step-description">
                Your ETH sits in a secure on-chain treasury.
              </p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3 className="step-title">Trade Virtual Exposure</h3>
              <p className="step-description">
                Open and close long positions on meme assets.
              </p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3 className="step-title">Withdraw ETH</h3>
              <p className="step-description">
                PnL is calculated and returned in ETH.
              </p>
            </div>
          </div>
        </section>

        {/* Meme Gallery Section */}
        <section className="meme-gallery" id="explore">
          <h2 className="section-title">Trending Memes</h2>
          <div className="meme-grid">
            {trendingMemes.map((meme) => (
              <MemeCard key={meme.id} {...meme} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <p className="footer-headline">
            Built on Ethereum – Virtual Meme Market Engine
          </p>
          <p className="footer-tagline">
            No tokens. No rugs. Pure virtual exposure.
          </p>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-disclaimer">
            ⚠️ Virtual exposure only. No ERC20 tokens. No liquidity pools. All positions settled in ETH.
          </p>
        </div>
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
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #333;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #667eea;
        }

        .nav-wallet {
          display: flex;
          align-items: center;
        }

        /* Main Content */
        .main {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 0 2rem;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          padding: 6rem 2rem 4rem;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          color: white;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
        }

        .hero-title-highlight {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .cta-primary {
          background: white;
          color: #667eea;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Value Proposition Section */
        .value-props {
          padding: 0 0 2rem;
        }

        .value-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .value-card {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .value-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.75rem;
        }

        .value-description {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
          margin: 0;
        }

        /* How It Works Section */
        .how-it-works {
          background: white;
          border-radius: 20px;
          padding: 3rem 2rem;
          margin: 3rem 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          color: #333;
          margin: 0 0 3rem 0;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-top: 2rem;
        }

        .step {
          text-align: center;
        }

        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 2rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .step-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.75rem;
        }

        .step-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
        }

        /* Meme Gallery */
        .meme-gallery {
          background: white;
          border-radius: 20px;
          padding: 3rem 2rem;
          margin: 3rem 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .meme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        /* Footer */
        .footer {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          padding: 3rem 2rem 2rem;
          margin-top: 4rem;
        }

        .footer-main {
          max-width: 1400px;
          margin: 0 auto;
          text-align: center;
          margin-bottom: 2rem;
        }

        .footer-headline {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .footer-tagline {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
        }

        .footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
        }

        .footer-disclaimer {
          font-size: 0.85rem;
          opacity: 0.8;
          margin: 0;
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

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .steps {
            grid-template-columns: 1fr;
          }

          .meme-grid {
            grid-template-columns: 1fr;
          }

          .value-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
