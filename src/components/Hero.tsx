"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";

// Dynamic import of 3D Canvas component to optimize page load speeds
const ThreeCanvas = dynamic(() => import("./ThreeCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#030014]/30" />,
});

// Premium interactive Mock IDE / Terminal Window representing real development
function MockIDE() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#090620]/65 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-[11px] sm:text-xs text-slate-300 glow-card"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0c0926]/80 border-b border-white/[0.06] select-none">
        <div className="flex items-center gap-1.5">
          {/* Mac-like Window controls */}
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-[10px] text-slate-500 tracking-wide font-medium">pradeep.ts</span>
        <div className="w-10" />
      </div>

      {/* Editor Content */}
      <div className="p-5 space-y-2 overflow-x-auto select-none leading-relaxed text-left font-mono">
        <div>
          <span className="text-pink-400">import</span> <span className="text-cyan-400">Developer</span> <span className="text-pink-400">from</span> <span className="text-emerald-400">"fullstack"</span><span className="text-slate-500">;</span>
        </div>
        <br />
        <div>
          <span className="text-pink-400">const</span> <span className="text-purple-400">profile</span> = <span className="text-slate-400">&#123;</span>
        </div>
        <div className="pl-4">
          <span className="text-slate-400">name:</span> <span className="text-emerald-400">"Pradeep Koirala"</span>,
        </div>
        <div className="pl-4">
          <span className="text-slate-400">role:</span> <span className="text-emerald-400">"Full Stack Developer"</span>,
        </div>
        <div className="pl-4">
          <span className="text-slate-400">stack:</span> <span className="text-slate-400">[</span>
          <span className="text-cyan-400">"React"</span>, <span className="text-cyan-400">"Node.js"</span>, <span className="text-cyan-400">"SQL/NoSQL"</span>
          <span className="text-slate-400">]</span>,
        </div>
        <div className="pl-4">
          <span className="text-slate-400">volunteering:</span> <span className="text-amber-400">true</span>
        </div>
        <div>
          <span className="text-slate-400">&#125;</span><span className="text-slate-500">;</span>
        </div>
        <br />
        <div>
          <span className="text-pink-400">const</span> <span className="text-purple-400">status</span> = <span className="text-emerald-400">"Ready to build scalable APIs"</span><span className="text-slate-500">;</span>
        </div>
        <br />
        <div>
          <span className="text-cyan-400">Developer</span>.<span className="text-indigo-400">initialize</span>(<span className="text-purple-400">profile</span>)<span className="text-slate-500">;</span>
        </div>
      </div>

      {/* Mini Status bar */}
      <div className="px-4 py-2 bg-[#0c0926]/60 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-500 select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          production
        </span>
        <span>TypeScript • UTF-8</span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { name, title, subTitle } = portfolioData.personal;

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground py-20 lg:py-0"
    >
      {/* 3D Interactive Particle Backdrop */}
      <ThreeCanvas />

      {/* Soft background grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Glowing Accents */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-purple-600/5 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Main Hero Container (Split Grid) */}
      <div className="relative max-w-6xl mx-auto px-6 z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[75vh] pt-24 lg:pt-16 pb-12">
        
        {/* Left Column: Copy & Actions (Col 7) */}
        <div className="lg:col-span-7 text-left flex flex-col items-start justify-center">
          
          {/* Animated tag pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
              Open to projects
            </span>
          </motion.div>

          {/* Animated Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-none"
          >
            Hi, I am{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400 drop-shadow-sm font-sans">
              {name}
            </span>
          </motion.h1>

          {/* Professional Role Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-400 mb-6 font-mono"
          >
            {title}
          </motion.h2>

          {/* Dynamic Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed mb-10"
          >
            {subTitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* View Projects - Main CTA */}
            <Magnetic range={30}>
              <button
                onClick={() => scrollToSection("projects")}
                className="group px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 rounded-xl font-semibold shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-white"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Magnetic>

            {/* Contact Me CTA */}
            <Magnetic range={30}>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-7 py-3.5 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-slate-300 hover:text-white"
              >
                Contact Me
              </button>
            </Magnetic>

            <Magnetic range={30}>
              <a
                href="/Pradeep_Koirala_Resume_Updated2026.pdf"
                download="Pradeep_Koirala_Resume.pdf"
                className="px-5 py-3.5 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] text-slate-400 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer rounded-xl"
              >
                <FileText className="w-4.5 h-4.5 text-cyan-400" />
                CV
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Column: Interactive Mock IDE Window (Col 5) */}
        <div className="lg:col-span-5 w-full flex justify-center items-center">
          <MockIDE />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 z-10 pointer-events-auto hidden md:flex"
      >
        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest font-mono">
          Scroll Down
        </span>
        <div className="w-5 h-8 border border-slate-600 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
