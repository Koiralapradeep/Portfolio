"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Globe, Settings, Brain, Check } from "lucide-react";

const getServiceIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "globe":
      return <Globe className="w-6 h-6 text-cyan-400" />;
    case "settings":
      return <Settings className="w-6 h-6 text-purple-400" />;
    case "brain":
      return <Brain className="w-6 h-6 text-pink-400" />;
    default:
      return <Globe className="w-6 h-6 text-cyan-400" />;
  }
};

export default function Services() {
  const { services } = portfolioData;

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-background text-foreground">
      {/* Soft overlay gradient mesh */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

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
            Services Offered
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"
          />
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-6 text-sm sm:text-base">
            Collaborating with clients and teams to bring products from idea to production-grade deployment.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-card-bg border border-card-border hover:border-purple-500/20 backdrop-blur-md transition-all shadow-xl hover:-translate-y-1 duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon */}
                <div className="p-3.5 rounded-xl bg-card-bg/60 border border-card-border/80 shadow-sm w-fit mb-6">
                  {getServiceIcon(service.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Service Logs Checkmarks */}
              <ul className="space-y-3 pt-4 border-t border-card-border mt-auto">
                {service.details.map((detail, detIdx) => (
                  <li key={detIdx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
