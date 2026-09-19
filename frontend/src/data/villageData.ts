import { VillageProfile, VillageProperty } from '../types.js';

export const initialVillageProfile: VillageProfile = {
  name: 'Izrafi',
  title: 'AI-focused Full-Stack Developer',
  quote: "Actions speak louder than words, let's jump into my village.",
  bio: 'Computer Science student majoring in Artificial Intelligence, building full-stack applications with Python, FastAPI, React, PostgreSQL, NoSQL, Docker, and CI/CD. Interested in AI/ML integration, DSA, system design, and scalable software engineering.',
  location: 'Village Town Square • Connected Worldwide',
  contactEmail: 'izrafi.au@gmail.com',
  github: 'https://github.com/ibnaziarafi/',
  linkedin: 'https://www.linkedin.com/in/ibna-zia-rafi-4861962ba/',
  stats: {
    totalProjects: 6,
    activeDeployments: 5,
    techStackCount: 16,
    villagePlots: 6,
  },
};

export const villageProperties: VillageProperty[] = [
  {
    id: 'my-house',
    name: "Founder's Manor (My House)",
    subtitle: 'Rafi’s Study • Bio, Philosophy & Terminal Guide',
    buildingStyle: 'cottage',
    category: 'house',
    isHeadquarters: true,
    plotLabel: 'Plot #01',
    mapX: 490,
    mapY: 100,
    roadConnection: { x: 485, y: 225 },
    roofColor: '#eab308', // Golden thatch roof
    wallColor: '#e5e7eb', // Grey fortress stone
    accentColor: '#f59e0b',
    status: 'Live Production',
    shortDesc: 'The stone manor on the northern terrace. Contains Rafi’s background, engineering craft, and explorer guide.',
    fullDesc: 'Perched on the northern stone terrace overlooking the entire village, this two-story manor is where every project is conceived. Read my story, skills, development setup, and field guide to the interactive terminals.',
    techStack: ['Node.js', 'React', 'TypeScript', 'Tailwind CSS', 'System Architecture'],
    highlights: [
      'Over 5+ years creating high-scale web platforms and developer tooling',
      'Clean Code & Test-Driven Development enthusiast',
      'Strong focus on sub-second render performance and zero-jank animations',
      'Available for full-time engineering roles and strategic consulting'
    ],
    metrics: [
      { label: 'Engineering Craft', value: '5+ Years' },
      { label: 'Code Quality', value: '100% Typed' },
      { label: 'Village Residence', value: 'North Manor #1' }
    ],
    projectUrl: '#about-section',
    githubUrl: 'https://github.com',
    demoType: 'doc'
  },
  {
    id: 'smart-edtech-forge',
    name: 'Smart EdTech Forge',
    subtitle: 'AI Course Recommender & Future Market Predictor • In Planning',
    buildingStyle: 'workshop',
    category: 'ai',
    plotLabel: 'Plot #02',
    mapX: 715,
    mapY: 200,
    roadConnection: { x: 710, y: 295 },
    roofColor: '#dc2626', // Terracotta red shingle roof
    wallColor: '#d1d5db', // Grey forge stone
    accentColor: '#ef4444',
    status: 'In Planning Stage',
    shortDesc: 'The village forge. AI model engine recommending personalized course modules and study guides based on real-time market demands and sector forecasts.',
    fullDesc: 'Smart EdTech is an intelligent educational guidance platform currently in the planning stage. Its core AI model recommends customized course modules and personalized study guides dynamically tailored to each student’s current situation, while forecasting emerging job market trends and technological sector developments to ensure future-proof career readiness.',
    techStack: ['AI / LLM', 'Machine Learning', 'Market Predictive Analytics', 'Python', 'TypeScript', 'FastAPI', 'React'],
    highlights: [
      'AI-driven course module recommendation engine tailored to each learner’s current skill baseline',
      'Predictive machine learning algorithms forecasting industry labor market trends and emerging skill sectors',
      'Dynamic curriculum roadmap adjustments based on real-time hiring demands and skill shortages',
      'Comprehensive project roadmap currently in active system architecture and pipeline design'
    ],
    metrics: [
      { label: 'Project Status', value: 'Planning Stage' },
      { label: 'Core Engine', value: 'Market Predictor' },
      { label: 'Recommendations', value: 'Dynamic AI' }
    ],
    projectUrl: '#smart-edtech-roadmap',
    githubUrl: 'https://github.com',
    demoType: 'doc'
  },
  {
    id: 'college-guild-advisor',
    name: 'Olinda AI - Hobart College AI Chatbot',
    subtitle: 'Hobart College AI Chatbot • Courses, Enrolment & Pathways',
    buildingStyle: 'bakery',
    category: 'ai',
    plotLabel: 'Plot #03',
    mapX: 370,
    mapY: 245,
    roadConnection: { x: 365, y: 305 },
    roofColor: '#eab308', // Thatch gold roof
    wallColor: '#fef3c7', // Warm timber & stone
    accentColor: '#a855f7',
    status: 'Live Project',
    shortDesc: 'Olinda AI, a conversational assistant for Hobart College students, parents, and prospective students.',
    fullDesc: 'Olinda AI is an AI-powered chatbot built for Hobart College to help students, parents, and prospective students find reliable information about courses, enrolment, pathways, and other college-related questions. It uses Retrieval-Augmented Generation (RAG) with PostgreSQL and pgvector to retrieve relevant knowledge before generating a response. The Python and FastAPI backend integrates Groq and Gemini models with a fallback mechanism for service availability.',
    techStack: ['RAG', 'Vector Embeddings', 'PostgreSQL + pgvector', 'Python', 'FastAPI', 'Groq', 'Gemini'],
    highlights: [
      'Retrieval-Augmented Generation grounded in a curated Hobart College knowledge base',
      'Semantic search using vector embeddings with PostgreSQL and pgvector',
      'Groq and Gemini LLM integration with fallback architecture',
      'Prompt engineering and context management focused on reliable, grounded responses'
    ],
    metrics: [
      { label: 'Institution', value: 'Hobart College' },
      { label: 'Capabilities', value: 'ATAR, TCE & Courses' },
      { label: 'Knowledge Base', value: 'Grounded RAG' }
    ],
    projectUrl: 'https://olinda-ai.onrender.com/',
    githubUrl: 'https://github.com/ibnaziarafi/olinda-project',
    demoType: 'web'
  },
  {
    id: 'merchants-logistics-route-planner',
    name: 'Route Planner - Delivery Route Optimisation System',
    subtitle: 'Delivery Route Optimisation • Graph Algorithms & PDP Solvers',
    buildingStyle: 'greenhouse',
    category: 'fullstack',
    plotLabel: 'Plot #04',
    mapX: 405,
    mapY: 395,
    roadConnection: { x: 405, y: 460 },
    roofColor: '#eab308', // Golden thatched roof
    wallColor: '#e5e7eb', // Shop stone
    accentColor: '#8b5cf6', // Striped purple awning
    status: 'Live Production',
    shortDesc: 'A delivery route optimisation platform using Hobart road and location data, graph algorithms, and multiple PDP solvers.',
    fullDesc: 'Route Planner is a full-stack delivery route optimisation platform built to solve real-world pickup and delivery problems using Hobart road and location data. The Python and FastAPI backend combines graph algorithms, shortest-path calculations, and Pickup and Delivery Problem (PDP) solving while considering driver capacity, pickup locations, and drop-off relationships. It supports custom, OR-Tools, and PyVRP solver approaches for future performance benchmarking.',
    techStack: ['Python', 'FastAPI', 'Graph Algorithms', 'Dijkstra', 'A*', 'OR-Tools', 'PyVRP', 'Docker', 'CI/CD'],
    highlights: [
      'Weighted graph data structures with Dijkstra and A* pathfinding',
      'Pickup and Delivery Problem solving with driver capacity constraints',
      'Custom solver, OR-Tools, and PyVRP approaches for the same delivery scenarios',
      'Benchmarking foundation for speed, cost, solution quality, constraint satisfaction, and scalability'
    ],
    metrics: [
      { label: 'Routing Algorithms', value: 'Dijkstra, Heap, A*' },
      { label: 'Solution Methods', value: 'Scratch, OR-Tools, PyVRP' },
      { label: 'Live Deployment', value: 'routeplanner.rafistacks.dev' }
    ],
    projectUrl: 'https://routeplanner.rafistacks.dev/',
    githubUrl: 'https://github.com/ibnaziarafi/Route-planner',
    demoType: 'web'
  },
  {
    id: '2048-watch-cottage',
    name: '2048 Game',
    subtitle: 'Full-Stack Puzzle Game • DSA & Future AI Integration',
    buildingStyle: 'workshop',
    category: 'frontend',
    plotLabel: 'Plot #05',
    mapX: 138,
    mapY: 155,
    roadConnection: { x: 140, y: 215 },
    roofColor: '#eab308', // Yellow thatch roof
    wallColor: '#78350f', // Timber wood cottage
    accentColor: '#f97316',
    status: 'Built Game & ML Roadmap',
    shortDesc: 'A full-stack 2048 puzzle game demonstrating practical Data Structures & Algorithms concepts and AI/ML integration planning.',
    fullDesc: '2048 is a full-stack implementation of the classic puzzle game. The Python and FastAPI game engine uses a 4x4 2D list to represent the board, with matrix traversal, transposition, and tile-merging algorithms. A reusable row-processing algorithm powers all four directions. The React, TypeScript, and Vite frontend provides an interactive interface connected to the FastAPI backend. Each move processes the board in O(N^2) time and O(N^2) space, which is practically O(1) for a fixed board size.',
    techStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Vite', 'DSA', 'REST API'],
    highlights: [
      '2D array representation with matrix traversal and manipulation',
      'Matrix transposition and tile movement and merging algorithms',
      'Reusable row-processing algorithm for all four movement directions',
      'Future ML pipeline for player strategies, movement patterns, and effective move recommendations'
    ],
    metrics: [
      { label: 'Game Engine', value: '60 FPS Smooth' },
      { label: 'State Engine', value: 'Deterministic 4x4' },
      { label: 'Future AI', value: 'ML Move Learner' }
    ],
    projectUrl: 'https://2048.rafistacks.dev/',
    githubUrl: 'https://github.com/ibnaziarafi/2048-game',
    demoType: 'web'
  },
  {
    id: 'celestial-cottage',
    name: 'Celestial Cottage',
    subtitle: 'Reserved Innovation Plot • Future Project Coming Soon',
    buildingStyle: 'cottage',
    category: 'ai',
    plotLabel: 'Plot #06',
    mapX: 808,
    mapY: 415,
    roadConnection: { x: 795, y: 475 },
    roofColor: '#dc2626', // Red shingle roof
    wallColor: '#e5e7eb', // Stone base
    accentColor: '#8b5cf6',
    status: 'Reserved for Future Project',
    shortDesc: 'Cozy red-roofed cottage in the quiet southeastern grove. Reserved for Rafi’s upcoming innovative project.',
    fullDesc: 'Resting in the peaceful southeastern grove by the forest edge, Celestial Cottage is currently preserved as the dedicated plot for Rafi’s next major engineering endeavor. Keep an eye on this space as new architectures and tools land in the village!',
    techStack: ['System Architecture', 'Next-Gen Stack', 'AI / Web', 'Under Ideation'],
    highlights: [
      'Reserved village plot for Rafi’s upcoming software project and architecture case study',
      'Technical design and project scoping currently in active development',
      'Will feature live interactive terminal demonstrations and source code upon release',
      'Located in the scenic southeastern corner overlooking the village river'
    ],
    metrics: [
      { label: 'Plot Status', value: 'Reserved' },
      { label: 'Stage', value: 'Future Project' },
      { label: 'Location', value: 'Southeast Grove' }
    ],
    projectUrl: '#celestial-future-project',
    githubUrl: 'https://github.com',
    demoType: 'doc'
  }
];
