import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

function getScoreColor(score) {
  if (score <= 33) return { start: "#ef4444", end: "#f97316", label: "Needs Work", badge: "#ef4444" };
  if (score <= 66) return { start: "#f59e0b", end: "#eab308", label: "Good", badge: "#d97706" };
  return { start: "#10b981", end: "#22c55e", label: "Excellent", badge: "#059669" };
}

function getPercentile(score) {
  if (score >= 90) return 5;
  if (score >= 80) return 15;
  if (score >= 70) return 25;
  if (score >= 60) return 40;
  if (score >= 50) return 50;
  return 100 - score;
}

export default function ScoreMeter({ score = 75 }) {
  const [displayScore, setDisplayScore] = useState(0);
  const colors = getScoreColor(score);
  const percentile = getPercentile(score);

  // Animate count-up
  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [score]);

  // SVG arc calculation
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 88;
  const strokeWidth = 14;
  const startAngle = -210; // degrees
  const totalAngle = 240;
  const pct = displayScore / 100;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const arcPath = (pct) => {
    const angle = startAngle + totalAngle * pct;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(angle));
    const y2 = cy + r * Math.sin(toRad(angle));
    const largeArc = totalAngle * pct > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const circumference = (totalAngle / 360) * 2 * Math.PI * r;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size}>
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.start} />
              <stop offset="100%" stopColor={colors.end} />
            </linearGradient>
            <filter id="arcGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Track */}
          <path
            d={arcPath(1)}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active arc */}
          <motion.path
            d={arcPath(1)}
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            filter="url(#arcGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: pct }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ pathLength: pct }}
          />

          {/* Tick marks */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const angle = toRad(startAngle + totalAngle * t);
            const inner = r - strokeWidth - 6;
            const outer = r + strokeWidth + 4;
            return (
              <line
                key={t}
                x1={cx + inner * Math.cos(angle)}
                y1={cy + inner * Math.sin(angle)}
                x2={cx + (r - strokeWidth / 2) * Math.cos(angle)}
                y2={cy + (r - strokeWidth / 2) * Math.sin(angle)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1.5}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 2,
        }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "3.2rem",
              lineHeight: 1,
              background: `linear-gradient(135deg, ${colors.start}, ${colors.end})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {displayScore}
          </motion.span>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.4)",
          }}>
            / 100
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.5)",
              marginTop: 2,
            }}
          >
            Top {percentile}%
          </motion.span>
        </div>
      </div>

      {/* Verdict badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 18px",
          borderRadius: 999,
          background: `${colors.badge}22`,
          border: `1px solid ${colors.badge}55`,
        }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: colors.badge,
          boxShadow: `0 0 8px ${colors.badge}`,
          display: "inline-block",
        }} />
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.82rem",
          letterSpacing: "0.06em",
          color: colors.end,
        }}>
          {colors.label}
        </span>
      </motion.div>
    </div>
  );
}