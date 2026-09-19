import React, { useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  Terminal, 
  Clock, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Cpu, 
  Play, 
  Github,
  BookOpen
} from 'lucide-react';
import { VillageProperty } from '../types';
import { projectJournals, ProjectJournal } from '../data/projectJournals';

interface JournalModalProps {
  property: VillageProperty | null;
  isOpen: boolean;
  onClose: () => void;
  onBackToTerminal: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  property,
  isOpen,
  onClose,
  onBackToTerminal,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !property) return null;

  const journal: ProjectJournal = projectJournals[property.id] || {
    id: property.id,
    title: `${property.name}: Engineering Case Study & System Architecture`,
    subtitle: property.subtitle,
    readTime: '4 min read',
    date: 'Recent Build',
    category: property.category.toUpperCase(),
    synopsis: property.shortDesc,
    problem: property.fullDesc,
    architecture: {
      title: 'System Design Overview',
      points: property.highlights
    },
    challenges: [
      {
        hurdle: 'Balancing real-time performance with comprehensive state persistence.',
        resolution: 'Implemented decoupled event loops and targeted caching.'
      }
    ],
    keyLearnings: [
      'Sub-second user feedback is crucial for production adoption.',
      'Modular architecture ensures long-term testability and maintainability.'
    ],
    metrics: property.metrics.map(m => ({ label: m.label, value: m.value, detail: 'Verified benchmark' }))
  };

  return (
    <div 
      id="journal-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-950/85 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <article
        id="journal-article-container"
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-stone-50 text-stone-900 rounded-2xl shadow-2xl border-2 border-stone-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Navigation & Controls Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-900 text-stone-200 border-b border-stone-800 select-none">
          <button
            id="journal-back-to-terminal-btn"
            onClick={onBackToTerminal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition cursor-pointer"
            title="Return to the interactive project terminal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Back to Terminal</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-stone-400">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>VILLAGE ARCHIVES // ARTICLE READER</span>
          </div>

          <button
            id="close-journal-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition cursor-pointer"
            title="Close Article"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 sm:py-10 space-y-8">
          {/* Article Header */}
          <header className="space-y-3 pb-6 border-b border-stone-200">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                {journal.category}
              </span>
              <span className="flex items-center gap-1 text-stone-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{journal.readTime}</span>
              </span>
              <span className="flex items-center gap-1 text-stone-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{journal.date}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Cinzel',serif] tracking-tight text-stone-950 leading-tight">
              {journal.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-700 font-serif italic">
              {journal.subtitle}
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-stone-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Author: Izrafi (Rafi) • Digital Craftsman & Engineer</span>
            </div>
          </header>

          {/* Section 1: Executive Synopsis & Problem */}
          <section className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-stone-800 text-sm leading-relaxed">
              <span className="block font-mono text-xs font-bold text-amber-900 uppercase mb-1">
                Executive Synopsis
              </span>
              <p>{journal.synopsis}</p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-base font-bold font-mono text-stone-900 uppercase tracking-wide flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>The Problem Space & Motivation</span>
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                {journal.problem}
              </p>
            </div>
          </section>

          {/* Section 2: Architecture Deep Dive */}
          <section className="space-y-3 pt-2">
            <h2 className="text-base font-bold font-mono text-stone-900 uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{journal.architecture.title}</span>
            </h2>
            <div className="space-y-2.5">
              {journal.architecture.points.map((pt, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-white border border-stone-200/80 flex items-start gap-3 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-800 leading-normal">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Engineering Challenges Overcome */}
          <section className="space-y-3 pt-2">
            <h2 className="text-base font-bold font-mono text-stone-900 uppercase tracking-wide flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>Key Challenges & Technical Resolutions</span>
            </h2>
            <div className="space-y-3">
              {journal.challenges.map((ch, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 text-stone-900 font-semibold">
                    <span className="font-mono text-xs text-rose-600 font-bold shrink-0">[HURDLE {idx + 1}]</span>
                    <span>{ch.hurdle}</span>
                  </div>
                  <div className="pl-6 text-stone-700 leading-relaxed border-l-2 border-emerald-500">
                    <span className="font-mono text-xs text-emerald-700 font-bold block mb-0.5">RESOLUTION:</span>
                    {ch.resolution}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Tech Stack Badges */}
          <section className="space-y-2 pt-2 pb-4">
            <h2 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
              Technology Stack Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {property.techStack.map(tech => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-stone-200 text-stone-800 font-mono text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Action Footer */}
        <div className="px-5 py-3.5 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 select-none">
          <button
            onClick={onBackToTerminal}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Terminal for {property.name}</span>
          </button>

          <div className="flex items-center gap-2">
            {property.projectUrl && property.projectUrl.startsWith('http') && (
              <a
                href={property.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Launch Live Project ↗</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-stone-300 hover:bg-stone-400 text-stone-800 font-mono text-xs font-medium transition cursor-pointer"
            >
              Return to Village Map
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
