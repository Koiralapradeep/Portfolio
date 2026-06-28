"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers";
import Magnetic from "./Magnetic";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for shadow and active sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Find active section
      const sections = navItems.map((item) =>
        document.getElementById(item.href.replace("#", ""))
      );

      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].href.replace("#", ""));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(href.replace("#", ""));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 85,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-background/70 backdrop-blur-md shadow-lg border-b border-card-border"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="group flex items-center gap-0.5 text-2xl font-black tracking-tight"
          >
            <span className="text-white group-hover:text-cyan-400 transition-colors duration-300">P</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-500">K</span>
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5 shadow-[0_0_8px_#22d3ee]"
            />
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="relative text-sm font-medium transition-colors duration-200"
                  >
                    <span
                      className={`${
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Dark Mode Toggle Button */}
            <div className="h-6 w-[1px] bg-card-border" />
            <Magnetic range={30}>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-card-bg border border-card-border text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all shadow-sm"
                aria-label="Toggle Dark/Light Mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </Magnetic>
          </div>

          {/* Mobile Navigation Trigger Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-card-bg border border-card-border text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all"
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-full bg-card-bg border border-card-border transition-colors"
              aria-label="Open Mobile Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm z-50 bg-background/95 border-l border-card-border p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="space-y-8 mt-12">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-mono">
                    MENU
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-full bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-6">
                  {navItems.map((item, idx) => {
                    const isActive = activeSection === item.href.replace("#", "");
                    return (
                      <motion.a
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={item.label}
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={`text-lg font-medium transition-colors ${
                          isActive
                            ? "text-cyan-400 font-bold"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                        }`}
                      >
                        {item.label}
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="text-xs text-slate-500 text-center font-mono">
                © {new Date().getFullYear()} Pradeep Koirala
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
