import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

/* ── Animated number counter ─────────────────────────────────── */
function AnimatedStat({ value, prefix = "", suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const num = parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(+(eased * num).toFixed(num % 1 !== 0 ? 1 : 0));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{prefix}{display}{suffix}</>;
}

/* ── NicheMarketCard ─────────────────────────────────────────── */
export function NicheMarketCard({ data }) {
  const {
    niche = "B2B SaaS / EdTech",
    marketSize = "50B",
    growthRate = "18",
    targetAudience = "SMBs & Enterprises",
    competitionLevel = "Medium",
  } = data || {};

  const stats = [
    { label: "Market Size", value: marketSize, prefix: "$", suffix: "", icon: "📊" },
    { label: "Annual Growth", value: growthRate, prefix: "", suffix: "%", icon: "📈" },
    { label: "Target Audience", value: targetAudience, raw: true, icon: "🎯" },
    { label: "Competition", value: competitionLevel, raw: true, icon: "⚔️" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Niche label */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
        }}>Market Niche</span>
        <motion.div
          animate={{ boxShadow: ["0 0 8px #7c3aed55", "0 0 20px #a78bfa88", "0 0 8px #7c3aed55"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            padding: "5px 16px",
            borderRadius: 999,
            background: "rgba(109,40,217,0.25)",
            border: "1px solid rgba(167,139,250,0.45)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#c4b5fd",
          }}
        >
          {niche}
        </motion.div>
      </div>

      {/* Stat grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 12,
      }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            style={{
              padding: "16px 18px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", flexDirection: "column", gap: 6,
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: s.raw ? "0.9rem" : "1.4rem",
              color: "#f0e6ff",
              lineHeight: 1.2,
            }}>
              {s.raw ? s.value : (
                <AnimatedStat
                  value={parseFloat(s.value)}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              )}
            </span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.68rem",
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
            }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── CompetitorRadar ─────────────────────────────────────────── */
const COLORS = ["#a78bfa", "#34d399", "#f472b6", "#60a5fa", "#fb923c"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(15,10,40,0.95)",
      border: "1px solid rgba(167,139,250,0.3)",
      borderRadius: 10,
      padding: "10px 14px",
      backdropFilter: "blur(12px)",
    }}>
      {payload.map((p, i) => (
        <div key={i} style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem",
          color: p.color,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: p.color, display: "inline-block",
          }} />
          <strong>{p.name}</strong>: {p.value}
        </div>
      ))}
    </div>
  );
};

export function CompetitorRadar({ competitors }) {
  const defaultCompetitors = [
    { name: "Your Idea", innovation: 85, marketShare: 20, funding: 30, brand: 40, tech: 80 },
    { name: "Competitor A", innovation: 60, marketShare: 75, funding: 85, brand: 80, tech: 65 },
    { name: "Competitor B", innovation: 70, marketShare: 55, funding: 60, brand: 65, tech: 70 },
  ];

  const data = [
    { axis: "Innovation" },
    { axis: "Market Share" },
    { axis: "Funding" },
    { axis: "Brand" },
    { axis: "Tech" },
  ].map((item) => {
    const row = { axis: item.axis };
    (competitors || defaultCompetitors).forEach((c) => {
      row[c.name] = c[item.axis.toLowerCase().replace(" ", "")] || 50;
    });
    return row;
  });

  const list = competitors || defaultCompetitors;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <p style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "0.82rem",
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        marginBottom: 16,
      }}>
        Competitive Landscape
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fill: "rgba(255,255,255,0.45)",
            }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          {list.map((c, i) => (
            <Radar
              key={c.name}
              name={c.name}
              dataKey={c.name}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={0.1}
              strokeWidth={2}
              dot={{ r: 3, fill: COLORS[i % COLORS.length] }}
            />
          ))}
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.5)",
              paddingTop: 8,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default function MarketComponents({ analysis }) {
  const {
    niche = analysis?.niche || "B2B SaaS",
    market = analysis?.market || {},
  } = {};

  const marketSize = market.size?.match(/\$?([\d.]+)/)?.[1] || "50";
  const growthRate = market.growthRate?.match(/(\d+)/)?.[1] || "18";
  const targetAudience = market.targetAudience || "SMBs & Enterprises";

  const competitors = analysis?.competitors || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <NicheMarketCard
        data={{
          niche,
          marketSize,
          growthRate,
          targetAudience,
        }}
      />
      <CompetitorRadar competitors={competitors} />
    </div>
  );
}
