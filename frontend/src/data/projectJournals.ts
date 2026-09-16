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
    title: 'College Guild Advisor: Grounded Academic & Course Guide',
    subtitle: 'Architecting a conversational assistant for Hobart College students, parents, and academic counselors.',
    readTime: '5 min read',
    date: 'Live Project',
    category: 'Conversational AI & Education',
    synopsis: 'College Guild Advisor serves as a 24/7 intelligent advisor for Hobart College. It delivers instant, grounded answers regarding subject selection handbooks, Tasmanian Certificate of Education (TCE) credit pathways, and Australian Tertiary Admission Rank (ATAR) calculations.',
    problem: 'Navigating senior secondary education requirements, course prerequisite chains, and complex ATAR scoring rules can overwhelm students and parents, placing high administrative loads on academic guidance counselors during enrollment periods.',
    architecture: {
      title: 'Grounded Retrieval-Augmented Generation (RAG) Architecture',
      points: [
        'Curriculum Vector Index: High-fidelity embeddings of Hobart College course handbooks, subject guides, and academic policies.',
        'ATAR & TCE Rule Engine: Deterministic rule verification ensuring calculations adhere strictly to Tasmanian curriculum standards.',
        'Context-Aware Chat Orchestrator: Maintains multi-turn context across subject inquiries and graduation requirements.',
        'Guardrailed Generation: Enforces strict source attribution with citations to official Hobart College documentation.'
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
      'In academic advising, factual reliability and source citation are paramount over conversational flair.',
      'Grounded RAG combined with deterministic rule validation produces trusted student-facing assistants.',
      'Quick-action prompt chips accelerate student discovery for critical deadlines and course pathways.'
    ],
    metrics: [
      { label: 'Institution', value: 'Hobart College', detail: 'Customized for college guides & rules' },
      { label: 'Core Expertise', value: 'ATAR, TCE & Courses', detail: 'Course selection & credit pathways' },
      { label: 'Reliability', value: 'Source Grounded', detail: 'Zero hallucination on policy rules' }
    ]
  },

  '2048-watch-cottage': {
    id: '2048-watch-cottage',
    title: '2048 Game Engine & Machine Learning Move-Learning Roadmap',
    subtitle: 'Building a fluid 60 FPS matrix puzzle game with an AI roadmap that learns strategic play from human moves.',
    readTime: '5 min read',
    date: 'Active Project',
    category: 'Game Engine & Machine Learning',
    synopsis: 'A high-performance, responsive implementation of the classic 2048 sliding-tile puzzle game. Engineered with a deterministic board engine and an ambitious Machine Learning pipeline designed to observe player decision trajectories, evaluate move quality, and learn strategic play patterns from human games.',
    problem: 'Traditional game AI often relies on brute-force expectimax search trees that lack intuition. Creating an AI that understands human play style and can teach players optimal strategies requires learning from real move sequences.',
    architecture: {
      title: 'Deterministic Matrix Engine & ML Training Pipeline',
      points: [
        'Zero-Latency Matrix Engine: 4x4 bitboard representation enabling microsecond tile merge evaluations and collision checks.',
        'Hardware-Accelerated Motion: Fluid spring animations and swipe gesture recognition with 60 FPS visual smoothness.',
        'Move Telemetry Logger: Captures anonymized tile states, move directions, score deltas, and board entropy per turn.',
        'Machine Learning Roadmap: Reinforcement learning & imitation learning model trained on player games to suggest optimal moves.'
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
      'Decoupling game state evaluation from UI rendering is essential for both buttery framerates and future AI autoplay.',
      'Imitation learning from skilled players produces far more natural and educational advice than raw minimax search.',
      'Responsive touch handling requires immediate optimistic feedback with zero debounce lag.'
    ],
    metrics: [
      { label: 'Engine Framerate', value: '60 FPS', detail: 'Zero frame drops during rapid swipes' },
      { label: 'State Representation', value: 'Deterministic', detail: 'Bitboard-compatible 4x4 matrix' },
      { label: 'AI Integration', value: 'ML Move Learner', detail: 'Roadmap for player pattern training' }
    ]
  },

  'merchants-logistics-route-planner': {
    id: 'merchants-logistics-route-planner',
    title: "Merchant's Logistics & Route Planner: Solving the Pickup & Drop-off Problem (PDP)",
    subtitle: 'Benchmarking Dijkstra, Min-Heap Dijkstra, and A* Shortest Path Routing across Scratch, Google OR-Tools, and PyVRP.',
    readTime: '6 min read',
    date: 'Live Production',
    category: 'Operations Research & Optimization',
    synopsis: "Merchant's Logistics & Route Planner is a comprehensive vehicle routing optimization platform deployed live at routeplanner.rafistacks.dev. It tackles the mathematically rigorous Pickup and Drop-off Problem (PDP) with capacity, pairing, and precedence constraints, comparing 3 fundamental shortest path algorithms across 3 modern solution engines.",
    problem: 'The Pickup and Drop-off Problem (PDP) is an NP-hard combinatorial challenge where items must be collected from origins and delivered to specific destinations while respecting vehicle capacities, pairing rules, and minimizing total transit distance.',
    architecture: {
      title: 'Tri-Algorithm & Tri-Solver Optimization Framework',
      points: [
        '3 Shortest Path Algorithms: Classic Dijkstra, Priority Queue Min-Heap Dijkstra (O((V+E) log V)), and heuristic A* Search.',
        '3 Solution Methods: Custom algorithmic solver written from scratch, Google OR-Tools constraint programming, and PyVRP (Vehicle Routing Problem library).',
        'Precedence & Capacity Enforcer: Guarantees pickup locations are visited strictly before drop-offs without exceeding vehicle payload limits.',
        'Live Interactive Frontend: React + Leaflet map interface rendering route polylines, waypoint order, and optimization metrics.'
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
      'Min-Heap priority queues provide dramatic speedups over naive Dijkstra on sparse road network graphs.',
      'Google OR-Tools excels at handling complex multi-vehicle constraints, while PyVRP demonstrates incredible speed on pure VRP benchmarks.',
      'Writing solvers from scratch builds deep intuition for why specific heuristic relaxations succeed.'
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
