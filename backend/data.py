from typing import Any


initial_village_profile: dict[str, Any] = {
    "name": "Izrafi",
    "title": "AI-focused Full-Stack Developer",
    "quote": "Actions speak louder than words, let's jump into my village.",
    "bio": "Computer Science student majoring in Artificial Intelligence, building full-stack applications with Python, FastAPI, React, PostgreSQL, NoSQL, Docker, and CI/CD. Interested in AI/ML integration, DSA, system design, and scalable software engineering.",
    "location": "Village Town Square • Connected Worldwide",
    "contactEmail": "izrafi.au@gmail.com",
    "github": "https://github.com/ibnaziarafi/",
    "linkedin": "https://www.linkedin.com/in/ibna-zia-rafi-4861962ba/",
    "stats": {"totalProjects": 6, "activeDeployments": 5, "techStackCount": 16, "villagePlots": 6},
}


def property_item(
    id: str, name: str, subtitle: str, building_style: str, category: str,
    plot_label: str, map_x: int, map_y: int, road_x: int, road_y: int,
    roof_color: str, wall_color: str, accent_color: str, status: str,
    short_desc: str, full_desc: str, tech_stack: list[str], highlights: list[str],
    metrics: list[dict[str, str]], project_url: str, demo_type: str,
    headquarters: bool = False,
    github_url: str = "https://github.com",
) -> dict[str, Any]:
    return {
        "id": id, "name": name, "subtitle": subtitle,
        "buildingStyle": building_style, "category": category,
        "isHeadquarters": headquarters, "plotLabel": plot_label,
        "mapX": map_x, "mapY": map_y,
        "roadConnection": {"x": road_x, "y": road_y},
        "roofColor": roof_color, "wallColor": wall_color, "accentColor": accent_color,
        "status": status, "shortDesc": short_desc, "fullDesc": full_desc,
        "techStack": tech_stack, "highlights": highlights, "metrics": metrics,
        "projectUrl": project_url, "githubUrl": github_url, "demoType": demo_type,
    }


