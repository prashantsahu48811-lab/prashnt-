/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION
 * ====================================================================
 * You can edit all your details here directly! 
 * Every change in this file will automatically update your website.
 * No need to modify complex HTML files unless you want custom layout tweaks.
 */

const portfolioData = {
  // ------------------------------------------------------------------
  // 1. PERSONAL INFORMATION (Home & Header)
  // ------------------------------------------------------------------
  personal: {
    name: "Prashant Sahu",
    role: "Software Developer & Tech Enthusiast",
    // 1-2 line intro shown on your Home page
    intro: "Passionate about engineering scalable web applications, crafting intuitive user experiences, and exploring cutting-edge technologies to solve real-world problems.",
    // Path to your profile picture (Put your image in assets/images/ or use presets)
    avatar: "assets/images/anime-dev-male.jpg",
    // Location and availability status
    location: "New Delhi, India",
    statusBadge: "⚡ System Online • Available for opportunities",
    // Resume file path or Google Drive link (Optional)
    resumeUrl: "#contact", // or "assets/resume.pdf"
  },

  // ------------------------------------------------------------------
  // 2. ABOUT ME DETAILS
  // ------------------------------------------------------------------
  about: {
    // Bio paragraphs describing who you are
    bio: [
      "Hello! I'm a developer who enjoys turning complex problems into clean, efficient, and beautiful digital solutions. My journey in tech began with a curiosity about how systems communicate, and it has evolved into building full-stack applications with high performance.",
      "When I am not coding, I love exploring emerging frameworks, collaborating on open-source projects, and constantly leveling up my engineering skills."
    ],

    // Educational Details (Chronological or Reverse Chronological)
    education: [
      {
        degree: "Bachelor of Technology in Computer Science & Engineering",
        institution: "Your University / College Name",
        year: "2020 — 2024",
        score: "CGPA: 8.5 / 10.0",
        description: "Specialized in Software Engineering, Algorithms, and Distributed Systems. Completed capstone project with distinction."
      },
      {
        degree: "Higher Secondary Certificate (Class XII)",
        institution: "Your Senior Secondary School Name",
        year: "2018 — 2020",
        score: "Score: 90%",
        description: "Focused on Physics, Chemistry, and Advanced Mathematics with Computer Science."
      },
      {
        degree: "Secondary School Certificate (Class X)",
        institution: "Your High School Name",
        year: "2018",
        score: "Score: 92%",
        description: "Awarded academic excellence and participated in state-level science symposiums."
      }
    ],

    // Hobbies and Interests
    hobbies: [
      {
        icon: "💻",
        title: "Open Source & Coding",
        description: "Building side projects, experimenting with new libraries, and contributing to community tools."
      },
      {
        icon: "📚",
        title: "Tech Reading & Blogging",
        description: "Reading system design blogs, tech newsletters, and exploring modern architectural patterns."
      },
      {
        icon: "🎮",
        title: "Gaming & Strategy",
        description: "Enjoying multiplayer strategy and immersive sandbox games that challenge decision-making."
      },
      {
        icon: "✈️",
        title: "Travel & Photography",
        description: "Exploring new cities, cultural landmarks, and capturing urban architectural perspectives."
      },
      {
        icon: "🎵",
        title: "Music & Podcasts",
        description: "Listening to chill electronic beats while debugging and tech entrepreneurship podcasts."
      },
      {
        icon: "🏋️",
        title: "Fitness & Wellness",
        description: "Maintaining mental clarity and stamina through regular strength training and active sports."
      }
    ],

    // Achievements & Recognitions
    achievements: [
      {
        title: "Hackathon Winner / Finalist",
        organization: "National Level TechFest Hackathon",
        year: "2023",
        description: "Built an AI-driven accessibility platform that won 1st runner-up among 120+ teams."
      },
      {
        title: "Dean's Academic Honor List",
        organization: "University Academic Council",
        year: "2022",
        description: "Recognized for academic distinction in top 5% of computer science cohort."
      },
      {
        title: "Competitive Programming Milestone",
        organization: "LeetCode / CodeChef",
        year: "2023",
        description: "Solved 400+ algorithmic data structure problems and achieved 4-star / top 15% ranking."
      },
      {
        title: "Open Source Contributor",
        organization: "GitHub Community",
        year: "2024",
        description: "Contributed features and bugfixes to widely used developer tools and documentation."
      }
    ]
  },

  // ------------------------------------------------------------------
  // 3. SKILLS & CERTIFICATIONS
  // ------------------------------------------------------------------
  skills: [
    // Category: Frontend
    { name: "HTML5 & Modern CSS3", level: 95, category: "frontend", icon: "🌐" },
    { name: "JavaScript (ES6+)", level: 90, category: "frontend", icon: "⚡" },
    { name: "React.js / Next.js", level: 85, category: "frontend", icon: "⚛️" },
    { name: "Tailwind CSS / UI Design", level: 88, category: "frontend", icon: "🎨" },

    // Category: Backend
    { name: "Node.js & Express", level: 82, category: "backend", icon: "🟢" },
    { name: "Python", level: 85, category: "backend", icon: "🐍" },
    { name: "RESTful APIs & GraphQL", level: 86, category: "backend", icon: "🔌" },
    { name: "PostgreSQL & MongoDB", level: 80, category: "backend", icon: "🗄️" },

    // Category: Tools & DevOps
    { name: "Git & GitHub", level: 90, category: "tools", icon: "🐙" },
    { name: "Docker & Containers", level: 75, category: "tools", icon: "🐳" },
    { name: "Linux & Shell Scripting", level: 80, category: "tools", icon: "🐧" },
    { name: "VS Code / Dev Tools", level: 92, category: "tools", icon: "🛠️" },

    // Category: Core / Soft Skills
    { name: "Data Structures & Algorithms", level: 88, category: "core", icon: "🧠" },
    { name: "Object-Oriented Design", level: 85, category: "core", icon: "📐" },
    { name: "Problem Solving & Debugging", level: 90, category: "core", icon: "🔍" },
    { name: "Agile & Team Collaboration", level: 85, category: "core", icon: "🤝" }
  ],

  // Skill category filter definitions
  skillCategories: [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools & DevOps" },
    { id: "core", label: "Core & Soft Skills" }
  ],

  // Certifications
  certifications: [
    {
      title: "Full Stack Web Development Specialization",
      issuer: "Coursera / Meta",
      date: "Nov 2023",
      credentialUrl: "https://coursera.org",
      credentialId: "CERT-FS-88392",
      image: "assets/images/cert-placeholder.svg",
      skillsCovered: ["React", "Node.js", "APIs", "Database Management"]
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Aug 2023",
      credentialUrl: "https://aws.amazon.com",
      credentialId: "AWS-CCP-109283",
      image: "assets/images/cert-placeholder.svg",
      skillsCovered: ["Cloud Architecture", "EC2", "S3", "Security"]
    },
    {
      title: "Data Structures and Algorithms Masterclass",
      issuer: "Udemy / Global Academy",
      date: "Jan 2023",
      credentialUrl: "https://udemy.com",
      credentialId: "UC-4901928-DSA",
      image: "assets/images/cert-placeholder.svg",
      skillsCovered: ["Algorithms", "Problem Solving", "Time Complexity"]
    },
    {
      title: "Python for Data Science & Machine Learning",
      issuer: "Cognitive Class / IBM",
      date: "May 2022",
      credentialUrl: "https://cognitiveclass.ai",
      credentialId: "IBM-PY-58201",
      image: "assets/images/cert-placeholder.svg",
      skillsCovered: ["Python", "Pandas", "NumPy", "Data Visualization"]
    }
  ],

  // ------------------------------------------------------------------
  // 4. CONTACT & SOCIAL DETAILS
  // ------------------------------------------------------------------
  contact: {
    // Fill in your phone number (will have 1-click copy & click-to-call)
    phone: "+91 98765 43210",
    phoneClean: "+919876543210", // No spaces for tel: link

    // Fill in your email address (will have 1-click copy & mailto link)
    email: "prashantsahu.dev@example.com",

    // Location shown in contact section
    address: "New Delhi, India",

    // Social Profiles - Replace with your direct profile links
    socials: {
      linkedin: {
        name: "LinkedIn",
        username: "linkedin.com/in/prashant-sahu",
        url: "https://www.linkedin.com/in/prashant-sahu",
        icon: "linkedin"
      },
      github: {
        name: "GitHub",
        username: "github.com/prashantsahu",
        url: "https://github.com/prashantsahu",
        icon: "github"
      },
      instagram: {
        name: "Instagram",
        username: "@prashant.codes",
        url: "https://instagram.com",
        icon: "instagram"
      }
    }
  }
};

// Make accessible to browser window
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
