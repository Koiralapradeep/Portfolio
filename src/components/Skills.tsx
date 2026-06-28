"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Code2, Layers, Cpu, Wrench } from "lucide-react";

export default function Skills() {
  const { skills } = portfolioData;

  // Map category title to appropriate Lucide icon
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "programming":
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case "web development":
        return <Layers className="w-6 h-6 text-purple-400" />;
      case "data science & ai":
        return <Cpu className="w-6 h-6 text-indigo-400" />;
      case "tools & devops":
        return <Wrench className="w-6 h-6 text-pink-400" />;
      default:
        return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background text-foreground">
      {/* Background glow overlay */}
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

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
            Technical Stack
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-md mx-auto mt-6 text-sm sm:text-base">
            Languages, frameworks, and tools used to build production-grade solutions.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: catIdx * 0.1 }}
              className="p-8 rounded-2xl bg-card-bg border border-card-border backdrop-blur-md hover:border-cyan-500/20 transition-all shadow-xl hover:-translate-y-1 duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-card-bg/60 border border-card-border/80 shadow-inner">
                  {getIcon(category.title)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-slate-700 dark:text-slate-200">{skill.name}</span>
                      <span className="text-cyan-400 text-xs font-mono">{skill.level}%</span>
                    </div>
                    
                    {/* Visual Progress Bar Wrapper */}
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-white/[0.04] rounded-full overflow-hidden border border-slate-300 dark:border-white/[0.02]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
