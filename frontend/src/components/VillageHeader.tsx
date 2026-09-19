import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Sunrise, 
  BookOpen,
  Terminal as TerminalIcon 
} from 'lucide-react';
import { getIsMuted, toggleMuteSound } from '../utils/audio';

interface VillageHeaderProps {
  timeOfDay: 'day' | 'sunset' | 'night';
  setTimeOfDay: (mode: 'day' | 'sunset' | 'night') => void;
  contactEmail?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  visitorCount?: number;
  onOpenVisitorLog?: () => void;
}

export const VillageHeader: React.FC<VillageHeaderProps> = ({
  timeOfDay,
  setTimeOfDay,
  contactEmail = 'izrafi.au@gmail.com',
  githubUrl = 'https://github.com',
  linkedinUrl = 'https://linkedin.com',
  visitorCount,
  onOpenVisitorLog,
}) => {
  const [muted, setMuted] = useState(getIsMuted());

  const handleToggleSound = () => {
    const isNowMuted = toggleMuteSound();
    setMuted(isNowMuted);
  };

  const cycleTimeOfDay = () => {
    if (timeOfDay === 'day') setTimeOfDay('sunset');
    else if (timeOfDay === 'sunset') setTimeOfDay('night');
    else setTimeOfDay('day');
  };

  return (
    <>
      <header id="village-game-header" className="w-full max-w-5xl mx-auto pt-6 sm:pt-14 pb-6 sm:pb-10 px-3 sm:px-6">
      {/* Top subtle controls bar */}
      <div className="flex items-center justify-end sm:justify-between pb-4 sm:pb-6">
        {/* Game HUD tag */}
        <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-900/90 text-amber-300 font-mono text-xs border border-amber-500/30 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>WORLD_SERVER: RAFI_VILLAGE // v1.2</span>
        </div>

        {/* Ambient & Log Controls */}
        <div className="flex items-center gap-2">
          {onOpenVisitorLog && (
            <button
              id="visitor-log-header-btn"
              onClick={onOpenVisitorLog}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-600/40 shadow-xs transition cursor-pointer"
              title="Open the Village Visitor Log & Sign Ledger"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Visitor Log{visitorCount !== undefined ? ` (${visitorCount})` : ''}</span>
            </button>
          )}

          <button
            id="sound-toggle-btn"
            onClick={handleToggleSound}
            aria-label={muted ? 'Unmute game audio' : 'Mute game audio'}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-700 transition cursor-pointer"
            title={muted ? 'Enable sound effects' : 'Mute sound'}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{muted ? 'BGM: OFF' : 'BGM: ON'}</span>
          </button>

          <button
            id="time-of-day-btn"
            onClick={cycleTimeOfDay}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-700 transition cursor-pointer"
            title="Cycle Day / Sunset / Night"
          >
            {timeOfDay === 'day' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
            {timeOfDay === 'sunset' && <Sunrise className="w-3.5 h-3.5 text-orange-400" />}
            {timeOfDay === 'night' && <Moon className="w-3.5 h-3.5 text-indigo-300" />}
            <span className="hidden sm:inline uppercase">{timeOfDay}</span>
          </button>
        </div>
      </div>

      {/* Main Header Content - Cinematic Fantasy Title & Separated Motto */}
      <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
        <div className="space-y-3">
          {/* Fantasy Book/Movie Title: "Welcome, brave souls, to the land of Rafi." */}
          <h1 
            id="village-title-heading" 
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-stone-900 font-['Cinzel',serif] leading-tight break-words"
          >
            Welcome, brave souls, to the land of Rafi.
          </h1>

          {/* Part 1: Core Maxim / Motto */}
          <p 
            id="village-maxim" 
            className="text-lg sm:text-xl font-medium text-amber-950/90 font-serif italic tracking-wide"
          >
            “Actions speak louder than words.”
          </p>

          {/* Part 2: Adventurer's Invitation */}
          <p 
            id="village-invitation" 
            className="text-xs sm:text-sm font-mono text-stone-600 font-medium tracking-normal flex items-center justify-center sm:justify-start gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
            <span>Step in. Explore. Discover what’s been built.</span>
          </p>
        </div>

        {/* Action Links: Just GitHub, LinkedIn, and Get in Touch */}
        <div id="village-hero-links" className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 sm:pt-0">
          <a
            id="hero-github-link"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold shadow-xs transition"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            id="hero-linkedin-link"
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-semibold shadow-xs transition"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <a
            id="hero-contact-link"
            href={`mailto:${contactEmail}?subject=Hello%20from%20Rafi's%20Village`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-800/40 bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 text-xs font-semibold shadow-xs transition"
          >
            <Mail className="w-4 h-4 text-amber-800" />
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
      </header>

      {onOpenVisitorLog && (
        <button
          id="mobile-visitor-log-btn"
          onClick={onOpenVisitorLog}
          className="fixed right-3 bottom-4 z-40 inline-flex sm:hidden items-center gap-1.5 rounded-full border border-amber-500/50 bg-stone-900/95 px-2.5 py-1.5 text-[11px] font-mono font-semibold text-amber-200 shadow-lg backdrop-blur-xs transition hover:bg-stone-800"
          title="Open the Village Visitor Log"
        >
          <BookOpen className="h-3.5 w-3.5 text-amber-400" />
          <span>Visitor Log{visitorCount !== undefined ? ` (${visitorCount})` : ''}</span>
        </button>
      )}
    </>
  );
};
