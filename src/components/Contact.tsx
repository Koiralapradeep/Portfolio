"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import Magnetic from "./Magnetic";

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

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const { email, github, linkedin } = portfolioData.personal;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/pradeepkoirala07@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`
        })
      });

      if (response.ok) {
        // Trigger confetti
        import("canvas-confetti").then((module) => {
          const confetti = module.default;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#22d3ee", "#a855f7", "#6366f1"],
          });
        }).catch(() => {});

        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    } catch (error) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background text-foreground">
      {/* Background glow overlay */}
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

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
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"
          />
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-6 text-sm sm:text-base">
            Have a project concept or freelance opportunity? Connect directly.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Social Cards Columns (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Let&apos;s Connect
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              I am open to freelance proposals, full-stack developer roles, and ML pipelines building projects.
            </p>

            {/* Email link card */}
            <a
              href={`mailto:${email}`}
              className="group p-5 rounded-xl bg-card-bg border border-card-border backdrop-blur-sm flex items-center gap-4 hover:border-cyan-500/30 transition-all hover:bg-card-bg/80"
            >
              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/30">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">Email</h4>
                <p className="text-sm sm:text-base text-foreground group-hover:text-cyan-400 transition-colors mt-0.5">{email}</p>
              </div>
            </a>

            {/* LinkedIn link card */}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-card-bg border border-card-border backdrop-blur-sm flex items-center gap-4 hover:border-purple-500/30 transition-all hover:bg-card-bg/80"
            >
              <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-800/30">
                <LinkedinIcon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">LinkedIn</h4>
                <p className="text-sm sm:text-base text-foreground group-hover:text-purple-400 transition-colors mt-0.5">pradeep-koirala</p>
              </div>
            </a>

            {/* GitHub link card */}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-card-bg border border-card-border backdrop-blur-sm flex items-center gap-4 hover:border-indigo-500/30 transition-all hover:bg-card-bg/80"
            >
              <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/30">
                <GithubIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">GitHub</h4>
                <p className="text-sm sm:text-base text-foreground group-hover:text-indigo-400 transition-colors mt-0.5">Koiralapradeep</p>
              </div>
            </a>
          </motion.div>

          {/* Form Card Column (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 p-8 rounded-2xl bg-card-bg border border-card-border backdrop-blur-md shadow-xl"
          >
            {formStatus === "success" ? (
              // Success Animation Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="p-4 rounded-full bg-cyan-950/30 border border-cyan-500/30 animate-bounce">
                  <CheckCircle className="w-16 h-16 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Message Transmitted!</h3>
                  <p className="text-slate-400 max-w-sm mt-3 text-sm leading-relaxed">
                    Thank you for reaching out! I will review your message and get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="px-6 py-2.5 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] rounded-xl text-sm font-medium transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              // Standard Form Screen
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 rounded-xl bg-card-bg border focus:bg-card-bg/60 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
                      errors.name ? "border-red-500/50" : "border-card-border"
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 rounded-xl bg-card-bg border focus:bg-card-bg/60 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
                      errors.email ? "border-red-500/50" : "border-card-border"
                    }`}
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 rounded-xl bg-card-bg border focus:bg-card-bg/60 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none ${
                      errors.message ? "border-red-500/50" : "border-card-border"
                    }`}
                    placeholder="How can I help you?"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Send Button */}
                <Magnetic range={25}>
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className={`px-8 py-4 bg-gradient-to-r disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer ${
                      formStatus === "error"
                        ? "from-red-600 to-rose-600"
                        : "from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400"
                    }`}
                  >
                    {formStatus === "sending"
                      ? "Transmitting..."
                      : formStatus === "error"
                      ? "Transmission Failed"
                      : "Send Message"}
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </Magnetic>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
