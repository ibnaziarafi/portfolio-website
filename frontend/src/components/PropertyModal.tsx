import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Terminal, 
  ArrowUpRight, 
  Github, 
  Maximize2, 
  Minimize2,
  ChevronRight,
  Sparkles,
  Play,
  BookOpen
} from 'lucide-react';
import { VillageProperty } from '../types';
import { playVillageChime } from '../utils/audio';

interface PropertyModalProps {
  property: VillageProperty | null;
  allProperties: VillageProperty[];
  onClose: () => void;
  onNavigate: (property: VillageProperty) => void;
  onOpenJournal?: (property: VillageProperty) => void;
}

interface TerminalHistoryItem {
  type: 'command' | 'stdout' | 'error' | 'launch';
  content: string | React.ReactNode;
}

const getProjectPackageJson = (prop: VillageProperty): string => {
  switch (prop.id) {
    case 'merchants-logistics-route-planner':
      return `{
  "name": "merchants-logistics-route-planner",
  "version": "1.2.0",
  "description": "Pickup & Drop-off Problem (PDP) Solver with Dijkstra, Min-Heap, A*, OR-Tools, and PyVRP",
  "scripts": {
    "start": "uvicorn main:app --reload",
    "benchmark": "python -m benchmark.run_pdp",
    "build": "vite build"
  },
  "dependencies": {
    "ortools": "^9.8.3296",
    "pyvrp": "^0.8.0",
    "fastapi": "^0.110.0",
    "leaflet": "^1.9.4",
    "react": "^18.3.1"
  }
}`;
    case 'college-guild-advisor':
      return `{
  "name": "college-guild-advisor",
  "version": "1.1.0",
  "description": "Hobart College AI Academic Advisor • Courses Guide, ATAR & TCE Assistant",
  "scripts": {
    "start": "python server.py",
    "index-handbook": "python ingest_courses.py",
    "dev": "vite dev"
  },
  "dependencies": {
    "chromadb": "^0.4.22",
    "fastapi": "^0.110.0",
    "react": "^18.3.1"
  }
}`;
    case 'smart-edtech-forge':
      return `{
  "name": "smart-edtech-forge",
  "version": "0.1.0-alpha",
  "description": "AI Course Recommender & Future Labor Market Predictor (Planning Stage)",
  "scripts": {
    "spec": "cat docs/SPEC.md",
    "forecast": "python -m pipeline.forecast"
  },
  "dependencies": {
    "scikit-learn": "^1.4.0",
    "pandas": "^2.2.0",
    "fastapi": "^0.110.0",
    "react": "^18.3.1"
  }
}`;
    case '2048-watch-cottage':
      return `{
  "name": "2048-watch-cottage",
  "version": "1.0.0",
  "description": "2048 Matrix Puzzle Game with ML Move-Prediction Roadmap",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "train-ml": "python train_agent.py"
  },
  "dependencies": {
    "react": "^18.3.1",
    "motion": "^11.0.0",
    "typescript": "^5.4.0"
  }
}`;
    case 'celestial-cottage':
      return `{
  "name": "celestial-cottage",
  "version": "0.0.1",
  "description": "Reserved Plot for Rafi's Next Major Architecture",
  "scripts": {
    "roadmap": "cat ROADMAP.md"
  },
  "dependencies": {
    "next-gen-framework": "workspace:*"
  }
}`;
    default:
      return `{
  "name": "founders-manor-portfolio",
  "version": "2.0.0",
  "description": "Rafi's Interactive Village Engineering Portfolio",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "tailwindcss": "^4.0.0",
    "lucide-react": "^0.344.0"
  }
}`;
  }
};

