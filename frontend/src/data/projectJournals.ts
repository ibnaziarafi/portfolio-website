export interface ProjectJournal {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  category: string;
  synopsis: string;
  problem: string;
  architecture: {
    title: string;
    points: string[];
  };
  challenges: {
    hurdle: string;
    resolution: string;
  }[];
  keyLearnings: string[];
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const projectJournals: Record<string, ProjectJournal> = {
  'smart-edtech-forge': {
    id: 'smart-edtech-forge',
    title: 'Smart EdTech: AI Course Recommender & Market Demand Predictor',
    subtitle: 'Designing an intelligent curriculum engine that forecasts industry skill trends and personalizes student learning guides.',
    readTime: '5 min read',
    date: 'Planning Stage',
    category: 'EdTech & Predictive AI',
    synopsis: 'Smart EdTech is an AI-driven learning intelligence platform currently in its architectural planning phase. By merging predictive labor market analysis with dynamic student profiling, it generates adaptive study modules and guides designed to maximize career readiness in rapidly evolving sectors.',
    problem: 'Traditional educational curricula are static and often lag years behind real-world technological and industrial shifts. Students frequently invest time in outdated material without clear visibility into emerging market demands, causing significant post-graduation skill mismatches.',
    architecture: {
      title: 'Predictive Curriculum & Adaptive Recommendation Pipeline',
      points: [
        'Market Intelligence Engine: Scrapes and analyzes job requisitions, sector growth indicators, and technical skill frequencies.',
        'Predictive Labor Forecaster: Time-series ML model forecasting skill obsolescence and high-demand competencies 2–5 years ahead.',
        'Adaptive Module Generator: Dynamically sequences prerequisite topics and micro-courses based on learner diagnostic baselines.',
        'Continuous Feedback Loop: Refines student learning pathways as sector demands and individual progress metrics evolve.'
      ]
    },
    challenges: [
      {
        hurdle: 'Normalizing noisy and fragmented job market taxonomies across different international industries.',
        resolution: 'Designing a standardized ontological graph mapping skills, competencies, and role definitions into unified vector embeddings.'
      },
      {
        hurdle: 'Balancing foundational academic concepts with rapidly moving applied industry tools in recommendation trees.',
        resolution: 'Implementing a dual-layer curriculum graph: core evergreen concepts form an immutable base, while applied modules dynamically update.'
      }
    ],
    keyLearnings: [
      'Personalized education requires deep grounding in market reality, not just academic checklists.',
      'Predictive trend modeling must account for regional variations in industrial hiring patterns.',
      'Curriculum modularity is key: micro-credentials allow students to pivot as markets evolve.'
    ],
    metrics: [
      { label: 'Project Status', value: 'Planning Stage', detail: 'System architecture & roadmap drafting' },
      { label: 'Core AI Target', value: 'Predictive ML', detail: 'Sector forecasting & module matching' },
      { label: 'Curriculum Model', value: 'Dynamic & Graph-Based', detail: 'Personalized to learner gaps' }
    ]
  },

  'college-guild-advisor': {
    id: 'college-guild-advisor',
    title: 'Olinda AI - Hobart College AI Chatbot',
    subtitle: 'An AI-powered assistant for reliable information about courses, enrolment, pathways, and college questions.',
    readTime: '5 min read',
    date: 'Live Project',
    category: 'RAG & Conversational AI',
    synopsis: 'Olinda AI helps Hobart College students, parents, and prospective students find reliable answers using a curated knowledge base and Retrieval-Augmented Generation (RAG).',
    problem: 'College-related questions require reliable, current information about courses, enrolment, pathways, and other college processes rather than answers based only on an LLM internal knowledge.',
    architecture: {
      title: 'Retrieval-Augmented Generation with Vector Search',
      points: [
        'Curated Knowledge Base: College information is prepared for retrieval rather than relying only on model memory.',
        'Semantic Search: PostgreSQL with pgvector retrieves relevant context using vector embeddings.',
        'FastAPI Workflow: Python and FastAPI manage retrieval, prompt construction, and response generation.',
        'Fallback Architecture: Groq and Gemini models provide service continuity when the primary model encounters an issue.'
      ]
    },
    challenges: [
      {
        hurdle: 'Preventing LLM hallucinations regarding official ATAR prerequisite requirements and credit calculations.',
        resolution: 'Integrated deterministic validator rules on top of RAG retrieval; unverified claims are blocked before response delivery.'
      },
      {
        hurdle: 'Addressing wide variations in user query terminology between new year 10 entrants, senior students, and parents.',
        resolution: 'Trained semantic synonym mappings linking everyday colloquial terms to official TCE/TASC educational nomenclature.'
      }
    ],
    keyLearnings: [
      'Grounded RAG reduces hallucinations by giving the model relevant, curated context.',
      'Vector search and prompt engineering are central to producing useful college-related answers.',
      'Fallback LLM architecture improves service availability for student-facing applications.'
    ],
    metrics: [
      { label: 'Institution', value: 'Hobart College', detail: 'Customized for college guides & rules' },
      { label: 'Core Expertise', value: 'ATAR, TCE & Courses', detail: 'Course selection & credit pathways' },
      { label: 'Reliability', value: 'Source Grounded', detail: 'Zero hallucination on policy rules' }
    ]
  },

  '2048-watch-cottage': {
    id: '2048-watch-cottage',
    title: '2048 Game',
    subtitle: 'A full-stack implementation demonstrating practical Data Structures & Algorithms and future AI integration.',
    readTime: '5 min read',
    date: 'Active Project',
    category: 'DSA & AI/ML Integration',
    synopsis: 'A full-stack 2048 puzzle game built with a Python and FastAPI engine and a React, TypeScript, and Vite frontend.',
    problem: 'The project demonstrates how matrix traversal, transposition, and reusable tile-merging algorithms can power all four game directions without duplicated movement logic.',
    architecture: {
      title: '4x4 Matrix Game Engine & AI Roadmap',
      points: [
        'Board Representation: A 4x4 2D list represents the game board.',
        'Matrix Algorithms: Traversal, transposition, movement, and tile merging handle every direction.',
        'Reusable Processing: One row-processing algorithm reduces duplicated logic across four moves.',
        'Future AI Integration: Gameplay data will support models that identify strategies and recommend effective moves.'
      ]
    },
    challenges: [
      {
        hurdle: 'Animating merged and newly spawned tiles smoothly without desynchronizing the underlying state matrix.',
        resolution: 'Separated unique tile entity IDs from grid coordinates, using persistent keys that smoothly interpolate across merges.'
      },
      {
        hurdle: 'Designing an ML representation that generalizes well across board symmetries (rotations and reflections).',
        resolution: 'Architecting data augmentation that applies 8-fold dihedral symmetry (D4 group) to player move trajectories.'
      }
    ],
    keyLearnings: [
      'A reusable row algorithm keeps movement behavior consistent across all directions.',
      'Fixed board dimensions make each move practically O(1), even though the general algorithm is O(N^2).',
      'Gameplay telemetry can provide a foundation for future machine learning and move recommendation features.'
    ],
    metrics: [
      { label: 'Engine Framerate', value: '60 FPS', detail: 'Zero frame drops during rapid swipes' },
      { label: 'State Representation', value: 'Deterministic', detail: 'Bitboard-compatible 4x4 matrix' },
      { label: 'AI Integration', value: 'ML Move Learner', detail: 'Roadmap for player pattern training' }
    ]
  },

  'merchants-logistics-route-planner': {
    id: 'merchants-logistics-route-planner',
    title: 'Route Planner - Delivery Route Optimisation System',
    subtitle: 'Optimising pickup and delivery routes with Hobart road data, graph algorithms, and multiple solver approaches.',
    readTime: '6 min read',
    date: 'Live Production',
    category: 'Route Optimisation & Full Stack',
    synopsis: 'Route Planner is a full-stack delivery route optimisation platform using real-world Hobart road and location data to solve pickup and delivery scenarios.',
    problem: 'Delivery planning must respect driver capacity, pickup locations, drop-off relationships, route distance, and other constraints while producing efficient routes.',
    architecture: {
      title: 'Graph Routing & Multi-Solver Framework',
      points: [
        'Graph Algorithms: Weighted graphs, Dijkstra shortest paths, and A* pathfinding operate on Hobart map data.',
        'Pickup and Delivery Problem: Routes account for driver capacity and pickup/drop-off relationships.',
        'Three Solvers: A custom solver, OR-Tools, and PyVRP solve the same delivery scenarios.',
        'Deployment Foundation: Docker, Vercel, and CI/CD support the full-stack application.'
      ]
    },
    challenges: [
      {
        hurdle: 'Preventing state-space explosion on dense multi-stop PDP graphs with tight precedence constraints.',
        resolution: 'Implemented A* with admissible Euclidean and Manhattan distance heuristics to prune unpromising branch paths.'
      },
      {
        hurdle: 'Bridging algorithmic performance comparisons across three fundamentally different solver architectures.',
        resolution: 'Constructed an automated benchmarking testbed evaluating execution runtime, path optimality, and memory consumption across identical topologies.'
      }
    ],
    keyLearnings: [
      'Comparing multiple solvers creates a measurable basis for future performance benchmarking.',
      'Route quality must be evaluated alongside speed, cost, constraints, and scalability.',
      'Combining DSA, optimisation, deployment, and AI/ML creates a strong foundation for an experimental logistics platform.'
    ],
    metrics: [
      { label: 'Routing Algorithms', value: 'Dijkstra, Heap, A*', detail: '3 shortest path formulations' },
      { label: 'Solution Engines', value: 'Scratch, OR-Tools, PyVRP', detail: '3 distinct solver implementations' },
      { label: 'Live Deployment', value: 'routeplanner.rafistacks.dev', detail: 'Full production web application' }
    ]
  },

  'celestial-cottage': {
    id: 'celestial-cottage',
    title: 'Celestial Cottage: Dedicated Plot for Future Innovations',
    subtitle: 'Preserving a scenic southeastern plot in the village for Rafi’s upcoming engineering project.',
    readTime: '2 min read',
    date: 'Future Project',
    category: 'Village Reserve & Ideation',
    synopsis: 'Nestled in the tranquil southeastern grove along the village riverbank, Celestial Cottage is held in reserve for Rafi’s next engineering project and case study. Technical scoping and architecture planning are currently underway.',
    problem: 'Great engineering projects require dedicated space for experimentation, prototyping, and rigorous design before being unveiled to the world.',
    architecture: {
      title: 'Future Project Staging Ground',
      points: [
        'Architectural Scoping: Currently evaluating candidate problems across distributed systems, AI, and developer tools.',
        'Interactive Village Integration: Will feature full terminal command integration, live demonstration, and interactive case study.',
        'Open-Source Companion: Codebase and documentation will be released alongside the interactive village plot.'
      ]
    },
    challenges: [
      {
        hurdle: 'Selecting the most impactful engineering challenge for the next village expansion.',
        resolution: 'Evaluating real-world utility, architectural depth, and performance benchmarks to select the optimal project.'
      }
    ],
    keyLearnings: [
      'Deliberate planning and scoping prevent technical debt before writing the first line of code.',
      'A great portfolio evolves continuously with active projects, live tools, and dedicated future horizons.'
    ],
    metrics: [
      { label: 'Plot Status', value: 'Reserved', detail: 'Held for upcoming project' },
      { label: 'Location', value: 'Southeast Grove', detail: 'Plot #06 beside village river' },
      { label: 'Next Phase', value: 'Architecture & Ideation', detail: 'In active planning' }
    ]
  }
};
