import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Scoremeter from "../components/Scoremeter";
import FinancialComponents from "../components/financialCompoents";
import MarketComponents from "../components/MarketComponents";
import Roadmapagent from "../components/Roadmapagent";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .result-root {
    min-height: 100vh;
    background: #07060f;
    color: #e8e4f0;
   
    position: relative;
    overflow-x: hidden;
  }

  /* Ambient background blobs */
  .result-root::before {
    content: '';
    position: fixed;
    top: -20%;
    left: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(120, 60, 220, 0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .result-root::after {
    content: '';
    position: fixed;
    bottom: -20%;
    right: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(200, 140, 40, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* Top bar */
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 64px;
    background: rgba(7, 6, 15, 0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .topbar-logo {
    
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232, 228, 240, 0.5);
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(232, 228, 240, 0.6);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
   
    font-size: 0.85rem;
    letter-spacing: 0.02em;
    transition: all 0.2s;
  }

  .back-btn:hover {
    border-color: rgba(200, 140, 40, 0.5);
    color: #c8aa50;
    background: rgba(200, 140, 40, 0.06);
  }

  .back-btn svg {
    width: 14px;
    height: 14px;
  }

  /* Hero section */
  .hero {
    padding: 120px 48px 0;
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
  }

  .hero-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #c8aa50;
    margin-bottom: 24px;
    font-weight: 500;
  }

  .hero-label::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #c8aa50;
  }

  .hero-title {
    
    font-size: clamp(2.2rem, 4vw, 3.8rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    color: #f0edf8;
  }

  .hero-idea {
    font-size: 0.95rem;
    color: rgba(232, 228, 240, 0.4);
    max-width: 600px;
    line-height: 1.6;
    font-style: italic;
    font-weight: 300;
  }

  /* Tab navigation */
  .tab-nav {
    position: sticky;
    top: 64px;
    z-index: 90;
    background: rgba(7, 6, 15, 0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 0 48px;
    margin-top: 48px;
  }

  .tab-nav-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    gap: 0;
  }

  .tab-btn {
    position: relative;
    background: none;
    border: none;
    color: rgba(232, 228, 240, 0.35);
    padding: 18px 28px;
    cursor: pointer;
    
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.25s;
  }

  .tab-btn:hover {
    color: rgba(232, 228, 240, 0.7);
  }

  .tab-btn.active {
    color: #f0edf8;
  }

  .tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 28px;
    right: 28px;
    height: 2px;
    background: linear-gradient(90deg, #c8aa50, #e8c96a);
    border-radius: 2px 2px 0 0;
  }

  .tab-btn-num {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: rgba(200,170,80,0.15);
    border-radius: 4px;
    font-size: 0.65rem;
    margin-right: 8px;
    color: #c8aa50;
  }

  /* Main content */
  .main-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 56px 48px 100px;
    position: relative;
    z-index: 1;
  }

  /* Overview grid */
  .overview-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    background: rgba(255,255,255,0.04);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 2px;
  }

  .overview-cell {
    background: #0d0b1a;
    padding: 40px;
  }

  .overview-cell.full-width {
    grid-column: 1 / -1;
  }

  .overview-cell.accent-border {
    border-left: 3px solid #c8aa50;
  }

  .section-eyebrow {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(232, 228, 240, 0.3);
    margin-bottom: 20px;
    font-weight: 500;
  }

  .section-title {
    
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .overview-text {
    font-size: 1rem;
    line-height: 1.75;
    color: rgba(232, 228, 240, 0.65);
    font-weight: 300;
  }

  /* Strengths / Weaknesses */
  .sw-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    background: rgba(255,255,255,0.04);
    border-radius: 16px;
    overflow: hidden;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .strengths-cell {
    background: #0a0d10;
    padding: 40px;
    border-top: 2px solid rgba(134, 239, 172, 0.3);
  }

  .weaknesses-cell {
    background: #110a0a;
    padding: 40px;
    border-top: 2px solid rgba(248, 113, 113, 0.3);
  }

  .sw-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 0.9rem;
    color: rgba(232, 228, 240, 0.7);
    line-height: 1.5;
  }

  .sw-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .sw-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    margin-top: 2px;
  }

  .sw-icon.pos {
    background: rgba(134, 239, 172, 0.15);
    color: #86efac;
    border: 1px solid rgba(134, 239, 172, 0.3);
  }

  .sw-icon.neg {
    background: rgba(248, 113, 113, 0.15);
    color: #f87171;
    border: 1px solid rgba(248, 113, 113, 0.3);
  }

  /* Tags */
  .tags-cell {
    background: #0d0b1a;
    padding: 32px 40px;
    border-radius: 16px;
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .tags-label {
    
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(232,228,240,0.3);
    white-space: nowrap;
    font-weight: 600;
  }

  .tags-list {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tag {
    padding: 6px 14px;
    background: rgba(200, 170, 80, 0.08);
    border: 1px solid rgba(200, 170, 80, 0.2);
    border-radius: 100px;
    font-size: 0.78rem;
    color: #c8aa50;
    letter-spacing: 0.03em;
    transition: all 0.2s;
  }

  .tag:hover {
    background: rgba(200, 170, 80, 0.15);
    border-color: rgba(200, 170, 80, 0.4);
  }

  /* Scoremeter wrapper */
  .score-wrapper {
    background: #0d0b1a;
    border-radius: 16px;
    padding: 48px 40px;
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 48px;
  }

  .score-divider {
    width: 1px;
    height: 120px;
    background: rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  .score-meta {
    flex: 1;
  }

  .score-meta-title {
    
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(232,228,240,0.3);
    margin-bottom: 12px;
  }

  .score-verdict {
    
    font-size: 1.8rem;
    font-weight: 800;
    color: #f0edf8;
    line-height: 1.1;
    margin-bottom: 12px;
  }

  .score-sub {
    font-size: 0.85rem;
    color: rgba(232,228,240,0.4);
    line-height: 1.5;
    font-weight: 300;
  }

  /* Empty state */
  .empty-state {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    background: #07060f;
   
    color: rgba(232,228,240,0.5);
  }

  .empty-state h2 {
    
    font-size: 1.5rem;
    color: #f0edf8;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .topbar { padding: 0 20px; }
    .hero { padding: 100px 20px 0; }
    .tab-nav { padding: 0 20px; }
    .main-content { padding: 40px 20px 80px; }
    .overview-grid { grid-template-columns: 1fr; }
    .sw-grid { grid-template-columns: 1fr; }
    .score-wrapper { flex-direction: column; gap: 24px; }
    .score-divider { width: 100%; height: 1px; }
    .hero-title { font-size: 2rem; }
  }
`;

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis, idea } = location.state || {};
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", num: "01" },
    { id: "market", label: "Market & Niche", num: "02" },
    { id: "financial", label: "Financial", num: "03" },
    { id: "roadmap", label: "AI Roadmap", num: "04" },
  ];

  if (!analysis) {
    return (
      <>
        <style>{styles}</style>
        <div className="empty-state">
          <h2>No Analysis Found</h2>
          <p>Please go back and analyze an idea first.</p>
          <button
            onClick={() => navigate("/")}
            className="back-btn"
            style={{ border: "1px solid rgba(200,170,80,0.4)", color: "#c8aa50", padding: "12px 24px", fontSize: "0.9rem" }}
          >
            ← Return Home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="result-root">

        {/* Top Bar */}
        <header className="topbar">
          <span className="topbar-logo">Venture · AI</span>
          <button className="back-btn" onClick={() => navigate("/")}>
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 2L4 7l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        </header>

        {/* Hero */}
        <motion.section
          className="hero"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-label">Analysis Report</div>
          <h1 className="hero-title">
            Idea<br />Intelligence
          </h1>
          {idea && (
            <p className="hero-idea">"{idea.substring(0, 120)}{idea.length > 120 ? "..." : ""}"</p>
          )}
        </motion.section>

        {/* Tab Nav */}
        <nav className="tab-nav">
          <div className="tab-nav-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-btn-num">{tab.num}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >

              {activeTab === "overview" && (
                <div>
                  {/* Score + Verdict */}
                  <div className="score-wrapper">
                    <Scoremeter score={analysis.percentileScore} verdict={analysis.verdict} />
                    <div className="score-divider" />
                    <div className="score-meta">
                      <div className="score-meta-title">Verdict</div>
                      <div className="score-verdict">{analysis.verdict}</div>
                      <div className="score-sub">
                        Scoring in the {analysis.percentileScore}th percentile across all evaluated ideas.
                      </div>
                    </div>
                  </div>

                  {/* Overview text */}
                  <div className="overview-grid">
                    <div className="overview-cell full-width accent-border">
                      <div className="section-eyebrow">Summary</div>
                      <p className="overview-text">{analysis.overview}</p>
                    </div>
                  </div>

                  {/* Strengths / Weaknesses */}
                  <div className="sw-grid">
                    <div className="strengths-cell">
                      <div className="section-title" style={{ color: "#86efac" }}>Strengths</div>
                      {analysis.strengths?.map((s, i) => (
                        <div key={i} className="sw-item">
                          <span className="sw-icon pos">✓</span>
                          {s}
                        </div>
                      ))}
                    </div>
                    <div className="weaknesses-cell">
                      <div className="section-title" style={{ color: "#f87171" }}>Weaknesses</div>
                      {analysis.weaknesses?.map((w, i) => (
                        <div key={i} className="sw-item">
                          <span className="sw-icon neg">✕</span>
                          {w}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="tags-cell">
                    <span className="tags-label">Tags</span>
                    <div className="tags-list">
                      {analysis.tags?.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "market" && <MarketComponents analysis={analysis} />}
              {activeTab === "financial" && <FinancialComponents analysis={analysis} />}
              {activeTab === "roadmap" && <Roadmapagent analysis={analysis} idea={idea} />}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}