"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";

// Dynamic import of 3D Canvas component to optimize page load speeds
const ThreeCanvas = dynamic(() => import("./ThreeCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#030014]/30" />,
});

export default function Hero() {
  const { name, title, subTitle } = portfolioData.personal;

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 85,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground py-20"
    >
      {/* 3D Interactive Particle Backdrop */}
      <ThreeCanvas />

      {/* Soft background grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Glowing Accents */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Main Hero Container */}
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center justify-center h-full pt-16">
        
        {/* Animated tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg border border-card-border backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-widest font-mono">
            Open to projects
          </span>
        </motion.div>

        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6"
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
          className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-8 font-mono"
        >
          {title}
        </motion.h2>

        {/* Dynamic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10"
        >
          {subTitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full sm:w-auto"
        >
          {/* View Projects - Main CTA */}
          <Magnetic range={30}>
            <button
              onClick={() => scrollToSection("projects")}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 rounded-xl font-semibold shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
            >
              View Projects
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnetic>

          {/* Contact Me CTA */}
          <Magnetic range={30}>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
            >
              Contact Me
            </button>
          </Magnetic>

          <Magnetic range={30}>
            <a
              href="/Pradeep_Koirala_Resume_Updated2026.pdf"
              download="Pradeep_Koirala_Resume.pdf"
              className="px-6 py-4 bg-card-bg border border-card-border hover:bg-card-bg/80 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer rounded-xl"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              Download CV
            </a>
          </Magnetic>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          onClick={() => scrollToSection("about")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 z-10 pointer-events-auto"
        >
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest font-mono">
            Scroll Down
          </span>
          <div className="w-6 h-10 border border-slate-500 rounded-full flex justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
