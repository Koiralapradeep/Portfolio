"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolio";
import { Activity, FileText, Users, Brain, MessageSquare, Scale, ArrowUpRight } from "lucide-react";
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
    default:
      return <FileText className="w-5 h-5 text-cyan-400" />;
  }
};

// Premium Project Card featuring 3D Mouse Tilt and dynamic cursor spotlight
function ProjectCard({ project, onOpenModal }: { project: Project; onOpenModal: (p: Project) => void }) {
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

    // Displacement for 3D tilt (max 6deg)
    const mouseX = x - width / 2;
    const mouseY = y - height / 2;
    setRotateX(-(mouseY / (height / 2)) * 6);
    setRotateY((mouseX / (width / 2)) * 6);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Flagships get custom, hand-crafted visual UI miniatures inside the cards
  const renderVisualMiniature = (id: string) => {
    if (id === "troyer") {
      return (
        <div className="mt-6 p-4 bg-card-bg/60 rounded-xl border border-card-border flex flex-col gap-2.5 pointer-events-none select-none font-mono text-[10px] text-slate-500 shadow-inner">
          <div className="flex justify-between border-b border-card-border pb-1.5 text-[9px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
            <span>Site Tool Requisitions</span>
            <span className="text-cyan-400">Audited</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="w-16 truncate text-slate-600 dark:text-slate-300">Site A (Drills)</span>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-card-border">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: "85%" }} />
            </div>
            <span className="text-slate-500 dark:text-slate-400 text-[9px] w-6 text-right">85%</span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="w-16 truncate text-slate-600 dark:text-slate-300">Site B (Mixers)</span>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-card-border">
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: "40%" }} />
            </div>
            <span className="text-slate-500 dark:text-slate-400 text-[9px] w-6 text-right">40%</span>
          </div>
        </div>
      );
    }
    
    if (id === "skinai") {
      return (
        <div className="mt-6 p-4 bg-slate-950/70 rounded-xl border border-white/[0.04] space-y-3 pointer-events-none select-none font-mono text-[10px] shadow-inner">
          <div className="flex justify-between items-center text-slate-400 border-b border-white/[0.06] pb-1.5 text-[9px] uppercase tracking-wider font-semibold">
            <span>Classification Node</span>
            <span className="text-purple-400">Loss: 0.12</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-300">Malignant Case:</span>
            <div className="h-2.5 w-full max-w-[120px] bg-slate-900 rounded-full overflow-hidden relative border border-white/[0.02]">
              <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-500 rounded-full" style={{ width: "88%" }} />
            </div>
            <span className="text-cyan-400 font-bold">88% Conf</span>
          </div>
        </div>
      );
    }

    return null;
  };

  // Asymmetric styling based on Bento Grid positioning
  const isFlagship = project.id === "troyer" || project.id === "skinai";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`group relative p-6 sm:p-8 rounded-2xl bg-card-bg border border-card-border hover:border-cyan-500/20 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl flex flex-col justify-between select-none min-h-[340px] ${
        isFlagship ? "md:col-span-2" : "md:col-span-1"
      }`}
      onClick={() => onOpenModal(project)}
    >
      {/* Premium cursor spotlight tracking element */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(180px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Card Header & Content */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-card-bg/60 border border-card-border/80 shadow-md shrink-0">
            {getProjectIcon(project.icon)}
          </div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Dynamic visual miniatures inside flagships */}
        {renderVisualMiniature(project.id)}
      </div>

      {/* Action Footer */}
      <div
        className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-white/[0.05]"
        style={{ transform: "translateZ(20px)" }}
      >
        <span className="text-xs sm:text-sm font-semibold text-cyan-400 group-hover:underline flex items-center gap-1.5">
          View Case Study
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>

        {/* Tech Stack badges & Links */}
        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <div className="hidden sm:flex flex-wrap gap-1.5 max-w-[150px] justify-end">
            {project.tech.slice(0, 2).map((t) => (
              <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-card-bg border border-card-border text-slate-500 dark:text-slate-400">
                {t}
              </span>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-card-border hidden sm:block" />
          
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-card-bg transition-colors"
              title="View Source Code"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background text-foreground">
      {/* Soft gradient meshes */}
      <div className="absolute top-1/4 left-0 w-[350px] h-[350px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"
          />
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-6 text-sm sm:text-base">
            Bespoke engineering layout highlighting flagship systems, responsive interfaces, and deep machine learning integrations.
          </p>
        </div>

        {/* Bento Grid Layout (1-column on mobile, 2-column or 3-column on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={project.id === "troyer" || project.id === "skinai" ? "lg:col-span-2" : "lg:col-span-1"}
            >
              <ProjectCard project={project} onOpenModal={handleOpenModal} />
            </motion.div>
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
