import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useMemo, useState } from 'react';

type Market = {
  id: string;
  name: string;
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
  trendScore: number;
  liquidityEth: number;
  volatility: number;
  community: string;
  change24h: number;
  exposure: number[];
};

const MOCK_MARKETS: Market[] = [
  {
    id: 'doge-energy',
    name: 'DOGE Energy',
    sentiment: 'Bullish',
    trendScore: 83,
    liquidityEth: 1280,
    volatility: 63,
    community: '14.2k active',
    change24h: 18.4,
    exposure: [35, 42, 44, 51, 47, 58, 65],
  },
  {
    id: 'ai-doomposting',
    name: 'AI Doomposting',
    sentiment: 'Bearish',
    trendScore: 71,
    liquidityEth: 920,
    volatility: 78,
    community: '11.1k active',
    change24h: -7.2,
    exposure: [62, 58, 54, 49, 52, 46, 40],
  },
  {
    id: 'base-builders',
    name: 'Base Builders',
    sentiment: 'Bullish',
    trendScore: 89,
    liquidityEth: 1640,
    volatility: 41,
    community: '19.8k active',
    change24h: 23.1,
    exposure: [40, 46, 52, 57, 63, 69, 74],
  },
  {
    id: 'cat-memes',
    name: 'Cat Memes',
    sentiment: 'Neutral',
    trendScore: 64,
    liquidityEth: 710,
    volatility: 59,
    community: '8.7k active',
    change24h: 4.9,
    exposure: [41, 44, 39, 42, 46, 43, 48],
  },
  {
    id: 'solana-refugees',
    name: 'Solana Refugees',
    sentiment: 'Bullish',
    trendScore: 76,
    liquidityEth: 980,
    volatility: 67,
    community: '10.3k active',
    change24h: 12.6,
    exposure: [33, 37, 45, 49, 53, 57, 61],
  },
  {
    id: 'open-source-ai',
    name: 'Open Source AI',
    sentiment: 'Bullish',
    trendScore: 92,
    liquidityEth: 1880,
    volatility: 44,
    community: '22.4k active',
    change24h: 16.8,
    exposure: [45, 51, 55, 61, 67, 70, 79],
  },
  {
    id: 'farcaster-vibes',
    name: 'Farcaster Vibes',
    sentiment: 'Neutral',
    trendScore: 69,
    liquidityEth: 860,
    volatility: 52,
    community: '9.4k active',
    change24h: 6.1,
    exposure: [36, 40, 44, 41, 46, 51, 55],
  },
];

const VISION_PILLARS = [
  'Creator economies with programmable narrative exposure',
  'AI-driven narrative analysis and signal routing',
  'Onchain reputation systems for trusted curators',
  'Social coordination markets around shared goals',
  'Prediction layers for cultural and attention shifts',
  'Collective intelligence primitives for internet-native communities',
];

const sentimentColor: Record<Market['sentiment'], string> = {
  Bullish: '#34d399',
  Neutral: '#fbbf24',
  Bearish: '#f87171',
};

