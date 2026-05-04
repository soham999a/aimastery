import os

courses_code = '''export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  instructorBio: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  category: "AI" | "Data" | "Dev" | "Cert";
  tag?: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  description: string;
  outcomes: string[];
  curriculum: { section: string; lessons: number; duration: string }[];
  classroomLink: string;
  classroomCode: string;
  nextLiveSession?: string;
  liveSessionLink?: string;
  isFlagship?: boolean;
  originalPrice?: number;
  modules?: number;
}

export const ALL_COURSES: Course[] = [
  {
    id: "ai-mastery-complete",
    title: "AI Mastery Complete Course",
    instructor: "YesDo Edutech Faculty",
    instructorTitle: "AI & Industry Skills Experts",
    instructorBio: "Our faculty comprises professionals from leading tech companies and academic institutions. Curriculum designed and taught by industry practitioners with real-world AI experience.",
    level: "Beginner",
    duration: "27 modules",
    students: 1200,
    rating: 4.9,
    reviews: 340,
    price: 10000,
    originalPrice: 30000,
    category: "AI",
    tag: "Flagship",
    emoji: "��",
    gradientFrom: "#1e3a8a",
    gradientTo: "#d97706",
    isFlagship: true,
    modules: 27,
    description: "Our signature 27-module programme — the most comprehensive AI curriculum for students. Build real AI apps, dashboards, chatbots, and portfolios. 100% practical, outcome-driven, and designed for school/college students who want to be AI-ready.",
    outcomes: [
      "Master ChatGPT, Claude, Gemini, and 10+ AI tools",
      "Build your own AI employee and automation workflows",
      "Create AI-powered dashboards with Power BI and Excel",
      "Write ATS-optimised resume and LinkedIn profile with AI",
      "Build customer support agents with RAG systems",
      "Earn online through freelancing with AI skills",
    ],
    curriculum: [
      { section: "AI Foundation & Prompt Engineering", lessons: 2, duration: "4h" },
      { section: "Data Analysis with AI + Excel", lessons: 2, duration: "6h" },
      { section: "Data Visualisation with Power BI", lessons: 1, duration: "3h" },
      { section: "Workflow Automation (Make & n8n)", lessons: 2, duration: "5h" },
      { section: "Generative AI & Product Building", lessons: 3, duration: "6h" },
      { section: "AI Career Toolkit", lessons: 3, duration: "5h" },
      { section: "Voice AI, RAG & AI Agents", lessons: 6, duration: "10h" },
      { section: "Build Your Own AI Employee", lessons: 2, duration: "4h" },
      { section: "Job Hunting, Interview Prep & Capstone", lessons: 4, duration: "6h" },
    ],
    classroomLink: "https://classroom.google.com/c/REPLACE_AI_MASTERY_COMPLETE",
    classroomCode: "REPLACE_CODE",
    nextLiveSession: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    liveSessionLink: "https://meet.google.com/replace-ai-mastery",
  },
  {
    id: "learn-ai-python",
    title: "Learn AI using Python",
    instructor: "YesDo Edutech Faculty",
    instructorTitle: "ML & AI Engineers",
    instructorBio: "Taught by working ML engineers with experience in NumPy, Pandas, TensorFlow, and PyTorch. Real-world project portfolio included.",
    level: "Intermediate",
    duration: "40h",
    students: 480,
    rating: 4.8,
    reviews: 120,
    price: 8000,
    category: "AI",
    tag: "Popular",
    emoji: "🐍",
    gradientFrom: "#065f46",
    gradientTo: "#1d4ed8",
    description: "Full Python programming through NumPy, Pandas, Matplotlib, and Seaborn, followed by machine learning, neural networks, NLP, computer vision, and real-world AI projects with a deployed model portfolio.",
    outcomes: [
      "Master Python for data science and AI",
      "Build and train ML models from scratch",
      "Work with TensorFlow and PyTorch",
      "Implement NLP and Computer Vision projects",
      "Deploy AI models to production",
      "Build a portfolio of real AI projects",
    ],
    curriculum: [
      { section: "Python Fundamentals", lessons: 6, duration: "8h" },
      { section: "NumPy, Pandas & Data Analysis", lessons: 5, duration: "7h" },
      { section: "Machine Learning with Scikit-learn", lessons: 7, duration: "9h" },
      { section: "Deep Learning & Neural Networks", lessons: 6, duration: "8h" },
      { section: "NLP & Computer Vision", lessons: 5, duration: "6h" },
      { section: "Real-World AI Projects", lessons: 3, duration: "4h" },
    ],
    classroomLink: "https://classroom.google.com/c/REPLACE_AI_PYTHON",
    classroomCode: "REPLACE_CODE",
    nextLiveSession: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    liveSessionLink: "https://meet.google.com/replace-ai-python",
  },
  {
    id: "data-analytics",
    title: "Data Analytics + Business Analytics",
    instructor: "YesDo Edutech Faculty",
    instructorTitle: "Data & Business Analytics Experts",
    instructorBio: "Taught by professionals with experience in BFSI, consulting, and Fortune 500 companies. Covers real business KPIs and dashboards.",
    level: "Beginner",
    duration: "35h",
    students: 620,
    rating: 4.8,
    reviews: 180,
    price: 7500,
    category: "Data",
    tag: "In Demand",
    emoji: "📊",
    gradientFrom: "#7c3aed",
    gradientTo: "#0891b2",
    description: "A 7-module curriculum covering descriptive to prescriptive analytics, business foundations, Excel dashboards, SQL querying, Python for data, statistics, Power BI visualisations, and a business analytics capstone.",
    outcomes: [
      "Master Excel for business dashboards",
      "Write SQL queries for data analysis",
      "Build Power BI visualisations",
      "Apply Python for data analysis",
      "Understand business KPIs and metrics",
      "Complete a business analytics capstone project",
    ],
    curriculum: [
      { section: "Excel for Business Analytics", lessons: 5, duration: "6h" },
      { section: "SQL Fundamentals", lessons: 5, duration: "6h" },
      { section: "Python for Data Analysis", lessons: 5, duration: "6h" },
      { section: "Power BI Visualisations", lessons: 5, duration: "6h" },
      { section: "Statistics & Business KPIs", lessons: 4, duration: "5h" },
      { section: "Business Analytics Capstone", lessons: 3, duration: "4h" },
    ],
    classroomLink: "https://classroom.google.com/c/REPLACE_DATA_ANALYTICS",
    classroomCode: "REPLACE_CODE",
    nextLiveSession: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    liveSessionLink: "https://meet.google.com/replace-data-analytics",
  },
  {
    id: "python-fullstack",
    title: "Python Full Stack Development",
    instructor: "YesDo Edutech Faculty",
    instructorTitle: "Full Stack Developers",
    instructorBio: "Taught by working software engineers with experience in Django, Flask, and REST API development. Real-world project portfolio included.",
    level: "Intermediate",
    duration: "45h",
    students: 290,
    rating: 4.7,
    reviews: 85,
    price: 9000,
    category: "Dev",
    emoji: "💻",
    gradientFrom: "#dc2626",
    gradientTo: "#7c3aed",
    description: "From Python basics to complete web applications. Covers front-end, back-end, databases, APIs, and real-world projects for students interested in software engineering and product development.",
    outcomes: [
      "Build complete web applications with Python",
      "Master Django and Flask frameworks",
      "Create REST APIs for mobile and web apps",
      "Work with databases and SQL",
      "Deploy applications to the cloud",
      "Build a portfolio of full-stack projects",
    ],
    curriculum: [
      { section: "Python & Web Fundamentals", lessons: 6, duration: "8h" },
      { section: "HTML, CSS & JavaScript", lessons: 5, duration: "7h" },
      { section: "Django Framework", lessons: 7, duration: "10h" },
      { section: "REST APIs & Databases", lessons: 6, duration: "8h" },
      { section: "Deployment & DevOps Basics", lessons: 4, duration: "6h" },
      { section: "Capstone Project", lessons: 3, duration: "6h" },
    ],
    classroomLink: "https://classroom.google.com/c/REPLACE_PYTHON_FULLSTACK",
    classroomCode: "REPLACE_CODE",
    nextLiveSession: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    liveSessionLink: "https://meet.google.com/replace-python-fullstack",
  },
  {
    id: "microsoft-certification",
    title: "Microsoft Certification Path",
    instructor: "YesDo Edutech Faculty",
    instructorTitle: "Microsoft Certified Trainers",
    instructorBio: "Taught by Microsoft Certified Professionals with experience in Power Platform, Azure AI, and enterprise analytics. Official certification preparation included.",
    level: "Intermediate",
    duration: "30h",
    students: 210,
    rating: 4.8,
    reviews: 65,
    price: 8500,
    category: "Cert",
    tag: "Certification",
    emoji: "🏆",
    gradientFrom: "#0078d4",
    gradientTo: "#00b4d8",
    description: "Official Microsoft certification preparation. PL-900 covers AI, Power Platform, and cloud fundamentals. PL-300 is a deep dive into Power BI, DAX, modelling, and professional dashboards.",
    outcomes: [
      "Pass Microsoft PL-900 certification exam",
      "Pass Microsoft PL-300 Power BI certification",
      "Master Power BI for professional dashboards",
      "Understand Azure AI fundamentals",
      "Work with Power Platform tools",
      "Add Microsoft certifications to your resume",
    ],
    curriculum: [
      { section: "PL-900: AI & Cloud Fundamentals", lessons: 5, duration: "6h" },
      { section: "Power Platform Overview", lessons: 4, duration: "5h" },
      { section: "PL-300: Power BI Deep Dive", lessons: 7, duration: "9h" },
      { section: "DAX & Data Modelling", lessons: 5, duration: "6h" },
      { section: "Azure AI Fundamentals", lessons: 4, duration: "4h" },
    ],
    classroomLink: "https://classroom.google.com/c/REPLACE_MICROSOFT_CERT",
    classroomCode: "REPLACE_CODE",
    nextLiveSession: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    liveSessionLink: "https://meet.google.com/replace-microsoft-cert",
  },
  {
    id: "alteryx-certification",
    title: "Alteryx Foundation & Core Certification",
    instructor: "YesDo Edutech Faculty",
    instructorTitle: "Data Engineering & Analytics Experts",
    instructorBio: "Taught by professionals with BFSI and consulting experience. Alteryx is highly valued in banking, finance, and consulting sectors.",
    level: "Intermediate",
    duration: "25h",
    students: 150,
    rating: 4.7,
    reviews: 42,
    price: 7000,
    category: "Cert",
    tag: "BFSI",
    emoji: "⚡",
    gradientFrom: "#0891b2",
    gradientTo: "#059669",
    description: "Industry-recognised certification for data preparation and analytics automation. Highly valued in BFSI and consulting sectors, and a strong differentiator even before graduation.",
    outcomes: [
      "Master Alteryx for data preparation",
      "Build ETL pipelines and workflows",
      "Automate analytics processes",
      "Pass Alteryx Foundation certification",
      "Work with real BFSI datasets",
      "Stand out in banking and consulting interviews",
    ],
    curriculum: [
      { section: "Alteryx Fundamentals", lessons: 5, duration: "6h" },
      { section: "Data Preparation & Blending", lessons: 5, duration: "6h" },
      { section: "ETL & Workflow Automation", lessons: 5, duration: "6h" },
      { section: "Analytics & Reporting", lessons: 4, duration: "5h" },
      { section: "Certification Prep & Practice", lessons: 3, duration: "4h" },
    ],
    classroomLink: "https://classroom.google.com/c/REPLACE_ALTERYX",
    classroomCode: "REPLACE_CODE",
    nextLiveSession: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    liveSessionLink: "https://meet.google.com/replace-alteryx",
  },
];

export function getCourseById(id: string): Course | undefined {
  return ALL_COURSES.find((c) => c.id === id);
}
'''

with open("ar-ai-mastery/lib/courses.ts", "w", encoding="utf-8") as f:
    f.write(courses_code)
print("courses done", len(courses_code))
