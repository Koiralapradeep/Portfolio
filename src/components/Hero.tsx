"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";

// Premium grayscaled, pixelated circular portrait of the developer
function Portrait() {
  const [processedSrc, setProcessedSrc] = useState<string>("/pradeep.jpg");

  useEffect(() => {
    const img = new Image();
    img.src = "/pradeep.jpg";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Downsample photo to create a grid of solid square tiles (cubes)
      const pixelSize = 6;
      canvas.width = Math.floor(img.width / pixelSize);
      canvas.height = Math.floor(img.height / pixelSize);
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Key out near-white background pixels and convert remaining blocks to high-contrast grayscale
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 210 && g > 210 && b > 210) {
          data[i + 3] = 0; // Make background transparent
        } else {
          // Grayscale conversion
          let gray = 0.3 * r + 0.59 * g + 0.11 * b;
          // Boost contrast for retro digital aesthetics
          gray = (gray - 128) * 1.8 + 128;
          gray = Math.max(0, Math.min(255, gray));
          
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
          // Highlights get slightly lower opacity to blend with background grids
          data[i + 3] = gray > 180 ? 150 : 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Scale up the downsampled canvas with imageSmoothingEnabled = false (preserves blocky edges)
      const scaleCanvas = document.createElement("canvas");
      scaleCanvas.width = img.width;
      scaleCanvas.height = img.height;
      const sCtx = scaleCanvas.getContext("2d");
      if (sCtx) {
        sCtx.imageSmoothingEnabled = false;
        (sCtx as any).mozImageSmoothingEnabled = false;
        (sCtx as any).webkitImageSmoothingEnabled = false;
        (sCtx as any).msImageSmoothingEnabled = false;
        sCtx.drawImage(canvas, 0, 0, scaleCanvas.width, scaleCanvas.height);
        setProcessedSrc(scaleCanvas.toDataURL());
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-end pr-0 lg:pr-12 pointer-events-none select-none">
      {/* Pixelated blocky portrait inside a feathered circular mask silhouette */}
      <img
        src={processedSrc}
        alt="Pradeep Koirala"
        className="h-[75%] lg:h-[90%] w-auto object-contain filter grayscale contrast-[1.7] brightness-[0.75] opacity-75 mix-blend-screen"
        style={{
          maskImage: "radial-gradient(circle at center, black 25%, transparent 68%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 25%, transparent 68%)",
          imageRendering: "pixelated",
        }}
      />
      {/* Heavy halftone shading pattern overlay only on the photo - static for eye comfort */}
      <div className="absolute inset-0 halftone-pattern-dark opacity-[0.96] mix-blend-multiply pointer-events-none" />
    </div>
  );
}

export default function Hero() {
  const { name, title } = portfolioData.personal;
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      }
    }
  };

  const maskRevealVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const textRevealVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  // Split heading into letters for interactive popup hover
  const renderInteractiveLetters = (text: string, customClass = "") => {
    return text.split("").map((char, idx) => {
      if (char === " ") return <span key={idx}>&nbsp;</span>;
      return (
        <motion.span
          key={idx}
          className={`inline-block cursor-default select-none transition-colors duration-150 ${customClass}`}
          whileHover={{
            scale: 1.15,
            y: -8,
            color: "#ffffff",
          }}
          transition={{ type: "spring", stiffness: 450, damping: 10 }}
        >
          {char}
        </motion.span>
      );
    });
  };

  // Split text into words for interactive popup hover
  const renderInteractiveWords = (text: string, customClass = "") => {
    return text.split(" ").map((word, idx) => (
      <motion.span
        key={idx}
        className={`inline-block cursor-default transition-all duration-150 ${customClass}`}
        whileHover={{
          scale: 1.06,
          y: -2,
          color: "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 15 }}
      >
        {word}&nbsp;
      </motion.span>
    ));
  };

  return (
    <section
      id="home"
      onMouseEnter={() => setIsHeroHovered(true)}
      onMouseLeave={() => setIsHeroHovered(false)}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0a0a0c] text-foreground pt-32 pb-10"
    >
      {/* Full-background halftone light square grid overlay - static for eye comfort */}
      <div className="absolute inset-0 halftone-pattern-light opacity-30 pointer-events-none z-0" />

      {/* Wholesome Absolute Portrait with circular feathered silhouette mask */}
      <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[60%] h-full z-0 select-none pointer-events-none overflow-hidden">
        <Portrait />
      </div>

      {/* Main Content Grid */}
      <div className="relative max-w-6xl mx-auto px-6 z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
        
        {/* Left Column: Copy & Actions */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 text-left flex flex-col items-start justify-center relative z-10"
        >
          {/* Top-left Stacked Subtitles (Mask Reveal) */}
          <div className="space-y-1.5 mb-6 overflow-hidden">
            <div className="overflow-hidden">
              <motion.span 
                variants={maskRevealVariants}
                className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#c3fffc] font-mono block uppercase"
              >
                {renderInteractiveWords(title)}
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                variants={maskRevealVariants}
                className="text-[10px] sm:text-xs font-semibold tracking-wider text-slate-500 block uppercase"
              >
                {renderInteractiveWords("SCALABLE BACKENDS • REFINED USER EXPERIENCES • CUSTOM AUTOMATIONS")}
              </motion.span>
            </div>
          </div>

          {/* Massive Name Typography (Awwwards Mask Reveal style with letter hover popup) */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-[100px] font-black leading-none tracking-tighter text-left uppercase select-none mb-6">
            <div className="overflow-hidden py-1">
              <motion.span 
                variants={maskRevealVariants} 
                className="block text-slate-100 font-light tracking-wide"
              >
                {renderInteractiveLetters("PRADEEP")}
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.span 
                variants={maskRevealVariants} 
                className="block text-[#c3fffc] font-black"
              >
                {renderInteractiveLetters("KOIRALA.")}
              </motion.span>
            </div>
          </h1>

          {/* CTA Buttons */}
          <motion.div
            variants={textRevealVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-6"
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
                <FileText className="w-4.5 h-4.5 text-[#c3fffc]" />
                CV
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Far Right: Vertical achievements/developer badge */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 select-none z-10"
      >
        <div className="h-20 w-[1px] bg-white/10" />
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-500 vertical-text py-2">
          {renderInteractiveLetters("KOIRALA'S PORTFOLIO")}
        </span>
        <div className="h-20 w-[1px] bg-white/10" />
      </motion.div>

      {/* Bottom info bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full mt-auto">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider"
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>{renderInteractiveWords("■ BSc (Hons) Computer Science")}</span>
            <span>{renderInteractiveWords("■ Based in Kathmandu, Nepal")}</span>
            <span>{renderInteractiveWords("■ Open to Global Projects")}</span>
          </div>
          <span 
            onClick={() => scrollToSection("about")}
            className="tracking-widest text-[#c3fffc] font-bold cursor-pointer hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            {renderInteractiveLetters("▼")} {renderInteractiveLetters("SCROLL")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
