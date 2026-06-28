"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, BookOpen, Star, Compass } from "lucide-react";

// Count up counter component for premium stats section
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  // Extract numeric value from string (e.g. "5+" -> 5, "15+" -> 15)
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;
    if (value === "∞") {
      setCount(999); // visual representation
      return;
    }

    let start = 0;
    const duration = 2000; // ms
    const incrementTime = Math.max(Math.floor(duration / numericValue), 30);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= numericValue) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, numericValue, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-2xl bg-card-bg border border-card-border backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg hover:border-cyan-500/30 transition-all hover:bg-card-bg/80 group"
    >
      <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:scale-105 transition-transform duration-300 font-mono">
        {value === "∞" ? "∞" : `${count}${suffix}`}
      </span>
      <span className="text-xs font-medium text-slate-400 mt-2 tracking-wide uppercase font-mono">
        {label}
      </span>
    </motion.div>
  );
}

export default function About() {
  const { bioLong, stats, name } = portfolioData.personal;

  const cardIcons = [
    <Award key="0" className="w-5 h-5 text-cyan-400" />,
    <Compass key="1" className="w-5 h-5 text-purple-400" />,
    <BookOpen key="2" className="w-5 h-5 text-indigo-400" />,
    <Star key="3" className="w-5 h-5 text-pink-400" />,
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background text-foreground">
      {/* Light gradient meshes */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"
          />
        </div>

        {/* Narrative layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Storyteller column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              My Engineering Philosophy
            </h3>
            {bioLong.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Metrics / Info Cards Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            
            {/* Quick metrics grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <AnimatedCounter key={index} value={stat.value} label={stat.label} />
              ))}
            </div>

            {/* Mindset Highlights */}
            <div className="p-6 rounded-2xl bg-card-bg border border-card-border backdrop-blur-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest font-mono">
                Core Strengths
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/30">
                    <Award className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground text-sm">Full-Stack Capability</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Bridging elegant interactive frontends with clean databases and APIs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-800/30">
                    <Compass className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground text-sm">Problem Solving</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Thriving on complex logic tasks, custom algorithms, and system integrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
