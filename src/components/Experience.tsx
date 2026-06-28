"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, GraduationCap } from "lucide-react";

// Individual timeline item
function TimelineItem({ item, idx }: { item: any; idx: number }) {
  const isEducation = item.type === "education";

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-9 gap-4 md:gap-8 mb-16 last:mb-0">
      
      {/* Date Column (Left) */}
      <div className="md:col-span-3 text-left md:text-right pt-1 flex flex-col md:items-end justify-start">
        <span className="text-cyan-400 font-bold font-mono text-sm tracking-wide">
          {item.date}
        </span>
        <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-widest font-mono mt-1">
          {item.type}
        </span>
      </div>

      {/* Center Icon Node (Timeline Axis Pin) */}
      <div className="hidden md:flex col-span-1 justify-center relative">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className={`w-10 h-10 rounded-full border-2 bg-slate-950 flex items-center justify-center z-10 shadow-lg ${
            isEducation ? "border-purple-500 text-purple-400" : "border-cyan-500 text-cyan-400"
          }`}
        >
          {isEducation ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
        </motion.div>
      </div>

      {/* Card Details (Right) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="md:col-span-5 p-6 rounded-2xl bg-card-bg border border-card-border backdrop-blur-sm shadow-xl hover:border-cyan-500/20 transition-all"
      >
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
          {item.title}
        </h3>
        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 font-mono mb-4">
          {item.subtitle}
        </h4>
        
        {/* Bullet Logs */}
        <ul className="space-y-3">
          {item.points.map((pt: string, ptIdx: number) => (
            <li key={ptIdx} className="flex gap-2.5 items-start text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 shrink-0 mt-2" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const { experience } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic scroll tracking for vertical progress line in timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-background text-foreground">
      {/* Background glow meshes */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight"
          >
            History & Growth
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"
          />
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-6 text-sm sm:text-base">
            Academic pathways, professional collaborations, and platforms built.
          </p>
        </div>

        {/* Timeline Items Wrapper */}
        <div ref={containerRef} className="relative mt-12">
          
          {/* Vertical axis line */}
          <div className="absolute left-5 md:left-1/2 top-2 bottom-2 w-[2px] bg-white/5 -translate-x-1/2" />
          
          {/* Glowing scrolling progress line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-5 md:left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-indigo-500 origin-top -translate-x-1/2 shadow-[0_0_8px_#06b6d4]"
          />

          <div className="space-y-4">
            {experience.map((item, idx) => (
              <TimelineItem key={idx} item={item} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
