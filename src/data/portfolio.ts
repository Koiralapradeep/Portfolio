export interface ProjectCaseStudy {
  kicker: string;
  title: string;
  desc: string;
  highlights: string[];
  stack: string[];
  live: string;
  code: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string; // FontAwesome or Lucide keyword
  tech: string[];
  live: string;
  code: string;
  caseStudy: ProjectCaseStudy;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: { name: string; level: number }[]; // 1-100 scale for visual confidence indicators
}

export interface ExperienceItem {
  title: string;
  subtitle: string;
  date: string;
  points: string[];
  type: "work" | "education";
}

export interface ServiceItem {
  title: string;
  description: string;
  details: string[];
  icon: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    subTitle: string;
    email: string;
    github: string;
    linkedin: string;
    bioBrief: string;
    bioLong: string[];
    stats: { value: string; label: string }[];
  };
  projects: Project[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  services: ServiceItem[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Pradeep Koirala",
    title: "Full-Stack Developer",
    subTitle: "Crafting scalable backend architectures and refined, responsive user experiences.",
    email: "pradeepkoirala07@gmail.com",
    github: "https://github.com/Koiralapradeep",
    linkedin: "https://www.linkedin.com/in/pradeep-koirala-b22636202/",
    bioBrief: "Computer Science graduate specializing in comprehensive full-stack engineering, ML pipelines, and custom enterprise automation.",
    bioLong: [
      "I am a Computer Science graduate from Herald College Kathmandu (BSc Hons Computer Science, accredited by the University of Wolverhampton). My primary expertise spans modern backend architectures, full-stack frameworks (MERN, Django), and machine learning pipelines.",
      "My passion is engineering scalable, responsive software that solves complex real-world requirements. From design details to deployment pipelines, I prioritize clean implementation, intuitive UX, and modular code structures.",
      "Whether developing tailored management dashboards, high-performance web applications, or data analysis models, I aim for production-ready excellence. Let's build something outstanding together."
    ],
    stats: [
      { value: "5+", label: "Featured Projects" },
      { value: "3+", label: "Years Programming" },
      { value: "15+", label: "Technologies Used" },
      { value: "∞", label: "Learning Mindset" }
    ]
  },
  projects: [
    {
      id: "troyer",
      title: "Troyer Nepal Dashboard",
      description: "A full-stack, responsive dashboard built for inventory control, tool requisitions, personnel scheduling, and workflow tracking.",
      icon: "Activity",
      tech: ["Node.js", "Express", "PostgreSQL", "JavaScript"],
      live: "#",
      code: "https://github.com/Koiralapradeep/Troyer-Nepal",
      caseStudy: {
        kicker: "Case Study • Enterprise Application",
        title: "Troyer Nepal Dashboard",
        desc: "A full-stack, responsive dashboard application built for inventory control, tool requisitions, personnel scheduling, and workflow tracking. It streamlines logistics, audits tool transfers between sites, and manages employee rosters through a secure portal.",
        highlights: [
          "Developed a lightweight backend database using PostgreSQL and Express to audit tool transfers between sites.",
          "Implemented a fully responsive dashboard UI using Vanilla JS, HTML5, and CSS3 for real-time inventory control.",
          "Constructed management reporting pages to track personnel schedules, tool requisitions, and active site workflows.",
          "Designed secure user portal with role-based access for logistics managers, site engineers, and administrative staff."
        ],
        stack: ["Node.js", "Express", "PostgreSQL", "JavaScript", "HTML5", "CSS3", "SQL"],
        live: "#",
        code: "https://github.com/Koiralapradeep/Troyer-Nepal"
      }
    },
    {
      id: "resume",
      title: "Resume Generator",
      description: "Interactive full-stack resume builder with dynamic live preview, template switching, and automated exports.",
      icon: "FileText",
      tech: ["React", "Node.js", "Puppeteer", "Tailwind CSS"],
      live: "https://resume-maker-online.netlify.app/",
      code: "https://github.com/Koiralapradeep",
      caseStudy: {
        kicker: "Case Study • Web Tool",
        title: "Resume Generator",
        desc: "A modern resume designer built to help recruiters and job hunters format documents quickly with live preview configurations.",
        highlights: [
          "Built a reactive split-screen interface with instantaneous style updating.",
          "Engineered a Puppeteer-based microservice to compile layouts and print pixel-perfect PDFs.",
          "Configured modular data structures supporting rapid template additions and theme toggles.",
          "Deployed client app on Netlify with automated CDN routing."
        ],
        stack: ["React", "Node.js", "Puppeteer", "Tailwind CSS", "Express"],
        live: "https://resume-maker-online.netlify.app/",
        code: "https://github.com/Koiralapradeep"
      }
    },
    {
      id: "emrs",
      title: "Employee Roster & Management",
      description: "Robust business operations portal with secure auth, employee details tracking, and shift scheduling modules.",
      icon: "Users",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      live: "https://github.com/Koiralapradeep/EMRS-frontend",
      code: "https://github.com/Koiralapradeep/EMRS-frontend",
      caseStudy: {
        kicker: "Case Study • Admin Platform",
        title: "Employee Management & Rostering (EMRS)",
        desc: "A MERN stack portal handling scheduling workflows, protected routing structures, and operations reporting.",
        highlights: [
          "Configured secure authentication schema using JSON Web Tokens (JWT) and encrypted cookies.",
          "Constructed drag-and-drop roster sheets mapping coordinates to database schedules.",
          "Built full CRUD interfaces for managing employee profiles, permissions, and salary categories.",
          "Optimized MongoDB queries to compile weekly summaries on demand."
        ],
        stack: ["MongoDB", "Express", "React", "Node.js", "CSS Modules"],
        live: "https://github.com/Koiralapradeep/EMRS-frontend",
        code: "https://github.com/Koiralapradeep/EMRS-frontend"
      }
    },
    {
      id: "skinai",
      title: "Skin Cancer Detection AI",
      description: "Deep learning convolutional neural network pipeline engineered for computer vision skin classification.",
      icon: "Brain",
      tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
      live: "https://github.com/Koiralapradeep/AI-ML-Project",
      code: "https://github.com/Koiralapradeep/AI-ML-Project",
      caseStudy: {
        kicker: "Case Study • Computer Vision AI",
        title: "Skin Cancer Detection AI",
        desc: "CNN-based classification pipeline with image enhancement and cross-validation workflows.",
        highlights: [
          "Developed image preprocessing pipelines using OpenCV to augment training sets and adjust contrasts.",
          "Architected CNN models using TensorFlow/Keras, optimizing layers to achieve high classification metrics.",
          "Implemented training validation loops with confusion matrices and ROC curves.",
          "Structured pipeline inputs for repeatability on different clinical datasets."
        ],
        stack: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy"],
        live: "https://github.com/Koiralapradeep/AI-ML-Project",
        code: "https://github.com/Koiralapradeep/AI-ML-Project"
      }
    },
    {
      id: "sentiment",
      title: "NLP Sentiment Analyzer",
      description: "Natural language processing classification workflow analyzing review sentiments with NLTK.",
      icon: "MessageSquare",
      tech: ["Python", "NLTK", "TensorFlow", "Pandas"],
      live: "https://github.com/Koiralapradeep/AI-ML-Project",
      code: "https://github.com/Koiralapradeep/AI-ML-Project",
      caseStudy: {
        kicker: "Case Study • NLP Pipeline",
        title: "Review Sentiment Analysis",
        desc: "Text analysis pipeline parsing user reviews for sentiment patterns and customer insights.",
        highlights: [
          "Developed text cleaning utilities handling lemmatization, stopwords, and tokenization mappings.",
          "Extracted dense word embeddings using custom TF-IDF algorithms.",
          "Trained binary classification models identifying reviews as positive or negative.",
          "Assembled data analysis summaries using Pandas to visualize metric distributions."
        ],
        stack: ["Python", "NLTK", "TensorFlow", "Pandas", "Scikit-Learn"],
        live: "https://github.com/Koiralapradeep/AI-ML-Project",
        code: "https://github.com/Koiralapradeep/AI-ML-Project"
      }
    },
    {
      id: "jurist",
      title: "Jurist Council Website",
      description: "Modern professional branding page for a Nepal-based legal firm with service paths and bookings.",
      icon: "Scale",
      tech: ["HTML", "CSS", "JavaScript", "Responsive UI"],
      live: "https://www.juristcouncil.com.np/",
      code: "https://www.juristcouncil.com.np/",
      caseStudy: {
        kicker: "Case Study • Client Branding",
        title: "Jurist Council Website",
        desc: "A clean legal portal serving Civil, Criminal, and Business law descriptions with consultation integrations.",
        highlights: [
          "Designed a refined interface focusing on trust, authority, and accessible content.",
          "Structured SEO-friendly page paths mapping the firm's core legal specialties.",
          "Integrated booking and contact workflows to capture incoming consultation requests.",
          "Optimized assets and page speed for mobile networks."
        ],
        stack: ["HTML", "CSS", "JavaScript", "Responsive Design", "SEO Integration"],
        live: "https://www.juristcouncil.com.np/",
        code: "https://www.juristcouncil.com.np/"
      }
    }
  ],
  skills: [
    {
      title: "Programming",
      description: "Core algorithms and scripting languages.",
      icon: "Code",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript / ES6", level: 92 },
        { name: "TypeScript", level: 85 },
        { name: "SQL", level: 82 }
      ]
    },
    {
      title: "Web Development",
      description: "Frontend responsive UI and modular backend APIs.",
      icon: "Layers",
      skills: [
        { name: "React / Next.js", level: 88 },
        { name: "Node.js / Express", level: 90 },
        { name: "MongoDB", level: 85 },
        { name: "Django", level: 78 },
        { name: "RESTful APIs", level: 92 },
        { name: "Tailwind CSS", level: 95 }
      ]
    },
    {
      title: "Data Science & AI",
      description: "Machine learning workflows and natural language models.",
      icon: "Cpu",
      skills: [
        { name: "TensorFlow / Keras", level: 75 },
        { name: "NLTK (NLP)", level: 80 },
        { name: "Pandas / NumPy", level: 82 },
        { name: "Scikit-Learn", level: 78 }
      ]
    },
    {
      title: "Tools & DevOps",
      description: "Version control, containers, and web deployment.",
      icon: "Wrench",
      skills: [
        { name: "Git / GitHub", level: 90 },
        { name: "Docker", level: 75 },
        { name: "AWS (S3/EC2)", level: 72 },
        { name: "PostgreSQL", level: 80 }
      ]
    }
  ],
  experience: [
    {
      title: "Full-Stack Developer",
      subtitle: "Freelance & Projects",
      date: "2024 — Present",
      points: [
        "Architected scalable backend APIs and client portals using Next.js, Express, and Django.",
        "Engineered automated internal software (like Troyer Nepal) utilizing spreadsheet parsers and dynamic charting.",
        "Constructed protected layouts with robust authorization routing and session management.",
        "Emphasized clean coding standards, responsive design grids, and deployment reliability."
      ],
      type: "work"
    },
    {
      title: "ML & NLP Project Lead",
      subtitle: "Academic & Personal Projects",
      date: "2023 — 2024",
      points: [
        "Constructed Convolutional Neural Networks (CNNs) for image classification (Skin Cancer detection AI).",
        "Developed custom cleaning pipelines for NLP tokenization, stopwords, and TF-IDF classifiers.",
        "Trained models using TensorFlow, Keras, and Scikit-Learn to refine classification outputs.",
        "Assembled metric performance reports demonstrating model progress."
      ],
      type: "work"
    },
    {
      title: "BSc (Hons) Computer Science",
      subtitle: "Herald College Kathmandu (Univ. of Wolverhampton)",
      date: "2022 — 2025",
      points: [
        "Earned Honours degree in Computer Science, focusing on Software Engineering, Databases, and Intelligent Systems.",
        "Gained deep foundation in software patterns, data structures, algorithms, and team project management."
      ],
      type: "education"
    }
  ],
  services: [
    {
      title: "Full-Stack Web Development",
      description: "Creating end-to-end web applications with robust architecture and sleek responsive UIs.",
      details: ["React & Next.js Frontends", "Node.js / Django Backends", "API Design & Integration", "Database Modeling (SQL/NoSQL)"],
      icon: "Globe"
    },
    {
      title: "Custom Automation & Tooling",
      description: "Developing specialized scripts and software to optimize internal workflows and manage files.",
      details: ["Excel & PDF automated parsers", "Web Scraping & Data Extraction", "Internal admin tools", "Performance Tuning"],
      icon: "Settings"
    },
    {
      title: "AI & ML Pipeline Integration",
      description: "Setting up intelligent features, classification models, and processing workflows.",
      details: ["CNN Image Classification", "NLP Text Sentiment Analytics", "Data Preprocessing pipelines", "Model deployment integrations"],
      icon: "Brain"
    }
  ]
};
