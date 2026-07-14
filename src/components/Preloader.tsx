"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const increment = 2;
    const stepTime = duration / (100 / increment);

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Brief delay before sliding curtain
        setTimeout(() => {
          setComplete(true);
        }, 350);
      } else {
        setProgress(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050212] text-white font-mono select-none"
        >
          <div className="relative text-center">
            {/* Monospace progress number with mask reveal animation */}
            <div className="overflow-hidden">
              <motion.h1 
                className="text-8xl sm:text-[140px] font-black tracking-tighter text-slate-100"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {progress.toString().padStart(3, "0")}%
              </motion.h1>
            </div>
            
            <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.25em] mt-6 font-semibold">
              Loading Portfolio
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
