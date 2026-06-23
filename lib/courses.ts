export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  instructorBio: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Beginner to Advanced";
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
    title: "AI Mastery Flagship Course — Beginner to Advanced",
    instructor: "YesDo Edutech Faculty",
    instructorTitle: "AI & Industry Skills Experts",
    instructorBio: "Our faculty comprises professionals from leading tech companies and academic institutions. Curriculum designed and taught by industry practitioners with real-world AI experience.",
    level: "Beginner to Advanced",
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
    classroomLink: "https://classroom.google.com/c/NzEyNTcyNzUyNjU4",
    classroomCode: "ai-mastery-2026",
    nextLiveSession: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    liveSessionLink: "https://meet.google.com/aim-astery-2026",
  },

];

export function getCourseById(id: string): Course | undefined {
  return ALL_COURSES.find((c) => c.id === id);
}
