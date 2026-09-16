import React, { useEffect } from 'react';
import { 
  X, 
  Home, 
  Terminal, 
  BookOpen, 
  Play, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Compass,
  FileText
} from 'lucide-react';
import { VillageProfile, VillageProperty } from '../types';

interface HouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: VillageProfile;
  property: VillageProperty;
}

export const HouseModal: React.FC<HouseModalProps> = ({
  isOpen,
  onClose,
  profile,
  property,
}) => {
  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="house-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="house-modal-container"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-amber-50/95 text-stone-900 rounded-2xl shadow-2xl border-2 border-amber-900/30 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-amber-100/90 border-b border-amber-800/20 select-none">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-800 text-amber-100">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-['Cinzel',serif] tracking-wide text-amber-950">
                Founder's Cottage (My House)
              </h2>
              <p className="text-xs text-amber-900/70 font-mono">
                About Rafi • Adventurer's Guide to Village Terminals
              </p>
            </div>
          </div>

          <button
            id="close-house-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-950/70 hover:text-amber-950 hover:bg-amber-200/70 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* SECTION 1: ABOUT MYSELF IN SHORT */}
          <section id="about-rafi-short" className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-amber-900/15">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h3 className="text-xs font-mono font-bold tracking-wider text-amber-900 uppercase">
                About Myself (In Short)
              </h3>
            </div>

            <div className="space-y-3 text-sm text-stone-800 leading-relaxed font-sans">
              <p className="text-base sm:text-lg font-medium text-stone-950 font-serif">
                Hello! I’m <span className="font-bold text-amber-950">Rafi</span>, a full-stack engineer and digital craftsman.
              </p>

              <p>
                I build resilient, high-performance web platforms and developer tooling with sub-second responsiveness. Rather than an ordinary flat resume, I crafted this interactive village so you can explore my projects, codebases, and architectural decisions as a living landscape.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-white/70 border border-amber-900/10 shadow-2xs">
                  <span className="block text-xs font-mono text-amber-800 font-bold mb-1">CORE CRAFT</span>
                  <p className="text-xs text-stone-700">
                    Full-Stack TypeScript, Node.js, Express, React, WebSockets, PostgreSQL, Docker & System Design.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/70 border border-amber-900/10 shadow-2xs">
                  <span className="block text-xs font-mono text-amber-800 font-bold mb-1">PHILOSOPHY</span>
                  <p className="text-xs text-stone-700 italic">
                    “Actions speak louder than words.” Every building on this map is a real, working system.
                  </p>
                </div>
              </div>

              {/* Quick Contact Chips */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={`mailto:${profile.contactEmail}?subject=Hello%20Rafi`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-900 hover:bg-amber-800 text-amber-100 text-xs font-semibold shadow-2xs transition"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile.contactEmail}</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold shadow-2xs transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-semibold shadow-2xs transition"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 2: ADVENTURER'S GUIDE TO THE TERMINAL */}
          <section id="terminal-field-guide" className="space-y-4 pt-2">
            <div className="flex items-center gap-2 pb-1 border-b border-amber-900/15">
              <Terminal className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-mono font-bold tracking-wider text-emerald-950 uppercase">
                Explorer's Guide: How to Use the Terminal to Access Projects
              </h3>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed">
              Every building (other than my house) is an active workshop equipped with a retro interactive command terminal. Here is how to inspect and run each project:
            </p>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="p-3 rounded-lg bg-white/80 border border-amber-900/15 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold font-mono text-stone-900">
                    Click Any Workshop or Landmark on the Map
                  </h4>
                  <p className="text-xs text-stone-600">
                    Select the <span className="font-semibold text-stone-900">Forge Workshop</span>, <span className="font-semibold text-stone-900">Bakery & Guild</span>, <span className="font-semibold text-stone-900">Data Lighthouse</span>, <span className="font-semibold text-stone-900">Riverbank Greenhouse</span>, or <span className="font-semibold text-stone-900">Celestial Observatory</span> to boot its terminal connection.
                  </p>
                </div>
              </div>

              {/* Step 2: cat readme.txt */}
              <div className="p-3 rounded-lg bg-stone-900 text-stone-100 border border-stone-800 flex items-start gap-3 font-mono text-xs">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">cat readme.txt</span>
                    <span className="text-[10px] text-stone-400">COMMAND</span>
                  </div>
                  <p className="text-stone-300 text-[11px] font-sans">
                    Prints the project’s technical specifications, architecture highlights, tech stack, and key metrics directly into the terminal stream.
                  </p>
                </div>
              </div>

              {/* Step 3: open readme (Journal Article) */}
              <div className="p-3 rounded-lg bg-stone-900 text-stone-100 border border-stone-800 flex items-start gap-3 font-mono text-xs">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-stone-950 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-300">open readme</span>
                    <span className="text-[10px] text-stone-400">IN-WEBSITE ARTICLE</span>
                  </div>
                  <p className="text-stone-300 text-[11px] font-sans">
                    Navigates directly to an in-depth, formatted engineering journal / case-study article right inside this website (without leaving to an external site).
                  </p>
                </div>
              </div>

              {/* Step 4: start / run */}
              <div className="p-3 rounded-lg bg-stone-900 text-stone-100 border border-stone-800 flex items-start gap-3 font-mono text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  4
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300">start</span>
                    <span className="text-[10px] text-stone-400">LAUNCH PROJECT</span>
                  </div>
                  <p className="text-stone-300 text-[11px] font-sans">
                    Initializes the project environment and reveals the green <span className="text-emerald-400 font-semibold font-mono">JUMP INTO THE PROJECT ↗</span> action button.
                  </p>
                </div>
              </div>

              {/* Bonus commands */}
              <div className="p-2.5 rounded-lg bg-amber-100/50 border border-amber-900/10 text-[11px] font-mono text-stone-700 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-bold text-amber-950">OTHER COMMANDS:</span>
                <span><strong className="text-stone-900">ls</strong>: list directory files</span>
                <span><strong className="text-stone-900">cat package.json</strong>: inspect dependencies</span>
                <span><strong className="text-stone-900">help</strong>: list all commands</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3.5 bg-amber-100/70 border-t border-amber-800/20 flex items-center justify-between">
          <span className="text-xs font-mono text-amber-950/70">
            Plot #01 • Rafi’s Cottage
          </span>
          <button
            id="house-explore-map-btn"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-100 text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <span>Explore the Village Map</span>
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
