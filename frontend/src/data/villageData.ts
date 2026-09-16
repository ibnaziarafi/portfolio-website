import { VillageProfile, VillageProperty } from '../types.js';

export const initialVillageProfile: VillageProfile = {
  name: 'Izrafi',
  title: 'Full-Stack Software Engineer & Digital Craftsman',
  quote: "Actions speak louder than words, let's jump into my village.",
  bio: 'Passionate about building resilient, delightfully fast web applications, distributed systems, and intuitive user experiences. Stroll through the village plots below to inspect my projects, codebases, and architectural decisions.',
  location: 'Village Town Square • Connected Worldwide',
  contactEmail: 'izrafi.au@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
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
    name: 'College Guild Advisor',
    subtitle: 'Smart AI Academic Advisor • Courses Guide, ATAR & TCE Pathways',
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
    shortDesc: 'Two-story timber guild tavern. Smart conversational AI chatbot answering student and parent queries on Hobart College course guides, ATAR, and TCE pathways.',
    fullDesc: 'College Guild Advisor is a dedicated intelligent conversational assistant built for Hobart College students, parents, and academic counselors. It delivers instant, grounded answers regarding senior secondary course selection guides, Tasmanian Certificate of Education (TCE) subject credits, and Australian Tertiary Admission Rank (ATAR) calculation rules.',
    techStack: ['Gemini / LLM', 'RAG Architecture', 'Vector Search', 'Python', 'TypeScript', 'Tailwind CSS'],
    highlights: [
      'Specialized academic RAG knowledge base indexed on official Hobart College course guidebooks',
      'Authoritative advice on ATAR calculation criteria, scaled score projections, and TCE credit requirements',
      'Multi-turn conversational context with zero hallucination via grounded citation sources',
      'Intuitive student-friendly chat interface with pre-built prompt chips for swift academic guidance'
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
    name: "Merchant's Logistics & Route Planner",
    subtitle: 'Pickup & Drop-off Problem (PDP) • Dijkstra, Min-Heap & A* Optimization',
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
    shortDesc: "Two-story merchant shop. Interactive logistics & route planner solving the Pickup & Drop-Off Problem using Dijkstra, Min-Heap, A*, Google OR-Tools, and PyVRP.",
    fullDesc: 'A high-performance vehicle routing optimization and route planning platform deployed live at routeplanner.rafistacks.dev. It solves the complex Pickup and Drop-off Problem (PDP) with multi-stop capacity and precedence constraints using 3 shortest routing algorithms (Dijkstra, Dijkstra with Min-Heap, and A* Search) benchmarked across 3 distinct solution methods: custom implementation from scratch, Google OR-Tools constraint suite, and PyVRP.',
    techStack: ['Python', 'Dijkstra & Min-Heap', 'A* Search', 'Google OR-Tools', 'PyVRP', 'FastAPI', 'React', 'Leaflet'],
    highlights: [
      'Solves the vehicle Pickup & Drop-off Problem (PDP) with vehicle capacity and stop precedence constraints',
      'Implemented and evaluated 3 shortest routing algorithms: classic Dijkstra, Dijkstra with Min-Heap, and A* Search',
      'Benchmarked across 3 solution methods: algorithmic from scratch, Google OR-Tools suite, and PyVRP',
      'Live interactive application with real-time route pathfinding deployed at routeplanner.rafistacks.dev'
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
    name: 'The 2048 Watch Cottage',
    subtitle: 'Sliding Tile Puzzle • Machine Learning Move-Prediction Roadmap',
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
    shortDesc: 'Timber cottage by the western wall and archery targets. Built 2048 puzzle game with future ML model integration that learns from human player moves.',
    fullDesc: 'A slick, responsive implementation of the classic 2048 sliding-tile puzzle game with smooth grid motion and state persistence. Features an ambitious machine learning integration roadmap: an ML model designed to observe player decision sequences, evaluate optimal tile merges, and continuously learn strategic gameplay from human moves in real time.',
    techStack: ['TypeScript', 'React', 'Motion', 'Matrix State Machine', 'Machine Learning (Planned)', 'Local Storage'],
    highlights: [
      'Fluid sliding tile animations with touch swipe gestures and responsive keyboard controls',
      'Deterministic 4x4 matrix game engine with score calculation, tile merging, and game-over detection',
      'Machine Learning roadmap: Reinforcement learning & move-prediction model trained on human play styles',
      'Decoupled game engine state facilitating automated AI evaluation and optimal move recommendations'
    ],
    metrics: [
      { label: 'Game Engine', value: '60 FPS Smooth' },
      { label: 'State Engine', value: 'Deterministic 4x4' },
      { label: 'Future AI', value: 'ML Move Learner' }
    ],
    projectUrl: 'https://github.com',
    githubUrl: 'https://github.com',
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
