import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalyze } from "../hooks/useAnalyze";
import LoadingAnimation from "./LoadingAnimation";

function Textarea({ value, onChange, placeholder, maxLength, disabled, ...props }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      {...props}
      style={{
        width: "100%",
        minHeight: 160,
        padding: "14px 16px",
        borderRadius: 12,
        border: "1.5px solid rgba(139,92,246,0.35)",
        background: "rgba(255,255,255,0.04)",
        color: "#e9d5ff",
        fontSize: "0.95rem",
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.65,
        resize: "vertical",
        outline: "none",
        transition: "border-color 0.25s, box-shadow 0.25s",
        boxShadow: "inset 0 1px 8px rgba(0,0,0,0.25)",
        ...(props.style || {}),
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "rgba(167,139,250,0.7)";
        e.target.style.boxShadow =
          "inset 0 1px 8px rgba(0,0,0,0.25), 0 0 0 3px rgba(139,92,246,0.15)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "rgba(139,92,246,0.35)";
        e.target.style.boxShadow = "inset 0 1px 8px rgba(0,0,0,0.25)";
      }}
    />
  );
}

export default function IdeaInputForm() {
  const [idea, setIdea] = useState("");
  const { analyze, loading, error } = useAnalyze();

  const MIN = 50;
  const MAX = 2000;
  const len = idea.length;
  const tooShort = len > 0 && len < MIN;
  const canSubmit = len >= MIN && len <= MAX && !loading;

  const pct = Math.min(len / MAX, 1);
  const counterColor =
    len > MAX * 0.9 ? "#f87171" : len >= MIN ? "#86efac" : "#a78bfa";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    await analyze(idea);
  };

  return (
    <div style={{ width: "100%" }}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div style={{ position: "relative" }}>
              <Textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your startup idea in detail…"
                maxLength={MAX}
                disabled={loading}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: 2,
                  width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "0 0 12px 12px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={{ width: `${pct * 100}%` }}
                  transition={{ duration: 0.2 }}
                  style={{
                    height: "100%",
                    background:
                      len > MAX * 0.9
                        ? "linear-gradient(90deg,#f87171,#ef4444)"
                        : "linear-gradient(90deg,#7c3aed,#a78bfa)",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.78rem",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              <AnimatePresence>
                {tooShort && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    style={{ color: "#fbbf24" }}
                  >
                    ⚠ Minimum {MIN} characters required
                  </motion.span>
                )}
                {!tooShort && <span />}
              </AnimatePresence>
              <span style={{ color: counterColor }}>
                {len} / {MAX}
              </span>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    color: "#f87171",
                    fontSize: "0.85rem",
                    fontFamily: "'DM Sans', sans-serif",
                    margin: 0,
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.025 } : {}}
              whileTap={canSubmit ? { scale: 0.97 } : {}}
              style={{
                position: "relative",
                width: "100%",
                padding: "14px 24px",
                borderRadius: 12,
                border: "none",
                cursor: canSubmit ? "pointer" : "not-allowed",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.03em",
                color: canSubmit ? "#fff" : "rgba(255,255,255,0.35)",
                background: canSubmit
                  ? "linear-gradient(135deg,#6d28d9 0%,#7c3aed 40%,#9333ea 100%)"
                  : "rgba(255,255,255,0.06)",
                overflow: "hidden",
                transition: "background 0.3s, color 0.3s",
                boxShadow: canSubmit
                  ? "0 4px 24px rgba(109,40,217,0.45), 0 1px 0 rgba(255,255,255,0.08) inset"
                  : "none",
              }}
            >
              {canSubmit && (
                <motion.span
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1,
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "50%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                    pointerEvents: "none",
                  }}
                />
              )}
              Analyze My Idea 🚀
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
