export type PropertyCategory = 'house' | 'fullstack' | 'frontend' | 'ai' | 'tools' | 'mobile';

export type BuildingStyle = 
  | 'cottage'      // My House / Headquarters
  | 'lighthouse'   // Data / Analytics / Observability
  | 'bakery'       // Full-Stack SaaS / Community
  | 'workshop'     // Developer Tools & Open Source Forge
  | 'observatory'  // AI & Machine Learning Lab
  | 'greenhouse'   // Mobile & Design Systems
  | 'windmill';    // Automation & Cloud Infrastructure

export interface VillageProperty {
  id: string;
  name: string;
  subtitle: string;
  buildingStyle: BuildingStyle;
  category: PropertyCategory;
  isHeadquarters?: boolean;
  plotLabel: string;
  // Position on SVG map canvas (viewBox 0 0 1000 650)
  mapX: number;
  mapY: number;
  roadConnection: { x: number; y: number }; // point where pathway connects to main road
  roofColor: string;
  wallColor: string;
  accentColor: string;
  status: 
    | 'Live Production' 
    | 'Featured Project' 
    | 'Open Source' 
    | 'Under Active Construction'
    | 'In Planning Stage'
    | 'Live Project'
    | 'Built Game & ML Roadmap'
    | 'Reserved for Future Project'
    | string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  projectUrl: string;
  githubUrl: string;
  demoType: 'web' | 'cli' | 'app' | 'doc';
}

export interface VillageProfile {
  name: string;
  title: string;
  quote: string;
  bio: string;
  location: string;
  contactEmail: string;
  github: string;
  linkedin: string;
  stats: {
    totalProjects: number;
    activeDeployments: number;
    techStackCount: number;
    villagePlots: number;
    villageVisitors?: number;
  };
}
