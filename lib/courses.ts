export interface Course {
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
  category: "AR" | "AI";
  tag?: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  description: string;
  outcomes: string[];
  curriculum: { section: string; lessons: number; duration: string }[];
}

export const ALL_COURSES: Course[] = [
  {
    id: "ar-fundamentals",
    title: "AR Fundamentals: Build Your First AR App",
    instructor: "Dr. Sarah Chen",
    instructorTitle: "AR Research Lead, ex-Google",
    instructorBio: "Dr. Sarah Chen has 10+ years in AR/VR research and has shipped AR features used by millions at Google. She holds a PhD in Computer Vision from MIT.",
    level: "Beginner",
    duration: "12h",
    students: 8420,
    rating: 4.9,
    reviews: 1240,
    price: 2999,
    category: "AR",
    tag: "Bestseller",
    emoji: "🥽",
    gradientFrom: "#1d4ed8",
    gradientTo: "#06b6d4",
    description: "Master the fundamentals of Augmented Reality from scratch. Build real AR applications using industry-standard tools and frameworks. By the end, you'll have a portfolio of AR projects ready to showcase.",
    outcomes: [
      "Understand core AR concepts and frameworks",
      "Build AR apps with Unity and ARKit/ARCore",
      "Create WebAR experiences with A-Frame",
      "Deploy AR apps to iOS and Android",
      "Integrate 3D models into real-world environments",
      "Optimize AR performance for mobile devices",
    ],
    curriculum: [
      { section: "Introduction to AR", lessons: 4, duration: "1.5h" },
      { section: "AR Development Tools Setup", lessons: 6, duration: "2.5h" },
      { section: "Building Your First AR App", lessons: 8, duration: "3h" },
      { section: "Advanced AR Techniques", lessons: 6, duration: "3h" },
      { section: "Deployment & Optimization", lessons: 4, duration: "2h" },
    ],
  },
  {
    id: "ai-ml-bootcamp",
    title: "AI & Machine Learning Bootcamp",
    instructor: "Prof. Raj Patel",
    instructorTitle: "ML Engineer, ex-Meta AI",
    instructorBio: "Prof. Raj Patel led ML infrastructure at Meta AI and has published 20+ papers on deep learning. He teaches at IIT Bombay and mentors 500+ students.",
    level: "Intermediate",
    duration: "40h",
    students: 12300,
    rating: 4.8,
    reviews: 2100,
    price: 4999,
    category: "AI",
    tag: "Top Rated",
    emoji: "🤖",
    gradientFrom: "#7c3aed",
    gradientTo: "#ec4899",
    description: "The most comprehensive AI & ML bootcamp available. Go from Python basics to deploying production ML models. Covers supervised, unsupervised, and reinforcement learning with real-world projects.",
    outcomes: [
      "Master Python for data science and ML",
      "Build and train neural networks from scratch",
      "Work with scikit-learn, TensorFlow, and PyTorch",
      "Deploy ML models to production APIs",
      "Understand NLP, computer vision, and time series",
      "Complete 5 real-world capstone projects",
    ],
    curriculum: [
      { section: "Python & Data Science Foundations", lessons: 8, duration: "6h" },
      { section: "Classical Machine Learning", lessons: 10, duration: "8h" },
      { section: "Deep Learning & Neural Networks", lessons: 12, duration: "10h" },
      { section: "NLP & Computer Vision", lessons: 8, duration: "8h" },
      { section: "MLOps & Deployment", lessons: 6, duration: "5h" },
      { section: "Capstone Projects", lessons: 4, duration: "3h" },
    ],
  },
  {
    id: "generative-ai",
    title: "Generative AI: From GPT to Diffusion Models",
    instructor: "Alex Rivera",
    instructorTitle: "AI Research Scientist",
    instructorBio: "Alex Rivera is an AI researcher who has worked on large language models at OpenAI and Stability AI. He specializes in generative models and prompt engineering.",
    level: "Advanced",
    duration: "28h",
    students: 5600,
    rating: 4.9,
    reviews: 890,
    price: 5999,
    category: "AI",
    tag: "New",
    emoji: "✨",
    gradientFrom: "#059669",
    gradientTo: "#06b6d4",
    description: "Dive deep into the world of generative AI. Understand how GPT, DALL-E, Stable Diffusion, and other cutting-edge models work. Build your own generative applications and fine-tune models.",
    outcomes: [
      "Understand transformer architecture and attention",
      "Fine-tune LLMs with LoRA and PEFT",
      "Build RAG pipelines with LangChain",
      "Create image generation apps with Stable Diffusion",
      "Deploy generative AI APIs at scale",
      "Implement prompt engineering best practices",
    ],
    curriculum: [
      { section: "Foundations of Generative AI", lessons: 5, duration: "4h" },
      { section: "Large Language Models Deep Dive", lessons: 8, duration: "7h" },
      { section: "Image Generation & Diffusion Models", lessons: 7, duration: "6h" },
      { section: "Building GenAI Applications", lessons: 8, duration: "7h" },
      { section: "Fine-tuning & Deployment", lessons: 5, duration: "4h" },
    ],
  },
  {
    id: "unity-ar",
    title: "Unity AR Development",
    instructor: "James Park",
    instructorTitle: "Senior Unity Developer",
    instructorBio: "James Park has shipped 15+ AR games and experiences on the App Store. He's a Unity Certified Expert and has trained 3000+ developers worldwide.",
    level: "Intermediate",
    duration: "35h",
    students: 4200,
    rating: 4.7,
    reviews: 680,
    price: 4499,
    category: "AR",
    emoji: "🎮",
    gradientFrom: "#dc2626",
    gradientTo: "#f59e0b",
    description: "Build professional AR games and experiences with Unity. Master AR Foundation, ARKit, ARCore, and Vuforia. Create immersive AR apps that work across iOS and Android.",
    outcomes: [
      "Master Unity AR Foundation framework",
      "Build AR games with physics and interactions",
      "Implement image and object tracking",
      "Create multiplayer AR experiences",
      "Optimize AR apps for performance",
      "Publish to App Store and Google Play",
    ],
    curriculum: [
      { section: "Unity Fundamentals for AR", lessons: 6, duration: "5h" },
      { section: "AR Foundation & Plane Detection", lessons: 8, duration: "7h" },
      { section: "Image & Object Tracking", lessons: 7, duration: "6h" },
      { section: "AR Interactions & Physics", lessons: 8, duration: "8h" },
      { section: "Publishing & Optimization", lessons: 6, duration: "5h" },
      { section: "Capstone AR Game", lessons: 4, duration: "4h" },
    ],
  },
  {
    id: "computer-vision",
    title: "Computer Vision with OpenCV",
    instructor: "Dr. Priya Nair",
    instructorTitle: "Computer Vision Engineer, ex-Amazon",
    instructorBio: "Dr. Priya Nair built computer vision systems at Amazon Rekognition. She holds a PhD from IISc Bangalore and has 8 years of industry experience.",
    level: "Intermediate",
    duration: "22h",
    students: 6800,
    rating: 4.8,
    reviews: 1050,
    price: 3999,
    category: "AI",
    emoji: "👁️",
    gradientFrom: "#0891b2",
    gradientTo: "#7c3aed",
    description: "Master computer vision from fundamentals to advanced deep learning. Build real-world applications including face recognition, object detection, and video analysis using OpenCV and PyTorch.",
    outcomes: [
      "Master OpenCV for image processing",
      "Build object detection with YOLO",
      "Implement face recognition systems",
      "Create video analysis pipelines",
      "Deploy CV models to edge devices",
      "Work with medical and satellite imagery",
    ],
    curriculum: [
      { section: "Image Processing Fundamentals", lessons: 6, duration: "4h" },
      { section: "Feature Detection & Matching", lessons: 5, duration: "4h" },
      { section: "Deep Learning for Vision", lessons: 7, duration: "6h" },
      { section: "Object Detection & Segmentation", lessons: 6, duration: "5h" },
      { section: "Real-World CV Projects", lessons: 4, duration: "3h" },
    ],
  },
  {
    id: "webar-dev",
    title: "WebAR Development",
    instructor: "Carlos Mendez",
    instructorTitle: "WebXR Developer & Speaker",
    instructorBio: "Carlos Mendez is a WebXR pioneer who has built AR experiences for Nike, IKEA, and L'Oréal. He speaks at WebSummit and Google I/O regularly.",
    level: "Beginner",
    duration: "18h",
    students: 3100,
    rating: 4.6,
    reviews: 420,
    price: 3499,
    category: "AR",
    emoji: "🌐",
    gradientFrom: "#0066ff",
    gradientTo: "#8b5cf6",
    description: "Build AR experiences that run directly in the browser — no app download required. Master A-Frame, Three.js, and WebXR to create stunning AR for e-commerce, marketing, and education.",
    outcomes: [
      "Build AR with A-Frame and Three.js",
      "Implement WebXR APIs",
      "Create marker-based AR experiences",
      "Build AR product try-on features",
      "Optimize WebAR for mobile browsers",
      "Deploy to any website instantly",
    ],
    curriculum: [
      { section: "Web Technologies for AR", lessons: 5, duration: "3h" },
      { section: "A-Frame & Three.js Basics", lessons: 7, duration: "5h" },
      { section: "WebXR API Deep Dive", lessons: 6, duration: "4h" },
      { section: "Building Real WebAR Apps", lessons: 7, duration: "4h" },
      { section: "Performance & Deployment", lessons: 4, duration: "2h" },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return ALL_COURSES.find((c) => c.id === id);
}