const getProjectDirectoryListing = (prop: VillageProperty): string => {
  switch (prop.id) {
    case 'merchants-logistics-route-planner':
      return `-rw-r--r--  1 rafi village  3.2K Sep 15  README.md
-rw-r--r--  1 rafi village   820 Sep 15  package.json
-rw-r--r--  1 rafi village  4.1K Sep 15  dijkstra_heap.py
-rw-r--r--  1 rafi village  3.8K Sep 15  astar_solver.py
-rw-r--r--  1 rafi village  5.2K Sep 15  pyvrp_ortools_pdp.py
-rwxr-xr-x  1 rafi village   540 Sep 15  benchmark_pdp.py
drwxr-xr-x  4 rafi village  4.0K Sep 15  frontend/`;
    case 'college-guild-advisor':
      return `-rw-r--r--  1 rafi village  2.8K Sep 15  README.md
-rw-r--r--  1 rafi village   780 Sep 15  package.json
-rw-r--r--  1 rafi village  4.5K Sep 15  hobart_course_rag.py
-rw-r--r--  1 rafi village  2.9K Sep 15  atar_tce_rules.py
-rwxr-xr-x  1 rafi village   620 Sep 15  start_advisor.sh
drwxr-xr-x  2 rafi village  4.0K Sep 15  handbooks_data/`;
    case 'smart-edtech-forge':
      return `-rw-r--r--  1 rafi village  3.1K Sep 15  ROADMAP.md
-rw-r--r--  1 rafi village   640 Sep 15  package.json
-rw-r--r--  1 rafi village  4.2K Sep 15  market_trend_forecaster.py
-rw-r--r--  1 rafi village  3.7K Sep 15  course_recommender_spec.md
drwxr-xr-x  2 rafi village  4.0K Sep 15  docs/`;
    case '2048-watch-cottage':
      return `-rw-r--r--  1 rafi village  2.5K Sep 15  README.md
-rw-r--r--  1 rafi village   690 Sep 15  package.json
-rw-r--r--  1 rafi village  3.8K Sep 15  matrix_engine.ts
-rw-r--r--  1 rafi village  2.9K Sep 15  ml_trajectory_logger.ts
-rw-r--r--  1 rafi village  4.4K Sep 15  App2048.tsx`;
    case 'celestial-cottage':
      return `-rw-r--r--  1 rafi village  1.4K Sep 15  ROADMAP.md
-rw-r--r--  1 rafi village   410 Sep 15  package.json
drwxr-xr-x  2 rafi village  4.0K Sep 15  design_proposals/`;
    default:
      return `-rw-r--r--  1 rafi village  2.2K Sep 15  README.md
-rw-r--r--  1 rafi village   950 Sep 15  package.json
-rw-r--r--  1 rafi village  3.4K Sep 15  server.ts
drwxr-xr-x  5 rafi village  4.0K Sep 15  src/`;
  }
};

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onOpenJournal,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal session whenever a property opens
  useEffect(() => {
    if (property) {
      setHistory([
        {
          type: 'stdout',
          content: `================================================================
 Rafi's Village Terminal :: ${property.name.toUpperCase()}
 Plot: ${property.plotLabel} | Project: ${property.name}
 Directory: ~/projects/${property.id} | Status: ${property.status}
================================================================
Type 'open readme' to view in-website case study article
Type 'cat readme.txt' for project architecture & specs
Type 'start' to run/launch the project
Type 'help' for available terminal commands.`
        }
      ]);
      setInputVal('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [property]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const newItems: TerminalHistoryItem[] = [
      { type: 'command', content: trimmed }
    ];

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      return;
    } else if (lower === 'exit' || lower === 'quit') {
      onClose();
      return;
    } else if (lower === 'help') {
      newItems.push({
        type: 'stdout',
        content: `AVAILABLE COMMANDS:
  open readme      - Open in-website engineering journal / case-study article
  cat readme.txt   - Display detailed project info, architecture & metrics
  read readme      - Alias for 'cat readme.txt'
  start / run      - Boot and launch the project (reveals clickable Jump In button)
  ls               - List files in current project directory
  cat package.json - Inspect dependencies & scripts
  clear            - Clear terminal screen
  exit             - Close terminal widget`
      });
    } else if (
      lower === 'open readme' ||
      lower === 'open article' ||
      lower === 'read article' ||
      lower === 'open journal' ||
      lower === 'read journal' ||
      lower === 'journal' ||
      lower === 'article'
    ) {
      newItems.push({
        type: 'stdout',
        content: `[JOURNAL] Opening in-website engineering article for ${property.name}...
Navigating to formatted article view (inside this website)...`
      });
      setHistory(prev => [...prev, ...newItems]);
      setTimeout(() => {
        if (onOpenJournal) {
          onOpenJournal(property);
        }
      }, 400);
      return;
    } else if (
      lower === 'cat readme.txt' || 
      lower === 'cat readme' || 
      lower === 'read readme' || 
      lower === 'cat readme.md' ||
      lower === 'readme'
    ) {
      newItems.push({
        type: 'stdout',
        content: `================================================================
# ${property.name.toUpperCase()}
[${property.plotLabel}] Status: ${property.status} | Category: ${property.category}
Subtitle: ${property.subtitle}
================================================================

[OVERVIEW]
${property.fullDesc}

[ARCHITECTURE & HIGHLIGHTS]
${property.highlights.map(h => `  • ${h}`).join('\n')}

[TECHNOLOGY STACK]
  ${property.techStack.join('  |  ')}

[KEY METRICS]
${property.metrics.map(m => `  ${m.label.padEnd(20)}: ${m.value}`).join('\n')}

Repository: ${property.githubUrl}
Deployment: ${property.projectUrl}

Tip: Type 'open readme' to read the full case-study article, or 'start' to run the project!`
      });
    } else if (
      lower === 'start' || 
      lower === 'run' || 
      lower === 'npm start' || 
      lower === 'launch' || 
      lower === 'open'
    ) {
      const isLiveLink = property.projectUrl && property.projectUrl.startsWith('http');
      const isPlanning = property.status.toLowerCase().includes('plan') || property.status.toLowerCase().includes('reserve');

      newItems.push({
        type: 'launch',
        content: (
          <div className="my-2 p-3.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>
                {isPlanning 
                  ? `Project Roadmap & Specifications: ACTIVE [${property.status}]`
                  : `Project Environment: READY [${property.status}]`}
              </span>
            </div>
            <p className="text-emerald-300/80">
              {isPlanning
                ? `\`${property.name}\` is currently in active planning. Explore the technical specification:`
                : `\`${property.name}\` initialized successfully. Access the project below:`}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {isLiveLink ? (
                <a
                  id="terminal-jump-btn"
                  href={property.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs tracking-wider transition shadow-md cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>JUMP INTO LIVE PROJECT ↗</span>
                </a>
              ) : (
                <button
                  id="terminal-roadmap-btn"
                  onClick={() => onOpenJournal && onOpenJournal(property)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-wider transition shadow-md cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>READ ARCHITECTURAL ROADMAP ↗</span>
                </button>
              )}

              <a
                id="terminal-github-btn"
                href={property.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs border border-stone-600 transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source</span>
              </a>
            </div>
          </div>
        )
      });
    } else if (lower === 'ls' || lower === 'dir') {
      newItems.push({
        type: 'stdout',
        content: getProjectDirectoryListing(property)
      });
    } else if (lower === 'cat package.json') {
      newItems.push({
        type: 'stdout',
        content: getProjectPackageJson(property)
      });
    } else if (lower === 'pwd') {
      newItems.push({
        type: 'stdout',
        content: `~/projects/${property.id}`
      });
    } else if (lower === 'whoami') {
      newItems.push({
        type: 'stdout',
        content: `guest@village (connected to ${property.name})`
      });
    } else if (
      lower === 'project' ||
      lower === 'about' ||
      lower === 'specs' ||
      lower === property.name.toLowerCase() ||
      lower.includes(property.id) ||
      (property.id.includes('route') && (lower.includes('merchant') || lower.includes('route') || lower.includes('planner') || lower.includes('logistics') || lower.includes('pdp'))) ||
      (property.id.includes('advisor') && (lower.includes('college') || lower.includes('guild') || lower.includes('advisor') || lower.includes('hobart') || lower.includes('atar') || lower.includes('tce'))) ||
      (property.id.includes('2048') && (lower.includes('2048') || lower.includes('game') || lower.includes('cottage'))) ||
      (property.id.includes('edtech') && (lower.includes('edtech') || lower.includes('forge') || lower.includes('smart'))) ||
      (property.id.includes('celestial') && (lower.includes('celestial') || lower.includes('reserve')))
    ) {
      newItems.push({
        type: 'stdout',
        content: `================================================================
# ${property.name.toUpperCase()}
[${property.plotLabel}] Status: ${property.status} | Category: ${property.category}
Subtitle: ${property.subtitle}
================================================================

[OVERVIEW]
${property.fullDesc}

[ARCHITECTURE & HIGHLIGHTS]
${property.highlights.map(h => `  • ${h}`).join('\n')}

[TECHNOLOGY STACK]
  ${property.techStack.join('  |  ')}

[KEY METRICS]
${property.metrics.map(m => `  ${m.label.padEnd(20)}: ${m.value}`).join('\n')}

Repository: ${property.githubUrl}
Deployment: ${property.projectUrl}

Tip: Type 'open readme' to read the full case-study article, or 'start' to launch the project!`
      });
    } else {
      newItems.push({
        type: 'error',
        content: `Command not recognized: '${trimmed}'. Type 'help' to view available commands, 'cat readme.txt' to read details, or 'start' to jump into the project.`
      });
    }

    setHistory(prev => [...prev, ...newItems]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal('');
  };

  const handleQuickCmd = (cmd: string) => {
    playVillageChime();
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div 
      id="property-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="property-terminal-widget"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-stone-950 rounded-xl shadow-2xl border-2 border-stone-800 overflow-hidden font-mono"
        onClick={e => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-stone-900 border-b border-stone-800 select-none">
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition cursor-pointer" 
              title="Close Terminal (or type exit)"
            />
            <span className="w-3 h-3 rounded-full bg-amber-500 opacity-80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 opacity-80" />
          </div>

          {/* Terminal Title */}
          <div className="flex items-center gap-1.5 text-xs text-stone-300 font-semibold truncate px-2">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate">rafi@village:~/projects/{property.id} — [{property.name}]</span>
          </div>

          {/* Close button */}
          <button
            id="close-terminal-btn"
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition cursor-pointer"
            title="Exit terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Command Action Chips for Instant Interaction */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-stone-900/60 border-b border-stone-800/80 text-xs">
          <span className="text-stone-500 font-medium hidden sm:inline">QUICK CMDS:</span>
          <button
            id="quick-cmd-open-readme"
            onClick={() => handleQuickCmd('open readme')}
            className="px-2.5 py-1 rounded bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-600/50 transition cursor-pointer flex items-center gap-1 font-semibold"
            title="Read in-website engineering case study article"
          >
            <BookOpen className="w-3 h-3 text-blue-400" />
            <span>open readme</span>
          </button>
          <button
            id="quick-cmd-readme"
            onClick={() => handleQuickCmd('cat readme.txt')}
            className="px-2.5 py-1 rounded bg-stone-800 hover:bg-amber-900/50 hover:text-amber-200 text-stone-300 border border-stone-700 transition cursor-pointer flex items-center gap-1"
          >
            <span>cat readme.txt</span>
          </button>
          <button
            id="quick-cmd-start"
            onClick={() => handleQuickCmd('start')}
            className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/50 transition cursor-pointer flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>start</span>
          </button>
          <button
            id="quick-cmd-ls"
            onClick={() => handleQuickCmd('ls')}
            className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition cursor-pointer"
          >
            <span>ls</span>
          </button>
          <button
            id="quick-cmd-help"
            onClick={() => handleQuickCmd('help')}
            className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition cursor-pointer"
          >
            <span>help</span>
          </button>
          <button
            id="quick-cmd-clear"
            onClick={() => handleQuickCmd('clear')}
            className="px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 border border-stone-700 transition cursor-pointer ml-auto"
          >
            <span>clear</span>
          </button>
        </div>

        {/* Terminal Body Screen */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-2 text-xs text-stone-200 select-text"
          style={{ minHeight: '340px' }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, index) => {
            if (item.type === 'command') {
              return (
                <div key={index} className="flex items-start gap-1.5 text-amber-300 font-bold pt-1">
                  <span className="text-emerald-400">guest@village</span>
                  <span className="text-stone-500">:</span>
                  <span className="text-blue-400">~/projects/{property.id}</span>
                  <span className="text-stone-200">$</span>
                  <span className="text-stone-100">{item.content}</span>
                </div>
              );
            }

            if (item.type === 'error') {
              return (
                <div key={index} className="text-rose-400 whitespace-pre-wrap pl-2 border-l-2 border-rose-500/50">
                  {item.content}
                </div>
              );
            }

            if (item.type === 'launch') {
              return (
                <div key={index}>
                  {item.content}
                </div>
              );
            }

            return (
              <div key={index} className="text-stone-300 whitespace-pre-wrap pl-2 leading-relaxed">
                {item.content}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt Form */}
        <form 
          onSubmit={handleFormSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-stone-900 border-t border-stone-800 text-xs text-stone-100"
        >
          <span className="text-emerald-400 font-bold hidden sm:inline">guest@village</span>
          <span className="text-stone-500 hidden sm:inline">:</span>
          <span className="text-blue-400 font-mono hidden md:inline">~/projects/{property.id}</span>
          <span className="text-stone-300 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Type 'cat readme.txt', 'ls', or 'start' (or 'help')..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-stone-100 placeholder-stone-600 caret-amber-400"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition cursor-pointer"
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
};
