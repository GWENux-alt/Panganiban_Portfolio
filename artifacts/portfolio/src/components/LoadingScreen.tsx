import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return p + Math.random() * 12 + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(270 60% 8%) 0%, hsl(280 50% 12%) 50%, hsl(320 40% 10%) 100%)",
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Floating orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  background: i % 2 === 0
                    ? "radial-gradient(circle, rgba(139,92,180,0.2) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(219,112,147,0.2) 0%, transparent 70%)",
                  left: `${10 + (i * 15)}%`,
                  top: `${20 + (i * 10)}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Logo / Name */}
          <motion.div
            className="relative z-10 flex flex-col items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated logo mark */}
            <motion.div
              className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, hsl(270 60% 55%), hsl(320 50% 60%))",
                boxShadow: "0 0 40px rgba(139,92,180,0.5), 0 0 80px rgba(219,112,147,0.3)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                G
              </span>
              {/* Orbit ring */}
              <motion.div
                className="absolute inset-[-8px] rounded-2xl border border-purple-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.h1
              className="text-3xl font-bold text-white tracking-wider mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Jezimiel Gwen
            </motion.h1>
            <motion.p
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "rgba(219,112,147,0.8)" }}
            >
              Portfolio
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative z-10 w-64 md:w-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs text-purple-300/60 tracking-widest uppercase">Loading</span>
              <span className="text-xs font-mono" style={{ color: "rgba(219,112,147,0.8)" }}>
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(270 60% 60%), hsl(320 50% 65%), hsl(340 55% 70%))",
                  boxShadow: "0 0 10px rgba(219,112,147,0.5)",
                }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="absolute bottom-12 text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Information Technology Graduate
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
