"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground">
      {/* Background grid mesh wrapper */}
      <div className="absolute inset-0 grid-mesh pointer-events-none z-0" />

      {/* Global Interactive Cursor Spotlight Follower */}
      {mounted && (
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-50 hidden sm:block"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.06), rgba(6, 182, 212, 0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Navigation Bar */}
      <Navbar />

      {/* Sections */}
      <main className="flex-1 w-full relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
