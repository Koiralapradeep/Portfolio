"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolio";
import { Activity, FileText, Users, Brain, MessageSquare, Scale, ArrowUpRight, Calculator, Lock, Gamepad2 } from "lucide-react";
import CaseStudyModal from "./CaseStudyModal";

// Map project ID to appropriate Lucide icon
const getProjectIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "activity":
      return <Activity className="w-5 h-5 text-cyan-400" />;
    case "filetext":
      return <FileText className="w-5 h-5 text-purple-400" />;
    case "users":
      return <Users className="w-5 h-5 text-indigo-400" />;
    case "brain":
      return <Brain className="w-5 h-5 text-pink-400" />;
    case "messagesquare":
      return <MessageSquare className="w-5 h-5 text-emerald-400" />;
    case "scale":
      return <Scale className="w-5 h-5 text-amber-400" />;
    case "calculator":
      return <Calculator className="w-5 h-5 text-teal-400" />;
    case "gamepad":
      return <Gamepad2 className="w-5 h-5 text-rose-400" />;
    default:
      return <FileText className="w-5 h-5 text-cyan-400" />;
  }
};

// Premium Project Card featuring 3D Mouse Tilt, spotlight tracking, and custom visuals
function ProjectCard({
  project,
  onOpenModal,
  isActive,
}: {
  project: Project;
  onOpenModal: (p: Project) => void;
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });

    // Displacement for 3D tilt
    const mouseX = x - width / 2;
    const mouseY = y - height / 2;
    setRotateX(-(mouseY / (height / 2)) * 3);
    setRotateY((mouseX / (width / 2)) * 3);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Custom visual console miniatures
  const renderVisualMiniature = (id: string) => {
    switch (id) {
      case "troyer":
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between border-b border-white/[0.06] pb-1.5 text-[8px] uppercase tracking-wider font-semibold text-slate-400">
              <span>Site Tool Requisitions</span>
              <span className="text-cyan-400">Audited</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-12 truncate text-slate-400">Site A</span>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/[0.02]">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: "85%" }} />
              </div>
              <span className="text-slate-400 text-[8px] w-6 text-right">85%</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-12 truncate text-slate-400">Site B</span>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/[0.02]">
                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: "40%" }} />
              </div>
              <span className="text-slate-400 text-[8px] w-6 text-right">40%</span>
            </div>
          </div>
        );
      
      case "youthcouncil":
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-indigo-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>Youth Council DB</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex justify-between">
              <span>Council API:</span>
              <span className="text-slate-300">Connected (200 OK)</span>
            </div>
            <div className="flex justify-between">
              <span>Active Initiatives:</span>
              <span className="text-cyan-400 font-bold">12 Registered</span>
            </div>
            <div className="flex justify-between">
              <span>Access Mode:</span>
              <span className="text-amber-500">Public Portal</span>
            </div>
          </div>
        );

      case "ludo":
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-rose-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>Puttu Ludo Quadrant</span>
              <span className="text-amber-500">PWA Active</span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div className="grid grid-cols-2 gap-0.5 p-1 bg-amber-500/10 border border-amber-500/20 rounded w-12 h-12 flex-shrink-0 items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow" />
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow" />
              </div>
              <div className="p-2 border border-amber-500/30 rounded bg-slate-900 text-center font-bold text-amber-500 shadow-lg text-[14px]">
                ⚅ 6
              </div>
            </div>
          </div>
        );

      case "jurist":
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-amber-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>Jurist Console</span>
              <span>SECURE</span>
            </div>
            <div className="flex justify-between">
              <span>Calendar Booking:</span>
              <span className="text-slate-300">v1.2 Active</span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1">
              <div className="p-1 rounded bg-slate-900 text-center text-slate-400 border border-white/[0.02]">
                <div>Mon</div>
                <div className="text-[7px] text-cyan-400">Booked</div>
              </div>
              <div className="p-1 rounded bg-slate-900 text-center text-slate-400 border border-white/[0.02]">
                <div>Tue</div>
                <div className="text-[7px] text-emerald-400">Open</div>
              </div>
              <div className="p-1 rounded bg-slate-900 text-center text-slate-400 border border-white/[0.02]">
                <div>Wed</div>
                <div className="text-[7px] text-cyan-400">Booked</div>
              </div>
            </div>
          </div>
        );

      case "skinai":
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-pink-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>Cancer Detection AI</span>
              <span className="text-rose-400 animate-pulse">Scanning</span>
            </div>
            <div className="relative h-12 w-full bg-slate-900 rounded border border-white/[0.03] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-500/5 grid-mesh opacity-40" />
              <div className="w-8 h-8 rounded-full border border-pink-500/40 relative flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-pink-500/20" />
                <div className="absolute inset-x-0 h-[1px] bg-cyan-400 animate-bounce" />
              </div>
              <div className="absolute bottom-1 right-2 text-[7px] text-cyan-400">ROI Detected</div>
            </div>
            <div className="flex justify-between text-[8px]">
              <span>Malignant Prob:</span>
              <span className="text-rose-400 font-bold">98.42%</span>
            </div>
          </div>
        );

      case "resume":
        return (
          <div className="p-4 bg-slate-955/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-cyan-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>Resume Compiler</span>
              <span className="text-emerald-400">PDF Ready</span>
            </div>
            <div className="flex gap-2">
              <div className="w-1/2 p-1.5 rounded bg-slate-900 border border-white/[0.02] space-y-1">
                <div className="h-1 w-full bg-slate-800 rounded" />
                <div className="h-1 w-4/5 bg-slate-800 rounded" />
                <div className="h-1 w-2/3 bg-slate-800 rounded" />
              </div>
              <div className="w-1/2 p-1.5 rounded bg-slate-900 border border-cyan-500/20 space-y-1 relative shadow-lg">
                <div className="w-3 h-3 rounded-full bg-slate-700 mx-auto" />
                <div className="h-1 w-3/4 bg-slate-800 rounded mx-auto" />
                <div className="h-0.5 w-1/2 bg-cyan-500/30 rounded mx-auto" />
                <div className="h-0.5 w-4/5 bg-slate-800 rounded mx-auto" />
              </div>
            </div>
          </div>
        );

      case "emrs":
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-indigo-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>EMRS ShiftSwap</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                Connected
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[7px] p-1 bg-slate-900/60 rounded border border-white/[0.02]">
                <span className="text-slate-400">Swap Request #104</span>
                <span className="px-1 py-0.2 bg-purple-500/20 text-purple-300 rounded font-semibold">Pending Mgr</span>
              </div>
              <div className="flex justify-between items-center text-[7px] p-1 bg-slate-900/60 rounded border border-white/[0.02]">
                <span className="text-slate-400">Availability Check</span>
                <span className="text-emerald-400">OK</span>
              </div>
            </div>
          </div>
        );

      case "sentiment":
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-purple-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>NLP Sentiment Parser</span>
              <span className="text-indigo-400">NLTK</span>
            </div>
            <div className="p-1.5 bg-slate-900 rounded border border-white/[0.02] text-[7.5px] text-slate-300 truncate">
              "This software is fast, robust, and beautiful!"
            </div>
            <div className="flex justify-between items-center pt-0.5 text-[7px]">
              <span className="text-emerald-400">Pos: 87%</span>
              <span className="text-rose-500">Neg: 13%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/[0.02] flex">
              <div className="h-full bg-emerald-500" style={{ width: "87%" }} />
              <div className="h-full bg-rose-500" style={{ width: "13%" }} />
            </div>
          </div>
        );

      case "aethercalc":
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-teal-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>Aether Calc Screen</span>
              <span className="text-slate-400">Audio Synth</span>
            </div>
            <div className="p-1.5 bg-[#090720]/80 rounded border border-white/[0.04] text-right font-semibold text-slate-200">
              <div className="text-[6.5px] text-slate-500">sin(45) * log(100) =</div>
              <div className="text-[10px] text-cyan-400">1.41421356</div>
            </div>
            <div className="flex justify-between items-center text-[7px] text-slate-500">
              <span>Waveform:</span>
              <div className="flex gap-0.5 items-end h-2.5">
                <div className="w-0.5 bg-cyan-400 h-1.5" />
                <div className="w-0.5 bg-cyan-400 h-2.5" />
                <div className="w-0.5 bg-cyan-400 h-1" />
                <div className="w-0.5 bg-cyan-400 h-2" />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.04] space-y-2 pointer-events-none select-none font-mono text-[9px] text-slate-500 shadow-inner">
            <div className="flex justify-between text-purple-400 border-b border-white/[0.06] pb-1.5 font-semibold uppercase tracking-wider text-[8px]">
              <span>System Node</span>
              <span>Active</span>
            </div>
            <div className="flex justify-between">
              <span>Service Status:</span>
              <span className="text-slate-300">Healthy</span>
            </div>
            <div className="flex justify-between">
              <span>Core Module:</span>
              <span className="text-emerald-400">Operational</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`group relative p-8 sm:p-10 rounded-3xl bg-[#090720]/95 border transition-all duration-300 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col justify-between select-none ${
        isActive 
          ? "border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20" 
          : "border-white/[0.08] hover:border-cyan-500/25"
      }`}
      onClick={() => onOpenModal(project)}
    >
      {/* Premium cursor spotlight tracking element */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(220px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(6, 182, 212, 0.08), rgba(168, 85, 247, 0.03), transparent 80%)`,
          }}
        />
      )}

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-stretch">
        
        {/* Left Side Content Column */}
        <div className="flex-1 flex flex-col justify-between gap-4" style={{ transform: "translateZ(35px)" }}>
          <div>
            {/* Icon & Title Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[#030014]/60 border border-white/[0.06] shadow-md shrink-0">
                {getProjectIcon(project.icon)}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-semibold block mt-0.5">
                  {project.id === "troyer" || project.id === "skinai" ? "Flagship System" : "Featured Case Study"}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-white/[0.04] text-slate-400">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side Visual & CTAs Column */}
        <div 
          className="md:w-[280px] shrink-0 flex flex-col justify-between gap-6 border-t md:border-t-0 md:border-l border-white/[0.06] pt-6 md:pt-0 md:pl-8" 
          style={{ transform: "translateZ(25px)" }}
        >
          {/* Custom designed visual console widget */}
          {renderVisualMiniature(project.id)}

          {/* CTAs Bar */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs sm:text-sm font-semibold text-cyan-400 group-hover:underline flex items-center gap-1.5">
              View Case Study
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>

            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              {project.code ? (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 border border-white/[0.04] transition-colors"
                  title="View Source Code"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              ) : (
                project.codePrivateReason && (
                  <span
                    className="p-1.5 text-slate-550 cursor-help"
                    title={project.codePrivateReason}
                  >
                    <Lock className="w-4 h-4 text-amber-500" />
                  </span>
                )
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Alternating project row wrapping layout
function ProjectRow({
  project,
  idx,
  activeIdx,
  setActiveIdx,
  onOpenModal,
}: {
  project: Project;
  idx: number;
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
  onOpenModal: (p: Project) => void;
}) {
  const isLeft = idx % 2 === 0;
  const isActive = activeIdx === idx;

  return (
    <motion.div
      onViewportEnter={() => setActiveIdx(idx)}
      viewport={{ amount: 0.35 }}
      className="relative w-full flex flex-col lg:flex-row items-center justify-between min-h-[40vh] sm:min-h-[50vh] py-12"
    >
      {/* Left Column */}
      <div className={`w-full lg:w-[45%] z-10 flex ${isLeft ? "justify-end" : "hidden lg:flex"}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <ProjectCard project={project} onOpenModal={onOpenModal} isActive={isActive} />
          </motion.div>
        )}
      </div>

      {/* Center Timeline Node Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 hidden lg:flex items-center justify-center z-15">
        <div className={`w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-800 transition-all duration-505 relative flex items-center justify-center ${isActive ? "border-cyan-400 scale-125" : ""}`}>
          {isActive && (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              <div className="absolute -inset-1.5 rounded-full border border-cyan-400/30 animate-pulse" />
            </>
          )}
        </div>
      </div>

      {/* Horizontal Connector Line */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-slate-900/60 hidden lg:block ${
          isLeft ? "left-[45%] right-1/2" : "left-1/2 right-[45%]"
        }`}
      >
        {/* Glowing laser path that fills when active */}
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            originX: isLeft ? 1 : 0, // Fill from center out towards the card
          }}
        />
      </div>

      {/* Right Column */}
      <div className={`w-full lg:w-[45%] z-10 flex ${!isLeft ? "justify-start" : "hidden lg:flex"}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <ProjectCard project={project} onOpenModal={onOpenModal} isActive={isActive} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

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

export default function Projects() {
  const { projects } = portfolioData;
  const numProjects = projects.length;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track scroll coordinates over the whole showcase container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate coordinates for the laser traveling pulse
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative bg-background text-foreground py-20 border-t border-white/[0.02] overflow-hidden"
    >
      {/* Mobile-only Sticky Progress Bar */}
      <div className="sticky top-[72px] z-30 w-full bg-[#030014]/90 backdrop-blur-md border-y border-white/[0.05] py-3 px-6 flex justify-between items-center lg:hidden">
        <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400">
          0{activeIdx + 1} / 0{numProjects}
        </span>
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 font-bold truncate max-w-[180px]">
          {projects[activeIdx]?.title}
        </span>
        <div className="w-20 h-1 bg-slate-900 rounded-full overflow-hidden border border-white/[0.04]">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-305"
            style={{ width: `${((activeIdx + 1) / numProjects) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/5 blur-[140px] rounded-full pointer-events-none z-0" />
        
        {/* Section Header */}
        <div className="text-center mb-20 relative z-10">
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase block mb-2 animate-pulse">
            Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Featured Projects
          </h2>
          <div className="h-[3px] w-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-4 mx-auto" />
          <p className="text-slate-400 max-w-xl text-sm sm:text-base font-medium mx-auto">
            A selective exhibition of full-stack systems, automated pipelines, deep learning computer vision, and bespoke utility tools.
          </p>
        </div>

        {/* Alternating Grid Track Container */}
        <div className="relative py-10 w-full flex flex-col gap-8 sm:gap-16 z-10">
          
          {/* Vertical center track line */}
          <div className="absolute left-1/2 top-[5%] bottom-[5%] w-[2px] bg-slate-900/60 -translate-x-1/2 hidden lg:block">
            {/* Filled progress path */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-indigo-500 rounded-full origin-top"
              style={{ scaleY: scrollYProgress, height: "100%" }}
            />
            {/* Traveling light beam / orb */}
            <motion.div
              className="absolute left-1/2 w-4 h-12 bg-gradient-to-b from-cyan-400 to-purple-500 -translate-x-1/2 rounded-full blur-[4px] shadow-[0_0_15px_#22d3ee] z-20"
              style={{ top: orbY }}
            />
          </div>

          {projects.map((project, idx) => (
            <ProjectRow
              key={project.id}
              project={project}
              idx={idx}
              activeIdx={activeIdx}
              setActiveIdx={setActiveIdx}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </div>

      {/* Case Study Detailed Modal */}
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        caseStudy={selectedProject ? selectedProject.caseStudy : null}
      />
    </section>
  );
}
