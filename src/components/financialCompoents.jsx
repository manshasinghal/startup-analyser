import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";

/* ── Animated number ─────────────────────────────────────────── */
function AnimatedNum({ value, prefix = "", suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const num = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(+(e * num).toFixed(num % 1 !== 0 ? 1 : 0));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{prefix}{display}{suffix}</>;
}

/* ── Progress bar (shadcn-like) ──────────────────────────────── */
function ProgressBar({ value, max = 100, color = "#a78bfa", label }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginBottom: 6,
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.4)",
        }}>
          <span>{label}</span>
          <span style={{ color: "#c4b5fd" }}>{value} mo</span>
        </div>
      )}
      <div style={{
        height: 8,
        borderRadius: 999,
        background: "rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            height: "100%",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Revenue chart tooltip ───────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(12,8,32,0.95)",
      border: "1px solid rgba(167,139,250,0.3)",
      borderRadius: 10,
      padding: "10px 14px",
      backdropFilter: "blur(12px)",
    }}>
      <p style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.72rem",
        color: "rgba(255,255,255,0.4)",
        marginBottom: 4,
      }}>Month {label}</p>
      <p style={{
        
        fontWeight: 700,
        fontSize: "0.95rem",
        color: "#a78bfa",
      }}>
        ${payload[0]?.value?.toLocaleString()}
      </p>
    </div>
  );
};

/* ── FinancialCard ───────────────────────────────────────────── */
export default function FinancialCard({ data }) {
  const {
    revenueModel = "SaaS Subscription",
    revenueMin = "120K",
    revenueMax = "450K",
    breakEvenMonths = 14,
    fundingStage = "Pre-Seed / Angel",
    fundingIcon = "🌱",
  } = data || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {/* Revenue model */}
      <div style={{
        padding: "20px 22px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
        }}>Revenue Model</span>
        <div style={{
          display: "inline-flex",
          padding: "5px 14px",
          borderRadius: 999,
          background: "rgba(109,40,217,0.2)",
          border: "1px solid rgba(167,139,250,0.3)",
          width: "fit-content",
        }}>
          <span style={{
            
            fontWeight: 700,
            fontSize: "0.82rem",
            color: "#c4b5fd",
          }}>{revenueModel}</span>
        </div>
      </div>

      {/* Revenue range */}
      <div style={{
        padding: "20px 22px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
        }}>Est. Year-1 Revenue</span>
        <span style={{
          
          fontWeight: 800,
          fontSize: "1.6rem",
          color: "#f0e6ff",
          lineHeight: 1,
        }}>
          $<AnimatedNum value={parseFloat(revenueMin)} />K
          <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400, fontSize: "1rem" }}> – </span>
          $<AnimatedNum value={parseFloat(revenueMax)} />K
        </span>
      </div>

      {/* Break-even */}
      <div style={{
        padding: "20px 22px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <ProgressBar
          value={breakEvenMonths}
          max={36}
          color="#34d399"
          label="Break-even Timeline"
        />
      </div>

      {/* Funding stage */}
      <div style={{
        padding: "20px 22px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
        }}>Recommended Funding</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1.6rem" }}>{fundingIcon}</span>
          <span style={{
           
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#e9d5ff",
          }}>{fundingStage}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── RevenueChart ────────────────────────────────────────────── */
function generateProjection(baseK = 10) {
  return Array.from({ length: 36 }, (_, i) => ({
    month: i + 1,
    revenue: Math.round(baseK * Math.pow(1.12, i) * (1 + Math.sin(i * 0.4) * 0.08)),
  }));
}

export function RevenueChart({ baseRevenue = 10 }) {
  const data = generateProjection(baseRevenue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <p style={{
        
        fontWeight: 700,
        fontSize: "0.82rem",
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        marginBottom: 16,
      }}>
        3-Year Revenue Projection
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fill: "rgba(255,255,255,0.3)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `M${v}`}
            interval={5}
          />
          <YAxis
            tick={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fill: "rgba(255,255,255,0.3)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#a78bfa"
            strokeWidth={2.5}
            fill="url(#revGrad)"
            dot={false}
            isAnimationActive={true}
            animationDuration={1800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}