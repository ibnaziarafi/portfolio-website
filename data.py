from typing import Any


initial_village_profile: dict[str, Any] = {
    "name": "Izrafi",
    "title": "Full-Stack Software Engineer & Digital Craftsman",
    "quote": "Actions speak louder than words, let's jump into my village.",
    "bio": "Passionate about building resilient, delightfully fast web applications, distributed systems, and intuitive user experiences. Stroll through the village plots below to inspect my projects, codebases, and architectural decisions.",
    "location": "Village Town Square • Connected Worldwide",
    "contactEmail": "izrafi.au@gmail.com",
    "github": "https://github.com",
    "linkedin": "https://linkedin.com",
    "stats": {"totalProjects": 6, "activeDeployments": 5, "techStackCount": 16, "villagePlots": 6},
}


def property_item(
    id: str, name: str, subtitle: str, building_style: str, category: str,
    plot_label: str, map_x: int, map_y: int, road_x: int, road_y: int,
    roof_color: str, wall_color: str, accent_color: str, status: str,
    short_desc: str, full_desc: str, tech_stack: list[str], highlights: list[str],
    metrics: list[dict[str, str]], project_url: str, demo_type: str,
    headquarters: bool = False,
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
        "projectUrl": project_url, "githubUrl": "https://github.com", "demoType": demo_type,
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
        "college-guild-advisor", "College Guild Advisor", "Smart AI Academic Advisor • Courses Guide, ATAR & TCE Pathways", "bakery", "ai",
        "Plot #03", 370, 245, 365, 305, "#eab308", "#fef3c7", "#a855f7", "Live Project",
        "Two-story timber guild tavern. Smart conversational AI chatbot answering student and parent queries on Hobart College course guides, ATAR, and TCE pathways.",
        "College Guild Advisor is a dedicated intelligent conversational assistant built for Hobart College students, parents, and academic counselors. It delivers instant, grounded answers regarding senior secondary course selection guides, Tasmanian Certificate of Education (TCE) subject credits, and Australian Tertiary Admission Rank (ATAR) calculation rules.",
        ["Gemini / LLM", "RAG Architecture", "Vector Search", "Python", "TypeScript", "Tailwind CSS"],
        ["Specialized academic RAG knowledge base indexed on official Hobart College course guidebooks", "Authoritative advice on ATAR calculation criteria, scaled score projections, and TCE credit requirements", "Multi-turn conversational context with zero hallucination via grounded citation sources", "Intuitive student-friendly chat interface with pre-built prompt chips for swift academic guidance"],
        [{"label": "Institution", "value": "Hobart College"}, {"label": "Capabilities", "value": "ATAR, TCE & Courses"}, {"label": "Knowledge Base", "value": "Grounded RAG"}],
        "https://routeplanner.rafistacks.dev/", "web",
    ),
    property_item(
        "merchants-logistics-route-planner", "Merchant's Logistics & Route Planner", "Pickup & Drop-off Problem (PDP) • Dijkstra, Min-Heap & A* Optimization", "greenhouse", "fullstack",
        "Plot #04", 405, 395, 405, 460, "#eab308", "#e5e7eb", "#8b5cf6", "Live Production",
        "Two-story merchant shop. Interactive logistics & route planner solving the Pickup & Drop-Off Problem using Dijkstra, Min-Heap, A*, Google OR-Tools, and PyVRP.",
        "A high-performance vehicle routing optimization and route planning platform deployed live at routeplanner.rafistacks.dev. It solves the complex Pickup and Drop-off Problem (PDP) with multi-stop capacity and precedence constraints using 3 shortest routing algorithms (Dijkstra, Dijkstra with Min-Heap, and A* Search) benchmarked across 3 distinct solution methods: custom implementation from scratch, Google OR-Tools constraint suite, and PyVRP.",
        ["Python", "Dijkstra & Min-Heap", "A* Search", "Google OR-Tools", "PyVRP", "FastAPI", "React", "Leaflet"],
        ["Solves the vehicle Pickup & Drop-off Problem (PDP) with vehicle capacity and stop precedence constraints", "Implemented and evaluated 3 shortest routing algorithms: classic Dijkstra, Dijkstra with Min-Heap, and A* Search", "Benchmarked across 3 solution methods: algorithmic from scratch, Google OR-Tools suite, and PyVRP", "Live interactive application with real-time route pathfinding deployed at routeplanner.rafistacks.dev"],
        [{"label": "Routing Algorithms", "value": "Dijkstra, Heap, A*"}, {"label": "Solution Methods", "value": "Scratch, OR-Tools, PyVRP"}, {"label": "Live Deployment", "value": "routeplanner.rafistacks.dev"}],
        "https://routeplanner.rafistacks.dev/", "web",
    ),
    property_item(
        "2048-watch-cottage", "The 2048 Watch Cottage", "Sliding Tile Puzzle • Machine Learning Move-Prediction Roadmap", "workshop", "frontend",
        "Plot #05", 138, 155, 140, 215, "#eab308", "#78350f", "#f97316", "Built Game & ML Roadmap",
        "Timber cottage by the western wall and archery targets. Built 2048 puzzle game with future ML model integration that learns from human player moves.",
        "A slick, responsive implementation of the classic 2048 sliding-tile puzzle game with smooth grid motion and state persistence. Features an ambitious machine learning integration roadmap: an ML model designed to observe player decision sequences, evaluate optimal tile merges, and continuously learn strategic gameplay from human moves in real time.",
        ["TypeScript", "React", "Motion", "Matrix State Machine", "Machine Learning (Planned)", "Local Storage"],
        ["Fluid sliding tile animations with touch swipe gestures and responsive keyboard controls", "Deterministic 4x4 matrix game engine with score calculation, tile merging, and game-over detection", "Machine Learning roadmap: Reinforcement learning & move-prediction model trained on human play styles", "Decoupled game engine state facilitating automated AI evaluation and optimal move recommendations"],
        [{"label": "Game Engine", "value": "60 FPS Smooth"}, {"label": "State Engine", "value": "Deterministic 4x4"}, {"label": "Future AI", "value": "ML Move Learner"}],
        "https://github.com", "web",
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
