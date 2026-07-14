import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ThemeProvider } from "@/app/providers";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Premium font pairing: Inter for UI/Body, Manrope for Headings/Stats
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pradeep Koirala-Full Stack Developer",
  description: "Computer Science graduate specializing in scalable full-stack web applications, ML pipelines, and custom enterprise automation.",
  keywords: ["Pradeep Koirala", "Full-Stack Developer", "Software Engineer", "Kathmandu", "Nepal", "MERN stack", "React", "Next.js", "Django", "Machine Learning"],
  authors: [{ name: "Pradeep Koirala" }],
  openGraph: {
    title: "Pradeep Koirala-Full Stack Developer",
    description: "Portfolio of Pradeep Koirala. Crafting scalable architectures and refined interactive interfaces.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#030014] text-slate-200 selection:bg-cyan-500/20">
        <ThemeProvider>
          {/* Subtle noise paper texture overlay */}
          <div className="noise-overlay" />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
