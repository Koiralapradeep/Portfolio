"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, CheckCircle } from "lucide-react";
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
  // Prevent background scrolling when modal is open
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-3xl bg-slate-900/90 dark:bg-slate-950/95 border border-white/10 dark:border-white/5 rounded-2xl shadow-2xl overflow-hidden z-10 backdrop-blur-xl flex flex-col max-h-[85vh]"
          >
            {/* Header banner glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500" />

            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">
                  {caseStudy.kicker}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  {caseStudy.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
              {/* Project Description */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Overview
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {caseStudy.desc}
                </p>
              </div>

              {/* Technical Highlights */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
                  Engineering Highlights & Contributions
                </h4>
                <ul className="space-y-3">
                  {caseStudy.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 leading-relaxed text-sm md:text-base">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied */}
              <div>
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Stack & Tooling Applied
                </h4>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-slate-200 text-xs md:text-sm rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-6 md:p-8 bg-slate-950/80 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center">
              {caseStudy.live && caseStudy.live !== "#" && (
                <a
                  href={caseStudy.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-medium shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group"
                >
                  Live Demo
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {caseStudy.code && (
                <a
                  href={caseStudy.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
