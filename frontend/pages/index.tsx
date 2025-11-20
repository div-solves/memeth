import Head from 'next/head';
import MemeCard from '../components/MemeCard';
import CreateMeme from '../components/CreateMeme';

/**
 * Main landing page - Virtual Meme Market
 * Inspired by pump.fun UI but without the scam mechanics
 */
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>MEMETH - The End of Trading Scams</title>
        <meta name="description" content="ETH-native Virtual Meme Market - No rugpulls, no scams, only fair exposure" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <header className="header">
          <h1 className="title">
            <span className="eth">MEMETH</span>
          </h1>
          <p className="subtitle">
            The ETH-Native Virtual Meme Market
          </p>
          <p className="tagline">
            No Tokens • No Rugpulls • No Bullshit
          </p>
        </header>

        <section className="hero">
          <div className="hero-content">
            <h2>Trade Meme Exposure, Not Scam Tokens</h2>
            <p>
              MEMETH is the first virtual meme market where:
            </p>
            <ul className="features">
              <li>✅ All value stays in ETH</li>
              <li>✅ No fake tokens to rugpull</li>
              <li>✅ No liquidity pools to drain</li>
              <li>✅ Mathematical pricing, no manipulation</li>
              <li>✅ Transparent settlements on L1</li>
            </ul>
          </div>
        </section>

        <section className="actions">
          <CreateMeme />
        </section>

        <section className="memes">
          <h2>Trending Memes</h2>
          <div className="meme-grid">
            {/* Placeholder for meme cards - will be populated dynamically */}
            <MemeCard
              id={1}
              name="Sample Meme"
              symbol="SAMPLE"
              imageUri="/placeholder.png"
              currentPrice={0.0001}
              priceChange={15.5}
              totalExposure={1.5}
              activityScore={0.75}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Built with ❤️ for the Ethereum community
        </p>
        <p className="disclaimer">
          MEMETH is a virtual exposure market. No real tokens are created.
          All positions are settled in ETH.
        </p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .title {
          margin: 0;
          font-size: 4rem;
          font-weight: 900;
          color: white;
        }

        .eth {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0.5rem 0;
        }

        .tagline {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }

        .hero {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .hero-content h2 {
          color: #333;
          margin-bottom: 1rem;
        }

        .hero-content p {
          color: #666;
          font-size: 1.1rem;
        }

        .features {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }

        .features li {
          padding: 0.5rem 0;
          color: #444;
          font-size: 1.1rem;
        }

        .actions {
          margin-bottom: 2rem;
        }

        .memes {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .memes h2 {
          color: #333;
          margin-bottom: 1.5rem;
        }

        .meme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .footer {
          padding: 2rem 0;
          text-align: center;
          color: white;
        }

        .disclaimer {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 3rem;
          }
          
          .meme-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
