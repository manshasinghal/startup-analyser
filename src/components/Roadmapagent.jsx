import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Share2, Bot, CheckCircle } from "lucide-react";

/* ── StepCard ────────────────────────────────────────────────── */
function StepCard({ step, index, isLast }) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
          style={{
            width: 40, height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6d28d9, #9333ea)",
            border: "2px solid rgba(167,139,250,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "0.9rem",
            color: "#fff",
            flexShrink: 0,
            boxShadow: "0 0 20px rgba(109,40,217,0.4)",
          }}
        >
          {index + 1}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5, ease: "easeOut" }}
            style={{
              width: 2,
              flex: 1,
              minHeight: 40,
              background: "linear-gradient(180deg, rgba(167,139,250,0.5), rgba(167,139,250,0.05))",
              transformOrigin: "top",
              marginTop: 4,
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: 1,
          padding: "20px 22px",
          borderRadius: 16,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(167,139,250,0.15)",
          marginBottom: isLast ? 0 : 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#f0e6ff",
              marginBottom: 3,
            }}>{step.title}</p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
            }}>{step.description}</p>
          </div>
          {/* Timeframe chip */}
          <div style={{
            flexShrink: 0,
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(109,40,217,0.2)",
            border: "1px solid rgba(167,139,250,0.3)",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.05em",
            color: "#c4b5fd",
            whiteSpace: "nowrap",
          }}>
            {step.timeframe}
          </div>
        </div>

        {/* Resources & KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Resources", items: step.resources, color: "#60a5fa" },
            { label: "KPIs", items: step.kpis, color: "#34d399" },
          ].map(({ label, items, color }) => (
            <div key={label}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                marginBottom: 6,
              }}>{label}</p>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                {(items || []).map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: color, display: "inline-block", flexShrink: 0,
                      marginTop: 2,
                    }} />
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.55)",
                    }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── AdvicePanel ─────────────────────────────────────────────── */
function AdvicePanel({ advice }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(advice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        padding: "24px 26px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(167,139,250,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: "1rem" }}>✨</span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.78rem",
          letterSpacing: "0.1em",
          color: "#a78bfa",
          textTransform: "uppercase",
        }}>Strategic Advice</span>
      </div>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.88rem",
        lineHeight: 1.75,
        color: "rgba(233,213,255,0.75)",
        marginBottom: 18,
      }}>{advice}</p>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={handleCopy}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid rgba(167,139,250,0.3)",
            background: "rgba(109,40,217,0.15)",
            color: "#c4b5fd",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: "0.78rem",
            cursor: "pointer",
            letterSpacing: "0.04em",
            transition: "all 0.2s",
          }}
        >
          {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
          {copied ? "Copied!" : "Copy Advice"}
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: "Startup Roadmap", text: advice });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: "0.78rem",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          <Share2 size={13} />
          Share Roadmap
        </button>
      </div>
    </motion.div>
  );
}

/* ── RoadmapAgent ────────────────────────────────────────────── */
const DEFAULT_ADVICE =
  "Focus on rapid customer discovery before writing a single line of code. Your competitive moat isn't the idea — it's the distribution network and data flywheel you build in months 1-6. Prioritize one ICP, nail retention, then expand.";

export default function RoadmapAgent({ idea, analysisText }) {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(DEFAULT_ADVICE);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const launch = async () => {
    setStarted(true);
    setLoading(true);
    setSteps([]);
  
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: idea || "AI-powered startup",
          analysisSummary: analysisText || "",
        }),
      });
  
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
  
      const data = await res.json();
      setAdvice(data.advice || DEFAULT_ADVICE);
  
      // Stream steps in one by one with delay
      for (let i = 0; i < (data.steps || []).length; i++) {
        await new Promise((r) => setTimeout(r, 400));
        setSteps((prev) => [...prev, data.steps[i]]);
      }
      setDone(true);
    } catch (e) {
      console.error("Error:", e);
      // Fallback steps (keep existing fallback code)
      const fallback = [
        { title: "Customer Discovery", description: "Interview 50+ potential customers to validate pain points. Map the customer journey and identify friction points.", timeframe: "Weeks 1-4", resources: ["Calendly", "Notion CRM", "Typeform"], kpis: ["50 interviews", "3 key pain points", "1 validated ICP"] },
        { title: "MVP Development", description: "Build the smallest version that solves the core pain. Avoid feature creep ruthlessly.", timeframe: "Weeks 5-12", resources: ["Cursor AI", "Supabase", "Vercel"], kpis: ["MVP live", "10 beta users", "< 2s load time"] },
        { title: "Beta Launch", description: "Onboard first 100 users and gather qualitative feedback. Set up analytics from day one.", timeframe: "Months 3-4", resources: ["PostHog", "Intercom", "Loom"], kpis: ["100 users", "40% retention", "NPS > 30"] },
        { title: "Revenue & PMF", description: "Introduce pricing and measure willingness to pay. Iterate until you see organic growth.", timeframe: "Months 5-8", resources: ["Stripe", "Paddle", "Baremetrics"], kpis: ["$5K MRR", "< 5% churn", "3 paid plans"] },
        { title: "Scale & Fundraise", description: "Double down on the channel that's working. Prepare a fundraising narrative with real metrics.", timeframe: "Months 9-12", resources: ["AngelList", "Pitch.com", "Docsend"], kpis: ["$25K MRR", "Pitch deck ready", "5 investor meetings"] },
      ];
      for (const step of fallback) {
        await new Promise((r) => setTimeout(r, 350));
        setSteps((prev) => [...prev, step]);
      }
      setDone(true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Launch button / terminal header */}
      {!started ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "40px 0" }}
        >
          <motion.button
            onClick={launch}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "15px 32px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #6d28d9, #9333ea)",
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              letterSpacing: "0.03em",
              boxShadow: "0 4px 24px rgba(109,40,217,0.5), 0 1px 0 rgba(255,255,255,0.1) inset",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.span
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              style={{
                position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                pointerEvents: "none",
              }}
            />
            <Bot size={18} />
            Launch AI Roadmap Agent 🤖
          </motion.button>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.06em",
          }}>
            Generates a personalized 5-step launch plan
          </p>
        </motion.div>
      ) : (
        <>
          {/* Terminal header */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              {["#ef4444","#f59e0b","#22c55e"].map((c) => (
                <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.4)",
            }}>
              {loading ? (
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  ▋ Agent is planning your startup…
                </motion.span>
              ) : (
                <span style={{ color: "#22c55e" }}>✓ Roadmap generated</span>
              )}
            </span>
          </motion.div>

          {/* Steps */}
          <AnimatePresence>
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} isLast={i === steps.length - 1 && done} />
            ))}
          </AnimatePresence>

          {loading && steps.length < 5 && (
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                padding: "16px 22px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(167,139,250,0.2)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.78rem",
                color: "rgba(167,139,250,0.5)",
              }}
            >
              ▋ Generating next step…
            </motion.div>
          )}
        </>
      )}

      {/* Advice panel — always visible */}
      <AdvicePanel advice={advice} />
    </div>
  );
}