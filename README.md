# Premium Professional Personal Portfolio Website

This is a high-end, custom-designed developer & designer personal portfolio website built with **React / Next.js (App Router)**, **Tailwind CSS (v4)**, **Framer Motion**, and **React Three Fiber (Three.js)**. 

It is tailored specifically for **Pradeep Koirala**, featuring modern UI/UX design trends such as glassmorphism, gradient meshes, custom cursor magnetic pulls, dynamic 3D elements, and smooth timelines.

---

## 🚀 Getting Started & Dependencies

Since the installation was delegated to avoid background process locks, please follow these steps to install the required packages and launch your development server.

### 1. Install Dependencies
Run the following commands in the root of your project directory:

```bash
# Install core packages (React Three Fiber, Framer Motion, and icons)
npm install framer-motion lucide-react three @react-three/fiber @react-three/drei canvas-confetti --legacy-peer-deps

# Install TypeScript types as devDependencies
npm install -D @types/three @types/canvas-confetti --legacy-peer-deps

# Install base dev dependencies (if not already set up)
npm install --legacy-peer-deps
```

*Note: The `--legacy-peer-deps` flag is recommended to prevent peer warnings when linking React Three Fiber with React 19.*

### 2. Start the Development Server
Launch the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view your brand new portfolio!

### 3. Production Build
Verify the production compilation and static optimizations:

```bash
npm run build
```

---

## 🛠️ How to Customize Your Details

All details (name, roles, biography text, skill percentages, projects, timelines, services, and links) have been centralized in a single file for easy customization.

To edit your profile, open:
📁 **[`src/data/portfolio.ts`](file:///c:/Users/pradeep/Documents/VS-Projects/Myportfolio/src/data/portfolio.ts)**

### Adding / Modifying Projects
Projects are mapped as arrays under `portfolioData.projects`. Each project has a nested `caseStudy` object which controls the details displayed inside the animated pop-up modal:

```typescript
{
  id: "my-project",
  title: "Project Name",
  description: "Short cards description.",
  icon: "Globe", // Lucide icon name mapping (Globe, Users, Brain, etc.)
  tech: ["React", "Node.js"],
  live: "https://example.com",
  code: "https://github.com/...",
  caseStudy: {
    kicker: "Case Study • Web Tool",
    title: "Project Full Title",
    desc: "Long-form descriptive overview of the architecture and development goals.",
    highlights: [
      "Key contribution or engineering milestone 1",
      "Key contribution or engineering milestone 2"
    ],
    stack: ["React", "Express", "Node.js"],
    live: "https://example.com",
    code: "https://github.com/..."
  }
}
```

### Modifying Skills
Skills are grouped by categories. You can adjust the visual confidence indicator levels (0 to 100) under `skills`:

```typescript
{
  title: "Programming",
  description: "Core algorithms and scripting languages.",
  icon: "Code",
  skills: [
    { name: "Python", level: 90 },
    { name: "TypeScript", level: 85 }
  ]
}
```

---

## 📂 Project Architecture

```
Myportfolio/
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind v4 directives, mesh gradient backgrounds, SVG noise
│   │   ├── layout.tsx      # Inter & Manrope fonts, SEO tags, Global Theme Provider
│   │   ├── page.tsx        # Main layout assembling page sections
│   │   └── providers.tsx   # Light/Dark Theme Context logic
│   ├── data/
│   │   └── portfolio.ts    # Centralized custom details profile
│   └── components/
│       ├── Navbar.tsx      # Sticky glassmorphism nav & slide-in drawer
│       ├── Hero.tsx        # Headings, dynamic CTAs, & ThreeCanvas integration
│       ├── ThreeCanvas.tsx # 3D particle sphere / torus background (WebGL checked)
│       ├── About.tsx       # Bio paragraphs & viewport count-up counters
│       ├── Skills.tsx      # Skills grid & animated progress trackers
│       ├── Projects.tsx    # Card grids with 3D mouse-tilt controls & modal hooks
│       ├── CaseStudyModal.tsx # Framer Motion modal rendering full case studies
│       ├── Experience.tsx  # Vertical timeline with scrolling connector progress line
│       ├── Services.tsx    # Freelance grids with detail indicators
│       ├── Contact.tsx     # Validated contact form with confetti submissions
│       └── Footer.tsx      # Minimal navigation links and back-to-top buttons
├── package.json            # Scripts & project dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## 🎨 Design Features

1. **Premium 3D Particles**: Powered by `@react-three/fiber`, the Hero section hosts a spinning particle cloud and concentric orbital wireframe rings that respond to elapsed time. Includes automatic SVG fallback for browsers with WebGL disabled.
2. **Interactive 3D Mouse Tilt**: Hovering project cards triggers a 3D perspective rotation calculating relative cursor offsets to tilt the card dynamically.
3. **Magnetic Pulls**: CTA buttons, icons, and menu shortcuts wrap inside custom coordinates, pulling slightly toward the cursor on proximity.
4. **Scrolling Connected Timelines**: A vertical line tracking timeline progress grows and glows dynamically as items reveal.
5. **Validated Contact Loops**: Includes client inputs verification, inline indicator warning dialogs, and a confetti explosion upon successful submission.
