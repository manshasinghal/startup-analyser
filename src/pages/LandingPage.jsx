import { motion } from "framer-motion";
import IdeaInputForm from "../components/IdeaInputForm";

function Orb({ style, animate, transition }) {
  return (
    <motion.div
      animate={animate}
      transition={transition}
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export default function LandingPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.3); border-radius: 99px; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 20% 10%, #0d0a2e 0%, #0a0118 40%, #000000 100%)",
        }}
      >
      {/* ── Star field ── */}
<svg
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    opacity: 0.45,
    pointerEvents: "none",
  }}
>
  {Array.from({ length: 80 }).map((_, i) => {
    const cx = Math.random() * 100;
    const cy = Math.random() * 100;
    const r = Math.random() * 1.2 + 0.3;
    const opacity = Math.random() * 0.6 + 0.2;
    return (
      <circle
        key={i}
        cx={`${cx}%`}
        cy={`${cy}%`}
        r={r}
        fill="white"
        opacity={opacity}
      />
    );
  })}
</svg>


        <Orb
          style={{
            width: 520,
            height: 520,
            top: "-15%",
            left: "-12%",
            background:
              "radial-gradient(circle, rgba(109,40,217,0.55) 0%, rgba(76,29,149,0.2) 60%, transparent 80%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <Orb
          style={{
            width: 400,
            height: 400,
            bottom: "-10%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.45) 0%, rgba(126,34,206,0.15) 60%, transparent 80%)",
          }}
          animate={{ x: [0, -35, 0], y: [0, -25, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <Orb
          style={{
            width: 300,
            height: 300,
            top: "50%",
            left: "60%",
            background:
              "radial-gradient(circle, rgba(196,125,251,0.3) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 20, -15, 0], y: [0, -20, 15, 0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <Orb
          style={{
            width: 200,
            height: 200,
            top: "20%",
            right: "15%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
          }}
          animate={{ x: [0, -25, 10, 0], y: [0, 20, -15, 0] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 580,
            padding: "44px 40px 40px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid rgba(167,139,250,0.2)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(109,40,217,0.12)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: 1,
              borderRadius: 999,
              background:
                "linear-gradient(90deg, transparent, rgba(167,139,250,0.7), transparent)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: 999,
              background: "rgba(109,40,217,0.25)",
              border: "1px solid rgba(167,139,250,0.3)",
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 10 }}>●</span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                color: "#c4b5fd",
              }}
            >
              POWERED BY AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{
              
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.35rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 12,
              background:
                "linear-gradient(135deg, #ffffff 30%, #c4b5fd 65%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🚀 Startup Idea Analyzer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            style={{
              
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "rgba(196,181,253,0.7)",
              marginBottom: 32,
            }}
          >
            Get AI-powered insights on your startup idea — market fit, risks,
            and strategic angles in seconds.
          </motion.p>

          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)",
              marginBottom: 28,
            }}
          />

          <IdeaInputForm />
        </motion.div>
      </div>
    </>
  );
}