export default function Home() {
  const [selectedMarketId, setSelectedMarketId] = useState(MOCK_MARKETS[0].id);
  const [positionSide, setPositionSide] = useState<'Long' | 'Short'>('Long');
  const [sizeEth, setSizeEth] = useState(2.5);

  const selectedMarket = useMemo(
    () => MOCK_MARKETS.find((market) => market.id === selectedMarketId) ?? MOCK_MARKETS[0],
    [selectedMarketId]
  );

  const mockPnl = useMemo(() => {
    const direction = positionSide === 'Long' ? 1 : -1;
    const move = selectedMarket.change24h / 100;
    return sizeEth * move * direction;
  }, [positionSide, selectedMarket.change24h, sizeEth]);

  return (
    <>
      <Head>
        <title>MEMETH — Narrative Markets. ETH Native.</title>
        <meta
          name="description"
          content="MEMETH is the Base-native system for virtualized narrative markets. No rugs, no scam tokens, shared ETH collateral and clean settlement."
        />
      </Head>

      <div className="page">
        <div className="background-orb background-orb-a" />
        <div className="background-orb background-orb-b" />

        <header className="topbar">
          <div className="logo">MEMETH</div>
          <nav className="topbar-links">
            <a href="#why">Why MEMETH</a>
            <a href="#demo">Demo</a>
            <a href="#architecture">Architecture</a>
            <a href="#vision">Vision</a>
          </nav>
          <ConnectButton />
        </header>

        <main className="layout">
          <section className="hero">
            <p className="hero-kicker">BASE-NATIVE • VIRTUALIZED NARRATIVE MARKETS</p>
            <h1>
              Narrative Markets. ETH Native.
              <span>No Rugs. No Scam Tokens.</span>
            </h1>
            <p className="hero-copy">
              MEMETH lets people speculate on internet attention without deploying tradable token contracts.
              Users open virtual market positions, collateral stays ETH, and settlement happens on Base.
            </p>
            <div className="hero-ctas">
              <a className="cta cta-primary" href="#demo">Explore Live Demo</a>
              <a className="cta cta-secondary" href="#architecture">See Architecture</a>
            </div>
            <div className="hero-strip">
              <div>
                <strong>ETH Collateral</strong>
                <p>All balances remain ETH underneath.</p>
              </div>
              <div>
                <strong>Virtual Markets</strong>
                <p>No independent deployable assets exist.</p>
              </div>
              <div>
                <strong>Base Settlement</strong>
                <p>Fast low-cost settlement on Base.</p>
              </div>
            </div>
          </section>

          <section id="why" className="section">
            <div className="section-head">
              <h2>Speculate on attention — not deployable assets.</h2>
              <p>
                Preserve meme discovery energy while removing rugs, fake launches, malicious contracts,
                liquidity fragmentation, and token spam.
              </p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>Anti-rug by design</h3>
                <p>No creator mint button. No hidden supply. No surprise liquidity drains.</p>
              </article>
              <article className="feature-card">
                <h3>Shared ETH liquidity</h3>
                <p>One collateral pool supports all narratives. No fragmented LP hunting.</p>
              </article>
              <article className="feature-card">
                <h3>Safer social speculation</h3>
                <p>Expose to trends and communities without touching opaque token contracts.</p>
              </article>
              <article className="feature-card">
                <h3>Base-native execution</h3>
                <p>Designed for fast settlement and low-friction participation on Base.</p>
              </article>
            </div>
          </section>

          <section id="demo" className="section demo">
            <div className="section-head">
              <h2>Interactive mock narrative desk</h2>
              <p>Simulated state only — this prototype demonstrates product behavior and market framing.</p>
            </div>

            <div className="demo-grid">
              <aside className="market-list" aria-label="Narrative markets">
                {MOCK_MARKETS.map((market) => {
                  const active = selectedMarket.id === market.id;
                  return (
                    <button
                      key={market.id}
                      type="button"
                      className={`market-row ${active ? 'active' : ''}`}
                      aria-pressed={active}
                      onClick={() => setSelectedMarketId(market.id)}
                    >
                      <div>
                        <h3>{market.name}</h3>
                        <p>{market.community}</p>
                      </div>
                      <div className="market-meta">
                        <span style={{ color: sentimentColor[market.sentiment] }}>{market.sentiment}</span>
                        <strong>{market.trendScore}</strong>
                      </div>
                    </button>
                  );
                })}
              </aside>

              <div className="market-panel">
                <div className="panel-top">
                  <div>
                    <p className="panel-label">Selected Market</p>
                    <h3>{selectedMarket.name}</h3>
                  </div>
                  <div className="change-badge" data-positive={selectedMarket.change24h >= 0}>
                    {selectedMarket.change24h >= 0 ? '+' : ''}
                    {selectedMarket.change24h}%
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-card"><span>Sentiment</span><strong>{selectedMarket.sentiment}</strong></div>
                  <div className="stat-card"><span>Trend Score</span><strong>{selectedMarket.trendScore}</strong></div>
                  <div className="stat-card"><span>ETH Liquidity</span><strong>{selectedMarket.liquidityEth} ETH</strong></div>
                  <div className="stat-card"><span>Volatility</span><strong>{selectedMarket.volatility}%</strong></div>
                </div>

                <div className="exposure-card">
                  <div className="panel-top compact">
                    <p className="panel-label">Exposure chart (mock)</p>
                    <p className="panel-label">Community activity: {selectedMarket.community}</p>
                  </div>
                  <div className="bars" aria-label="Exposure chart">
                    {selectedMarket.exposure.map((point, index) => (
                      <div key={`${selectedMarket.id}-${index}`} className="bar-wrap">
                        <div className="bar" style={{ height: `${point}%` }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="trade-mock">
                  <div className="side-toggle">
                    {(['Long', 'Short'] as const).map((side) => (
                      <button
                        key={side}
                        className={positionSide === side ? 'selected' : ''}
                        onClick={() => setPositionSide(side)}
                      >
                        {side}
                      </button>
                    ))}
                  </div>

                  <label htmlFor="size-slider">Position Size: {sizeEth.toFixed(1)} ETH</label>
                  <input
                    id="size-slider"
                    type="range"
                    min={0.5}
                    max={10}
                    step={0.1}
                    value={sizeEth}
                    onChange={(event) => setSizeEth(Number(event.target.value))}
                  />

                  <div className="pnl-row">
                    <span>Simulated 24h PnL</span>
                    <strong data-positive={mockPnl >= 0}>
                      {mockPnl >= 0 ? '+' : ''}
                      {mockPnl.toFixed(3)} ETH
                    </strong>
                  </div>

                  <p className="disclaimer">
                    Demo mode only. Trades are virtualized and illustrative — no token purchases happen here.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="architecture" className="section">
            <div className="section-head">
              <h2>Simple anti-rug architecture</h2>
              <p>User positions route through one ETH pool, map to virtual markets, and settle on Base.</p>
            </div>
            <div className="architecture-grid">
              <div className="arch-node">
                <h3>User Positions</h3>
                <p>Long/short exposure intents on narratives and communities.</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-node highlight">
                <h3>Shared ETH Collateral Pool</h3>
                <p>Collateral remains ETH-native instead of fragmented token liquidity pairs.</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-node">
                <h3>Virtual Market Engine</h3>
                <p>Narrative pricing and accounting for DOGE energy, AI discourse, and more.</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-node">
                <h3>Base Settlement Layer</h3>
                <p>Final balances settle on Base with transparent low-cost execution.</p>
              </div>
            </div>
          </section>

          <section id="vision" className="section">
            <div className="section-head">
              <h2>Vision: markets for collective intelligence</h2>
              <p>
                MEMETH can become financial infrastructure for social coordination, creator alignment, and
                machine-assisted narrative discovery.
              </p>
            </div>
            <div className="vision-grid">
              {VISION_PILLARS.map((pillar) => (
                <article key={pillar} className="vision-card">{pillar}</article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          color: #ebf0ff;
          background: radial-gradient(circle at 10% 10%, rgba(19, 51, 140, 0.35), transparent 36%),
            radial-gradient(circle at 90% 0%, rgba(80, 175, 255, 0.2), transparent 35%),
            #050811;
          overflow: hidden;
          position: relative;
        }

        .background-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          z-index: 0;
          animation: drift 12s ease-in-out infinite;
        }

        .background-orb-a {
          width: 360px;
          height: 360px;
          top: -100px;
          left: -80px;
          background: rgba(52, 211, 153, 0.17);
        }

        .background-orb-b {
          width: 420px;
          height: 420px;
          top: 160px;
          right: -140px;
          background: rgba(37, 99, 235, 0.25);
          animation-delay: 2s;
        }

        .topbar,
        .layout {
          position: relative;
          z-index: 1;
        }

        .topbar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .logo {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .topbar-links {
          display: flex;
          gap: 1.2rem;
          color: #9fb2d7;
          font-size: 0.9rem;
        }

        .topbar-links a:hover {
          color: #eff6ff;
        }

        .layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }

        .hero {
          margin-top: 2rem;
          padding: 2.75rem;
          border: 1px solid rgba(112, 143, 255, 0.22);
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(11, 17, 35, 0.95), rgba(19, 34, 66, 0.85));
          backdrop-filter: blur(10px);
        }

        .hero-kicker {
          color: #60a5fa;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          margin-bottom: 1rem;
        }

        h1 {
          margin: 0;
          font-size: clamp(2rem, 5.5vw, 3.8rem);
          line-height: 1.05;
          display: grid;
          gap: 0.5rem;
        }

        h1 span {
          color: #8fe6cb;
        }

        .hero-copy {
          margin-top: 1.2rem;
          max-width: 730px;
          color: #c4d2ee;
          line-height: 1.7;
        }

        .hero-ctas {
          margin-top: 1.8rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .cta {
          padding: 0.75rem 1.1rem;
          border-radius: 10px;
          font-weight: 600;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          font-size: 0.95rem;
        }

        .cta-primary {
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          color: #f8fbff;
        }

        .cta-secondary {
          border-color: rgba(148, 175, 255, 0.45);
          color: #dbeafe;
          background: rgba(31, 56, 116, 0.25);
        }

        .cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
        }

        .hero-strip {
          margin-top: 1.9rem;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .hero-strip div {
          border: 1px solid rgba(147, 197, 253, 0.22);
          border-radius: 14px;
          padding: 0.95rem;
          background: rgba(10, 22, 49, 0.56);
        }

        .hero-strip strong {
          display: block;
          margin-bottom: 0.35rem;
        }

        .hero-strip p {
          color: #b5c6e5;
          font-size: 0.88rem;
          line-height: 1.5;
        }

        .section {
          margin-top: 2.8rem;
          padding: 2.2rem;
          border: 1px solid rgba(127, 162, 255, 0.18);
          border-radius: 20px;
          background: rgba(10, 16, 33, 0.82);
        }

        .section-head h2 {
          margin: 0;
          font-size: clamp(1.4rem, 2.3vw, 2rem);
        }

        .section-head p {
          margin-top: 0.8rem;
          color: #b5c6e5;
          line-height: 1.65;
          max-width: 780px;
        }

        .feature-grid {
          margin-top: 1.3rem;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.9rem;
        }

        .feature-card {
          padding: 1rem;
          border-radius: 14px;
          border: 1px solid rgba(147, 197, 253, 0.2);
          background: rgba(14, 31, 63, 0.55);
        }

        .feature-card h3 {
          margin: 0;
          font-size: 1.05rem;
        }

        .feature-card p {
          margin-top: 0.55rem;
          color: #c6d5ef;
          line-height: 1.55;
          font-size: 0.92rem;
        }

        .demo-grid {
          margin-top: 1.4rem;
          display: grid;
          grid-template-columns: minmax(250px, 0.95fr) minmax(0, 1.45fr);
          gap: 1rem;
        }

        .market-list {
          display: grid;
          gap: 0.5rem;
        }

        .market-row {
          border: 1px solid rgba(147, 197, 253, 0.18);
          background: rgba(16, 30, 58, 0.75);
          border-radius: 12px;
          padding: 0.75rem;
          color: #dbeafe;
          text-align: left;
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .market-row:hover {
          transform: translateY(-1px);
          border-color: rgba(96, 165, 250, 0.7);
        }

        .market-row.active {
          border-color: rgba(59, 130, 246, 0.95);
          background: linear-gradient(90deg, rgba(30, 64, 175, 0.38), rgba(15, 23, 42, 0.88));
        }

        .market-row h3 {
          font-size: 0.95rem;
          margin: 0;
        }

        .market-row p {
          font-size: 0.8rem;
          color: #9fb2d7;
          margin-top: 0.2rem;
        }

        .market-meta {
          text-align: right;
          display: grid;
        }

        .market-meta span {
          font-size: 0.76rem;
          font-weight: 700;
        }

        .market-meta strong {
          font-size: 1.05rem;
        }

        .market-panel {
          border: 1px solid rgba(147, 197, 253, 0.22);
          border-radius: 14px;
          background: rgba(6, 14, 31, 0.88);
          padding: 1rem;
          display: grid;
          gap: 0.9rem;
        }

        .panel-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.8rem;
        }

        .panel-top h3 {
          margin: 0.2rem 0 0;
        }

        .panel-label {
          color: #9fb2d7;
          font-size: 0.78rem;
        }

        .change-badge {
          font-size: 0.82rem;
          padding: 0.3rem 0.55rem;
          border-radius: 999px;
          border: 1px solid transparent;
        }

        .change-badge[data-positive='true'] {
          color: #86efac;
          border-color: rgba(74, 222, 128, 0.4);
          background: rgba(34, 197, 94, 0.15);
        }

        .change-badge[data-positive='false'] {
          color: #fca5a5;
          border-color: rgba(248, 113, 113, 0.35);
          background: rgba(239, 68, 68, 0.15);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.55rem;
        }

        .stat-card {
          border-radius: 10px;
          border: 1px solid rgba(147, 197, 253, 0.2);
          background: rgba(17, 27, 47, 0.92);
          padding: 0.55rem;
          display: grid;
          gap: 0.3rem;
        }

        .stat-card span {
          color: #9fb2d7;
          font-size: 0.73rem;
        }

        .stat-card strong {
          font-size: 0.92rem;
        }

        .exposure-card {
          border: 1px solid rgba(147, 197, 253, 0.18);
          border-radius: 12px;
          padding: 0.8rem;
          background: rgba(15, 26, 48, 0.62);
        }

        .panel-top.compact {
          margin-bottom: 0.6rem;
        }

        .bars {
          height: 110px;
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          align-items: end;
          gap: 0.45rem;
        }

        .bar-wrap {
          height: 100%;
          display: flex;
          align-items: end;
        }

        .bar {
          width: 100%;
          border-radius: 9px 9px 4px 4px;
          background: linear-gradient(180deg, rgba(56, 189, 248, 0.9), rgba(37, 99, 235, 0.45));
        }

        .trade-mock {
          border: 1px solid rgba(147, 197, 253, 0.2);
          background: rgba(12, 24, 44, 0.72);
          border-radius: 12px;
          padding: 0.9rem;
          display: grid;
          gap: 0.65rem;
        }

        .side-toggle {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.4rem;
        }

        .side-toggle button {
          border-radius: 9px;
          border: 1px solid rgba(147, 197, 253, 0.35);
          background: rgba(15, 30, 56, 0.75);
          color: #dbeafe;
          padding: 0.45rem;
          cursor: pointer;
          font-weight: 600;
        }

        .side-toggle button.selected {
          background: linear-gradient(90deg, #1d4ed8, #2563eb);
          border-color: rgba(96, 165, 250, 0.95);
        }

        input[type='range'] {
          width: 100%;
          accent-color: #60a5fa;
        }

        label {
          color: #cbdaf2;
          font-size: 0.86rem;
        }

        .pnl-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .pnl-row span {
          color: #a8bddf;
        }

        .pnl-row strong[data-positive='true'] {
          color: #86efac;
        }

        .pnl-row strong[data-positive='false'] {
          color: #fca5a5;
        }

        .disclaimer {
          color: #89a3cc;
          font-size: 0.77rem;
          line-height: 1.45;
        }

        .architecture-grid {
          margin-top: 1.4rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
          gap: 0.7rem;
          align-items: center;
        }

        .arch-node {
          border: 1px solid rgba(147, 197, 253, 0.24);
          border-radius: 14px;
          background: rgba(15, 28, 52, 0.75);
          padding: 1rem;
          min-height: 145px;
        }

        .arch-node.highlight {
          border-color: rgba(52, 211, 153, 0.5);
          box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.12), 0 12px 25px rgba(16, 185, 129, 0.12);
        }

        .arch-node h3 {
          margin: 0;
          font-size: 1rem;
        }

        .arch-node p {
          margin-top: 0.6rem;
          color: #c0d0eb;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .arch-arrow {
          color: #7fb7ff;
          font-size: 1.2rem;
          text-align: center;
        }

        .vision-grid {
          margin-top: 1.2rem;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .vision-card {
          border: 1px solid rgba(147, 197, 253, 0.2);
          border-radius: 12px;
          background: rgba(14, 28, 54, 0.68);
          padding: 0.95rem;
          color: #d3def2;
          line-height: 1.52;
          font-size: 0.9rem;
        }

        @keyframes drift {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
        }

        @media (max-width: 1100px) {
          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .architecture-grid {
            grid-template-columns: 1fr;
          }

          .arch-arrow {
            transform: rotate(90deg);
            margin: -0.4rem 0;
          }

          .vision-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 840px) {
          .topbar {
            flex-wrap: wrap;
          }

          .topbar-links {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .hero {
            padding: 1.5rem;
          }

          .hero-strip,
          .feature-grid,
          .vision-grid {
            grid-template-columns: 1fr;
          }

          .demo-grid {
            grid-template-columns: 1fr;
          }

          .section {
            padding: 1.3rem;
          }
        }
      `}</style>
    </>
  );
}
