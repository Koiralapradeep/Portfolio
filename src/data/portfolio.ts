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
    title: "Full Stack Developer",
    subTitle: "Crafting scalable backend architectures and refined, responsive user experiences.",
    email: "pradeepkoirala07@gmail.com",
    github: "https://github.com/Koiralapradeep",
    linkedin: "https://www.linkedin.com/in/pradeep-koirala-b22636202/",
    bioBrief: "Computer Science graduate and Full Stack Developer with hands-on experience in full-stack web development, UI implementation, backend functionality, debugging, testing, and project documentation.",
    bioLong: [
      "I am a Computer Science graduate and Full Stack Developer with hands-on experience in full-stack web development, UI implementation, backend functionality, debugging, testing, and project documentation.",
      "My practical background includes building client-facing web applications, dashboard systems, and custom automation, combined with professional experience teaching Computer Science at the secondary and college level.",
      "With a strong foundation in communication, coordination, and problem-solving, I focus on engineering clean, scalable code structures, responsive UI design, and production-ready deployments."
    ],
    stats: [
      { value: "6+", label: "Completed Projects" },
      { value: "2+", label: "Years Programming" },
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
      id: "jurist",
      title: "Jurist Council Website",
      description: "Developed a professional law firm website presenting legal services, lawyer profiles, and consultation booking functionality.",
      icon: "Scale",
      tech: ["HTML", "CSS", "JavaScript", "Responsive UI"],
      live: "https://www.juristcouncil.com.np/",
      code: "https://www.juristcouncil.com.np/",
      caseStudy: {
        kicker: "Case Study • Client Branding",
        title: "Jurist Council Website",
        desc: "Developed a professional law firm website presenting legal services, lawyer profiles, and consultation booking functionality.",
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
    }
  ],
  skills: [
    {
      title: "Full-Stack Development",
      description: "Building end-to-end web applications and UI components.",
      icon: "Layers",
      skills: [
        { name: "JavaScript / ES6", level: 92 },
        { name: "Full-Stack Development", level: 90 },
        { name: "Front-End & Back-End", level: 90 },
        { name: "UI Component Implementation", level: 92 },
        { name: "Web Application Maintenance", level: 88 }
      ]
    },
    {
      title: "Design & Analysis",
      description: "Creating user experiences and analyzing system data.",
      icon: "Cpu",
      skills: [
        { name: "UI/UX Design", level: 85 },
        { name: "Figma", level: 80 },
        { name: "Data Analysis", level: 82 },
        { name: "Project Documentation", level: 90 },
        { name: "Brand Development", level: 75 }
      ]
    },
    {
      title: "Tools & Testing",
      description: "Software testing, coordination, and developer platforms.",
      icon: "Wrench",
      skills: [
        { name: "Debugging & Testing", level: 88 },
        { name: "GitHub / Version Control", level: 90 },
        { name: "Postman / VS Code", level: 92 },
        { name: "Jira / Project Tracking", level: 85 },
        { name: "Unity Engine", level: 70 }
      ]
    },
    {
      title: "Professional Qualities",
      description: "Soft skills for communication and crisis management.",
      icon: "Code",
      skills: [
        { name: "Creative Thinking", level: 90 },
        { name: "Crisis Management", level: 85 },
        { name: "Customer Orientation", level: 88 },
        { name: "Adaptability", level: 92 }
      ]
    }
  ],
  experience: [
    {
      title: "Computer Science Teacher (Grade 11–12)",
      subtitle: "Ekata James English Academy, Kathmandu, Nepal",
      date: "February 2026 — Present",
      points: [
        "Teach Computer Science to Class XI and XII students, delivering two periods per day.",
        "Maintain professional classroom conduct, support student learning, and coordinate positively with staff and college administration."
      ],
      type: "work"
    },
    {
      title: "Full Stack Developer",
      subtitle: "Brainztechs IT Solutions, Kathmandu, Nepal",
      date: "December 2025 — Present",
      points: [
        "Develop and maintain web application features across client-side and server-side components.",
        "Implement user interface components, support backend functionality, resolve technical issues, and contribute to smooth project execution.",
        "Collaborate with team members and stakeholders, applying clear communication, technical dedication, and proactive problem-solving."
      ],
      type: "work"
    },
    {
      title: "Developer Intern",
      subtitle: "Brainztechs IT Solutions, Kathmandu, Nepal",
      date: "September 2025 — December 2025",
      points: [
        "Supported software development lifecycle activities, including requirement analysis, sprint discussions, feature development, debugging, testing, and project documentation.",
        "Gained practical exposure to industry-standard development practices and front-end/back-end technologies."
      ],
      type: "work"
    },
    {
      title: "Volunteer, Blood Donation Program",
      subtitle: "Leo Club of Kathmandu Chhabdi Barahi, Kathmandu, Nepal",
      date: "June 2025",
      points: [
        "Assisted with donor registration, participant coordination, and general event support during a community blood donation program.",
        "Helped manage smooth program flow and contributed to a social service initiative promoting blood donation and community health awareness."
      ],
      type: "work"
    },
    {
      title: "BSc (Hons) Computer Science",
      subtitle: "Herald College Kathmandu, affiliated with University of Wolverhampton, Kathmandu, Nepal",
      date: "2022 — 2025",
      points: [
        "Earned Honours degree in Computer Science, focusing on Software Engineering, Databases, and Intelligent Systems.",
        "Gained deep foundation in software patterns, data structures, algorithms, and team project management."
      ],
      type: "education"
    },
    {
      title: "Computer Science Teacher",
      subtitle: "Wonderland English Boarding School, Jhapa, Nepal",
      date: "April 2020 — September 2021",
      points: [
        "Taught Computer Science to students up to Class 8, covering fundamental computer concepts and practical learning activities.",
        "Prepared and delivered lessons to support students' understanding of computer fundamentals.",
        "Maintained a positive learning environment through disciplined, supportive, and cooperative classroom practice."
      ],
      type: "work"
    },
    {
      title: "Management (+2)",
      subtitle: "Global Educational Academy, Damak, Jhapa, Nepal",
      date: "2017 — 2019",
      points: [
        "Completed higher secondary education focusing on Business Management, Economics, and Accountancy."
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