village_properties: list[dict[str, Any]] = [
    property_item(
        "my-house", "Founder's Manor (My House)", "Rafi's Study • Bio, Philosophy & Terminal Guide", "cottage", "house",
        "Plot #01", 490, 100, 485, 225, "#eab308", "#e5e7eb", "#f59e0b", "Live Production",
        "The stone manor on the northern terrace. Contains Rafi's background, engineering craft, and explorer guide.",
        "Perched on the northern stone terrace overlooking the entire village, this two-story manor is where every project is conceived. Read my story, skills, development setup, and field guide to the interactive terminals.",
        ["Node.js", "React", "TypeScript", "Tailwind CSS", "System Architecture"],
        ["Over 5+ years creating high-scale web platforms and developer tooling", "Clean Code & Test-Driven Development enthusiast", "Strong focus on sub-second render performance and zero-jank animations", "Available for full-time engineering roles and strategic consulting"],
        [{"label": "Engineering Craft", "value": "5+ Years"}, {"label": "Code Quality", "value": "100% Typed"}, {"label": "Village Residence", "value": "North Manor #1"}],
        "#about-section", "doc", True,
    ),
    property_item(
        "smart-edtech-forge", "Smart EdTech Forge", "AI Course Recommender & Future Market Predictor • In Planning", "workshop", "ai",
        "Plot #02", 715, 200, 710, 295, "#dc2626", "#d1d5db", "#ef4444", "In Planning Stage",
        "The village forge. AI model engine recommending personalized course modules and study guides based on real-time market demands and sector forecasts.",
        "Smart EdTech is an intelligent educational guidance platform currently in the planning stage. Its core AI model recommends customized course modules and personalized study guides dynamically tailored to each student's current situation, while forecasting emerging job market trends and technological sector developments to ensure future-proof career readiness.",
        ["AI / LLM", "Machine Learning", "Market Predictive Analytics", "Python", "TypeScript", "FastAPI", "React"],
        ["AI-driven course module recommendation engine tailored to each learner's current skill baseline", "Predictive machine learning algorithms forecasting industry labor market trends and emerging skill sectors", "Dynamic curriculum roadmap adjustments based on real-time hiring demands and skill shortages", "Comprehensive project roadmap currently in active system architecture and pipeline design"],
        [{"label": "Project Status", "value": "Planning Stage"}, {"label": "Core Engine", "value": "Market Predictor"}, {"label": "Recommendations", "value": "Dynamic AI"}],
        "#smart-edtech-roadmap", "doc",
    ),
    property_item(
        "college-guild-advisor", "Olinda AI - Hobart College AI Chatbot", "Hobart College AI Chatbot • Courses, Enrolment & Pathways", "bakery", "ai",
        "Plot #03", 370, 245, 365, 305, "#eab308", "#fef3c7", "#a855f7", "Live Project",
        "Olinda AI, a conversational assistant for Hobart College students, parents, and prospective students.",
        "Olinda AI is an AI-powered chatbot built for Hobart College to help students, parents, and prospective students find reliable information about courses, enrolment, pathways, and other college-related questions. It uses Retrieval-Augmented Generation (RAG) with PostgreSQL and pgvector to retrieve relevant knowledge before generating a response. The Python and FastAPI backend integrates Groq and Gemini models with a fallback mechanism for service availability.",
        ["RAG", "Vector Embeddings", "PostgreSQL + pgvector", "Python", "FastAPI", "Groq", "Gemini"],
        ["Retrieval-Augmented Generation grounded in a curated Hobart College knowledge base", "Semantic search using vector embeddings with PostgreSQL and pgvector", "Groq and Gemini LLM integration with fallback architecture", "Prompt engineering and context management focused on reliable, grounded responses"],
        [{"label": "Institution", "value": "Hobart College"}, {"label": "Capabilities", "value": "ATAR, TCE & Courses"}, {"label": "Knowledge Base", "value": "Grounded RAG"}],
        "https://olinda-ai.onrender.com/", "web",
    ),
    property_item(
        "merchants-logistics-route-planner", "Route Planner - Delivery Route Optimisation System", "Delivery Route Optimisation • Graph Algorithms & PDP Solvers", "greenhouse", "fullstack",
        "Plot #04", 405, 395, 405, 460, "#eab308", "#e5e7eb", "#8b5cf6", "Live Production",
        "A delivery route optimisation platform using Hobart road and location data, graph algorithms, and multiple PDP solvers.",
        "Route Planner is a full-stack delivery route optimisation platform built to solve real-world pickup and delivery problems using Hobart road and location data. The Python and FastAPI backend combines graph algorithms, shortest-path calculations, and Pickup and Delivery Problem (PDP) solving while considering driver capacity, pickup locations, and drop-off relationships. It supports custom, OR-Tools, and PyVRP solver approaches for future performance benchmarking.",
        ["Python", "FastAPI", "Graph Algorithms", "Dijkstra", "A*", "OR-Tools", "PyVRP", "Docker", "CI/CD"],
        ["Weighted graph data structures with Dijkstra and A* pathfinding", "Pickup and Delivery Problem solving with driver capacity constraints", "Custom solver, OR-Tools, and PyVRP approaches for the same delivery scenarios", "Benchmarking foundation for speed, cost, solution quality, constraint satisfaction, and scalability"],
        [{"label": "Routing Algorithms", "value": "Dijkstra, Heap, A*"}, {"label": "Solution Methods", "value": "Scratch, OR-Tools, PyVRP"}, {"label": "Live Deployment", "value": "routeplanner.rafistacks.dev"}],
        "https://routeplanner.rafistacks.dev/", "web",
        github_url="https://github.com/ibnaziarafi/Route-planner",
    ),
    property_item(
        "2048-watch-cottage", "2048 Game", "Full-Stack Puzzle Game • DSA & Future AI Integration", "workshop", "frontend",
        "Plot #05", 138, 155, 140, 215, "#eab308", "#78350f", "#f97316", "Built Game & ML Roadmap",
        "A full-stack 2048 puzzle game demonstrating practical Data Structures & Algorithms concepts and AI/ML integration planning.",
        "2048 is a full-stack implementation of the classic puzzle game. The Python and FastAPI game engine uses a 4x4 2D list to represent the board, with matrix traversal, transposition, and tile-merging algorithms. A reusable row-processing algorithm powers all four directions. The React, TypeScript, and Vite frontend provides an interactive interface connected to the FastAPI backend. Each move processes the board in O(N^2) time and O(N^2) space, which is practically O(1) for a fixed board size.",
        ["Python", "FastAPI", "React", "TypeScript", "Vite", "DSA", "REST API"],
        ["2D array representation with matrix traversal and manipulation", "Matrix transposition and tile movement and merging algorithms", "Reusable row-processing algorithm for all four movement directions", "Future ML pipeline for player strategies, movement patterns, and effective move recommendations"],
        [{"label": "Game Engine", "value": "60 FPS Smooth"}, {"label": "State Engine", "value": "Deterministic 4x4"}, {"label": "Future AI", "value": "ML Move Learner"}],
        "https://2048.rafistacks.dev/", "web",
        github_url="https://github.com/ibnaziarafi/2048-game",
    ),
    property_item(
        "celestial-cottage", "Celestial Cottage", "Reserved Innovation Plot • Future Project Coming Soon", "cottage", "ai",
        "Plot #06", 808, 415, 795, 475, "#dc2626", "#e5e7eb", "#8b5cf6", "Reserved for Future Project",
        "Cozy red-roofed cottage in the quiet southeastern grove. Reserved for Rafi's upcoming innovative project.",
        "Resting in the peaceful southeastern grove by the forest edge, Celestial Cottage is currently preserved as the dedicated plot for Rafi's next major engineering endeavor. Keep an eye on this space as new architectures and tools land in the village!",
        ["System Architecture", "Next-Gen Stack", "AI / Web", "Under Ideation"],
        ["Reserved village plot for Rafi's upcoming software project and architecture case study", "Technical design and project scoping currently in active development", "Will feature live interactive terminal demonstrations and source code upon release", "Located in the scenic southeastern corner overlooking the village river"],
        [{"label": "Plot Status", "value": "Reserved"}, {"label": "Stage", "value": "Future Project"}, {"label": "Location", "value": "Southeast Grove"}],
        "#celestial-future-project", "doc",
    ),
]
