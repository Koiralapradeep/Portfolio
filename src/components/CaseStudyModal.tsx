"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCircle, Lock, Cpu, Database, Award } from "lucide-react";
import { ProjectCaseStudy } from "@/data/portfolio";

// Custom inline SVG icons to prevent lucide-react brand deprecation errors
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: ProjectCaseStudy | null;
}

export default function CaseStudyModal({ isOpen, onClose, caseStudy }: CaseStudyModalProps) {
  // Prevent native body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
        >
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.55, bounce: 0.2 }}
            className="relative w-full max-w-3xl bg-[#060415]/95 dark:bg-[#04020f]/98 border border-white/[0.08] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden z-10 backdrop-blur-2xl flex flex-col max-h-[85vh] glow-card"
          >
            {/* Header banner glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-500" />
            
            {/* Ambient decorative background glows inside modal */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-white/[0.06] flex justify-between items-start relative z-10">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] block mb-1">
                  {caseStudy.kicker}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight leading-tight">
                  {caseStudy.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] transition-all cursor-pointer"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div 
              data-lenis-prevent
              className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6 relative z-10 no-scrollbar"
            >
              {/* Project Description Panel */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Specification Brief</span>
                </div>
                <p className="text-slate-350 leading-relaxed text-sm md:text-base font-medium">
                  {caseStudy.desc}
                </p>
              </div>

              {/* Technical Highlights Panel */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-4">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>Engineering Accomplishments</span>
                </div>
                <ul className="space-y-3">
                  {caseStudy.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 group">
                      <div className="p-1 rounded bg-cyan-950/40 border border-cyan-500/20 shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <span className="text-slate-300 leading-relaxed text-xs md:text-sm font-medium">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied Panel */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-3">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  <span>Architecture & Tooling</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {caseStudy.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-900 border border-white/[0.04] text-slate-300 text-[10px] md:text-xs rounded-lg font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-6 md:p-8 bg-[#04020f]/80 border-t border-white/[0.06] flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center relative z-10">
              {caseStudy.codePrivateReason ? (
                <div className="flex items-center gap-2.5 text-left text-slate-400 sm:max-w-[55%]">
                  <Lock className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" />
                  <span className="text-[11px] font-mono font-medium leading-tight">
                    {caseStudy.codePrivateReason}
                  </span>
                </div>
              ) : (
                <div className="hidden sm:block flex-1" />
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                {caseStudy.live && caseStudy.live !== "#" && (
                  <a
                    href={caseStudy.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-xs md:text-sm rounded-xl font-bold shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Live Demo
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {caseStudy.code && (
                  <a
                    href={caseStudy.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-slate-200 text-xs md:text-sm rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
