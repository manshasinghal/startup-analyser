import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5 py-8"
    >
      {/* Pulsing brain SVG */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
            width: "100%",
            height: "100%",
          }}
        />

        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brainGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Brain shape — two hemispheres */}
          <g filter="url(#glow)">
            {/* Left hemisphere */}
            <path
              d="M40 18 C28 18 18 26 18 36 C18 42 21 47 26 50 C24 53 24 57 27 59 C29 61 32 61 34 60 C35 63 37 65 40 65"
              stroke="url(#brainGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right hemisphere */}
            <path
              d="M40 18 C52 18 62 26 62 36 C62 42 59 47 54 50 C56 53 56 57 53 59 C51 61 48 61 46 60 C45 63 43 65 40 65"
              stroke="url(#brainGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Center divide */}
            <line
              x1="40"
              y1="18"
              x2="40"
              y2="65"
              stroke="url(#brainGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
            {/* Neural folds — left */}
            <path
              d="M26 33 C30 30 34 33 32 38"
              stroke="#c4b5fd"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M22 42 C27 39 31 43 29 48"
              stroke="#c4b5fd"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Neural folds — right */}
            <path
              d="M54 33 C50 30 46 33 48 38"
              stroke="#c4b5fd"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M58 42 C53 39 49 43 51 48"
              stroke="#c4b5fd"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Orbiting dots */}
          {[0, 120, 240].map((deg, i) => (
            <motion.circle
              key={i}
              r="3"
              fill="#a78bfa"
              animate={{
                cx: [
                  40 + 32 * Math.cos(((deg + 0) * Math.PI) / 180),
                  40 + 32 * Math.cos(((deg + 360) * Math.PI) / 180),
                ],
                cy: [
                  40 + 32 * Math.sin(((deg + 0) * Math.PI) / 180),
                  40 + 32 * Math.sin(((deg + 360) * Math.PI) / 180),
                ],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.6,
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Animated text */}
      <div className="text-center space-y-2">
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(90deg, #a78bfa, #e879f9, #a78bfa)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI is analyzing your idea…
        </motion.p>

        {/* Dot loader */}
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              style={{
                display: "block",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}