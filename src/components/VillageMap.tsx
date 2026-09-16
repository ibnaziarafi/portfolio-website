import React, { useState } from 'react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Terminal,
  Waves,
  Sprout,
  Target,
  Shield,
  Package,
  Axe,
  Coins,
  Sparkles
} from 'lucide-react';
import { VillageProperty } from '../types';
import { 
  playVillageChime, 
  playFootstepSound, 
  playWellCoinSound, 
  playArrowSound,
  playWaterSplashSound,
  playRustleSound,
  playCargoSound,
  playGateSound,
  getIsMuted,
  toggleMuteSound
} from '../utils/audio';

// Verified lamppost coordinates mapped to physical lantern posts across the village
const LAMPPOST_COORDINATES = [
  { x: 489, y: 206, id: 'lamp-manor-west' },
  { x: 556, y: 206, id: 'lamp-manor-east' },
  { x: 366, y: 296, id: 'lamp-tavern' },
  { x: 489, y: 384, id: 'lamp-plaza-west' },
  { x: 556, y: 405, id: 'lamp-plaza-east' },
  { x: 411, y: 405, id: 'lamp-merchant' },
  { x: 489, y: 521, id: 'lamp-south-path' },
  { x: 480, y: 610, id: 'lamp-south-gate' },
  { x: 769, y: 243, id: 'lamp-forge' },
  { x: 148, y: 180, id: 'lamp-cottage' },
];

interface VillageMapProps {
  properties: VillageProperty[];
  selectedProperty: VillageProperty | null;
  onSelectProperty: (property: VillageProperty) => void;
  timeOfDay: 'day' | 'sunset' | 'night';
}

interface LandmarkSpot {
  id: string;
  name: string;
  category: 'water' | 'garden' | 'landmark' | 'fortress';
  walkX: number;
  walkY: number;
  description: string;
}

export const VillageMap: React.FC<VillageMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  timeOfDay,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  // Default position: on the courtyard cobblestone path directly in front of Founder's Manor
  const [avatarPos, setAvatarPos] = useState<{ x: number; y: number }>({ x: 475, y: 255 });
  const [isWalking, setIsWalking] = useState(false);
  const [activeDialogue, setActiveDialogue] = useState<{
    title: string;
    text: string;
    icon: string;
  } | null>(null);
  const [wellCoins, setWellCoins] = useState<number>(0);
  const [clickPing, setClickPing] = useState<{ x: number; y: number } | null>(null);
  const [isMuted, setIsMuted] = useState(getIsMuted());

  // Building interactive hotzones calibrated precisely to 1024x720 layout
  // tagX/tagY are anchored on TOP of each mark with downward pointing badges
  const buildingBoxes: Record<string, { 
    x: number; 
    y: number; 
    w: number; 
    h: number; 
    tagX: number; 
    tagY: number; 
    shortLabel: string;
    walkX: number;
    walkY: number;
  }> = {
    'my-house': { 
      x: 410, 
      y: 50, 
      w: 160, 
      h: 140, 
      tagX: 490, 
      tagY: 34, 
      shortLabel: "FOUNDER'S MANOR",
      walkX: 485,
      walkY: 225
    },
    'smart-edtech-forge': { 
      x: 645, 
      y: 155, 
      w: 150, 
      h: 120, 
      tagX: 715, 
      tagY: 139, 
      shortLabel: "SMART EDTECH FORGE",
      walkX: 710,
      walkY: 295
    },
    'college-guild-advisor': { 
      x: 320, 
      y: 205, 
      w: 105, 
      h: 85, 
      tagX: 372, 
      tagY: 189, 
      shortLabel: "COLLEGE GUILD ADVISOR",
      walkX: 365,
      walkY: 305
    },
    'merchants-logistics-route-planner': { 
      x: 340, 
      y: 355, 
      w: 135, 
      h: 90, 
      tagX: 405, 
      tagY: 339, 
      shortLabel: "MERCHANT'S LOGISTICS & ROUTE PLANNER",
      walkX: 405,
      walkY: 460
    },
    '2048-watch-cottage': { 
      x: 95, 
      y: 115, 
      w: 85, 
      h: 85, 
      tagX: 138, 
      tagY: 99, 
      shortLabel: "2048 WATCH COTTAGE",
      walkX: 140,
      walkY: 215
    },
    'celestial-cottage': { 
      x: 760, 
      y: 375, 
      w: 95, 
      h: 85, 
      tagX: 808, 
      tagY: 359, 
      shortLabel: "CELESTIAL COTTAGE",
      walkX: 795,
      walkY: 475
    },
  };

  const moveAvatarTo = (x: number, y: number) => {
    setIsWalking(true);
    playFootstepSound();
    setAvatarPos({ x, y });
    setClickPing({ x, y });
    setTimeout(() => setClickPing(null), 700);
    setTimeout(() => setIsWalking(false), 450);
  };

  const handlePropertyClick = (property: VillageProperty, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveDialogue(null);
    playVillageChime();
    
    const box = buildingBoxes[property.id];
    const targetX = box ? box.walkX : property.roadConnection.x;
    const targetY = box ? box.walkY : property.roadConnection.y;
    moveAvatarTo(targetX, targetY);

    onSelectProperty(property);
  };

  // Map background click: guide Rafi to that spot!
  const handleMapCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 1024 / rect.width;
    const scaleY = 720 / rect.height;
    const clickX = Math.round((e.clientX - rect.left) * scaleX);
    const clickY = Math.round((e.clientY - rect.top) * scaleY);
    
    // Bounds guard within map walls
    const boundedX = Math.max(50, Math.min(970, clickX));
    const boundedY = Math.max(50, Math.min(680, clickY));
    moveAvatarTo(boundedX, boundedY);
  };

  // 1. Water Well Interaction
  const handleWellClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playWellCoinSound();
    moveAvatarTo(462, 450);
    const newCount = wellCoins + 1;
    setWellCoins(newCount);

    const fortunes = [
      "The well whispers: 'Clean abstractions prevent costly refactors.'",
      "A ripple forms: 'Architecture is about intent, not frameworks.'",
      "You tossed a silver coin: Sub-millisecond frontend latency granted!",
      "Ancient waters echo: 'Test behavior, not implementation details.'",
      "A silver gleam shines: 'Type safety is the armor of distributed code.'"
    ];
    const picked = fortunes[newCount % fortunes.length];
    setActiveDialogue({
      title: `The Town Wishing Well (${newCount} Coin${newCount > 1 ? 's' : ''} Tossed)`,
      text: picked,
      icon: 'well'
    });
  };

  // 2. River Interactions
  const handleRiverNorthClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playWaterSplashSound();
    moveAvatarTo(610, 160);
    setActiveDialogue({
      title: 'North Mountain Spring',
      text: 'Fresh alpine spring water powers the blacksmith waterwheel and feeds the terrace gardens.',
      icon: 'river'
    });
  };

  const handleRiverMidClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playWaterSplashSound();
    moveAvatarTo(610, 350);
    setActiveDialogue({
      title: 'Riverbank Fishing Pier',
      text: 'You spotted a leaping rainbow trout! A bobbing wooden bottle reveals: "Streaming data flows best with backpressure."',
      icon: 'river'
    });
  };

  const handleRiverSouthClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playWaterSplashSound();
    moveAvatarTo(635, 580);
    setActiveDialogue({
      title: 'South River Estuary',
      text: 'The clear river currents glide gracefully under the stone bridge and out towards the sea.',
      icon: 'river'
    });
  };

  // 3. Garden Interactions
  const handleUpperGardenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playRustleSound();
    moveAvatarTo(320, 175);
    setActiveDialogue({
      title: 'Upper Terrace Herb & Vegetable Garden',
      text: 'Neat, fertile rows of crisp cabbages, mint, and medicinal herbs. Clean engineering is deeply rooted.',
      icon: 'garden'
    });
  };

  const handleLowerGardenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playRustleSound();
    moveAvatarTo(410, 495);
    setActiveDialogue({
      title: 'Autumn Pumpkin & Vegetable Patch',
      text: 'Fenced autumn garden beside the village merchant shop with ripe golden pumpkins and vegetable beds nurtured for the harvest.',
      icon: 'pumpkin'
    });
  };

  // 4. Archery Target Range
  const handleArcheryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playArrowSound();
    moveAvatarTo(115, 275);
    setActiveDialogue({
      title: 'Archery Practice Field',
      text: '🎯 THWACK! Clean bullseye! 100/100 Test Suite accuracy achieved right in the gold ring.',
      icon: 'archery'
    });
  };

  // 5. Stone Bridge
  const handleBridgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFootstepSound();
    moveAvatarTo(672, 355);
    setActiveDialogue({
      title: 'The Whispering Stone Bridge',
      text: 'An ancient arched stone crossing over the river, connecting the lively village square with the quiet eastern grove.',
      icon: 'bridge'
    });
  };

  // 6. Riverside Cargo Barrels
  const handleCargoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCargoSound();
    moveAvatarTo(535, 500);
    setActiveDialogue({
      title: 'Riverside Cargo & Trade Barrels',
      text: 'Sealed barrels of spices and export crates stacked along the riverbank path. All API network payloads compressed and gzipped under 48kB.',
      icon: 'cargo'
    });
  };

  // 8. Northwest Gate
  const handleNorthwestGateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGateSound();
    moveAvatarTo(205, 145);
    setActiveDialogue({
      title: 'Northwest Mountain Pass Gate',
      text: 'A sturdy fortress archway guarded by stone walls. Leads beyond into open-source repositories and wildlands.',
      icon: 'gate'
    });
  };

  // 9. South Gate
  const handleSouthGateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playGateSound();
    moveAvatarTo(508, 660);
    setActiveDialogue({
      title: 'Royal South Village Gate',
      text: "The main vaulted gatehouse to Rafi's Kingdom. Welcome travelers and fellow engineers!",
      icon: 'gate'
    });
  };

  // 10. Crossroads Signpost
  const handleCrossroadsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playFootstepSound();
    moveAvatarTo(455, 430);
    setActiveDialogue({
      title: 'Village Crossroads Signpost',
      text: '▲ North: Founder’s Manor | ▶ East: Blacksmith Forge | ◀ West: Guild Tavern | ▼ South: River Market',
      icon: 'compass'
    });
  };

  const handleMuteToggle = () => {
    const nextMuted = toggleMuteSound();
    setIsMuted(nextMuted);
  };

  return (
    <div id="village-game-container" className="w-full max-w-5xl mx-auto px-2 sm:px-4 my-2">
      {/* Game Map Frame styled to fit perfectly into the map box */}
      <div 
        id="village-map-canvas-frame" 
        className="relative w-full rounded-2xl overflow-hidden border-3 border-stone-800 shadow-2xl bg-stone-950 select-none ring-1 ring-amber-500/20"
        style={{ aspectRatio: '1024 / 720' }}
      >
        {/* Top-Left Game HUD Header */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-30 flex items-center gap-2 bg-stone-900/90 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-amber-500/40 text-amber-300 font-mono text-[11px] sm:text-xs shadow-md">
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
          <span className="font-bold tracking-wide">RAFI’S WALLED VILLAGE</span>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <span className="text-stone-300 hidden md:inline">CLICK HOUSES & SPOTS</span>
        </div>

        {/* Top-Right Game Controls Bar */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 flex items-center gap-1.5 bg-stone-900/90 backdrop-blur-xs p-1 sm:p-1.5 rounded-lg border border-amber-500/30 shadow-md">
          {/* Toggle Labels */}
          <button
            id="toggle-labels-btn"
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2 py-1 rounded transition cursor-pointer flex items-center gap-1 text-[11px] sm:text-xs font-mono ${
              showLabels ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-stone-400 hover:text-stone-200'
            }`}
            title={showLabels ? "Hide Map Labels" : "Show Map Labels"}
            aria-label="Toggle map building labels"
          >
            {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>LABELS</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="map-sound-toggle-btn"
            onClick={handleMuteToggle}
            className={`p-1.5 rounded transition cursor-pointer text-xs ${
              !isMuted ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-950/40' : 'text-stone-400 hover:text-stone-200'
            }`}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            aria-label="Toggle audio"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Bottom-Left Location Indicator */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-30 flex items-center gap-2 bg-stone-900/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-amber-500/40 shadow-lg text-[11px] sm:text-xs font-mono text-amber-300">
          <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate max-w-[200px] sm:max-w-[320px]">
            {selectedProperty 
              ? `SELECTED: ${selectedProperty.name.toUpperCase()}` 
              : 'CLICK ANY HOUSE OR SPOT TO EXPLORE'}
          </span>
        </div>

        {/* Floating Interactive Landmark Fortune / Dialogue Toast */}
        {activeDialogue && (
          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-30 max-w-[280px] sm:max-w-sm bg-stone-900/95 backdrop-blur-xs border border-amber-400/80 px-3 py-2 rounded-lg shadow-xl text-xs font-mono text-amber-200 flex items-start justify-between gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 text-[11px] sm:text-xs pb-0.5">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                {activeDialogue.title}
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-300 leading-relaxed">
                {activeDialogue.text}
              </p>
            </div>
            <button
              onClick={() => setActiveDialogue(null)}
              className="text-stone-400 hover:text-stone-100 cursor-pointer font-bold text-sm px-1"
              aria-label="Dismiss banner"
            >
              ×
            </button>
          </div>
        )}

        {/* Full Interactive SVG Canvas fitting the map box precisely */}
        <svg
          id="village-game-svg"
          viewBox="0 0 1024 720"
          className="w-full h-full block cursor-crosshair"
          preserveAspectRatio="xMidYMid meet"
          onClick={handleMapCanvasClick}
        >
          <defs>
            {/* Subtle glow filter for hovered buildings */}
            <filter id="building-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Lantern light radial gradient */}
            <radialGradient id="lantern-light" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>

            {/* Aqua river shimmer gradient */}
            <linearGradient id="river-shimmer" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* 1. ORIGINAL PIXEL ART VILLAGE MAP BASE IMAGE */}
          <image
            href="/village-map-original.jpg"
            x="0"
            y="0"
            width="1024"
            height="720"
            preserveAspectRatio="xMidYMid slice"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* 2. ATMOSPHERIC LIGHTING OVERLAYS */}
          {timeOfDay === 'sunset' && (
            <g className="pointer-events-none">
              <rect
                width="1024"
                height="720"
                fill="#f59e0b"
                opacity="0.18"
                className="mix-blend-color-burn"
              />
              {/* Twilight lantern light at village lampposts */}
              {LAMPPOST_COORDINATES.map(lamp => (
                <circle
                  key={`sunset-${lamp.id}`}
                  cx={lamp.x}
                  cy={lamp.y}
                  r="24"
                  fill="url(#lantern-light)"
                  opacity="0.5"
                />
              ))}
            </g>
          )}

          {timeOfDay === 'night' && (
            <g className="pointer-events-none">
              {/* Moonlight wash */}
              <rect
                width="1024"
                height="720"
                fill="#0f172a"
                opacity="0.5"
                className="mix-blend-multiply"
              />
              {/* Night lighting positioned strictly at village lampposts */}
              {LAMPPOST_COORDINATES.map(lamp => (
                <g key={`night-${lamp.id}`}>
                  {/* Broad warm ground lantern illumination */}
                  <circle cx={lamp.x} cy={lamp.y} r="38" fill="url(#lantern-light)" />
                  {/* Glowing lantern post head */}
                  <circle cx={lamp.x} cy={lamp.y} r="3.5" fill="#fef08a" opacity="0.9" />
                  <circle cx={lamp.x} cy={lamp.y} r="1.5" fill="#ffffff" opacity="0.95" />
                </g>
              ))}
            </g>
          )}

          {/* 3. CLICKABLE NATURAL & VILLAGE LANDMARKS */}
          
          {/* A. The Town Wishing Well (Circular stone well with water south of merchant house) */}
          <g
            id="landmark-well"
            className="cursor-pointer group"
            onClick={handleWellClick}
            onMouseEnter={() => setHoveredId('landmark-well')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <circle
              cx="475"
              cy="448"
              r="15"
              fill="transparent"
            />
            {hoveredId === 'landmark-well' && (
              <g>
                <circle
                  cx="475"
                  cy="448"
                  r="16"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  className="animate-pulse"
                />
                <circle
                  cx="475"
                  cy="448"
                  r="9"
                  fill="#38bdf8"
                  opacity="0.3"
                />
              </g>
            )}
            {/* User explicitly requested: no label for wishing well */}
          </g>

          {/* B. River North Stream */}
          <g
            id="landmark-river-north"
            className="cursor-pointer group"
            onClick={handleRiverNorthClick}
            onMouseEnter={() => setHoveredId('river-north')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <path
              d="M 590 10 L 645 10 L 670 120 L 650 240 L 595 240 L 615 120 Z"
              fill={hoveredId === 'river-north' ? 'url(#river-shimmer)' : 'transparent'}
              stroke={hoveredId === 'river-north' ? '#38bdf8' : 'none'}
              strokeWidth="2"
              strokeDasharray="6 3"
            />
          </g>

          {/* C. River Mid & Fishing Pier */}
          <g
            id="landmark-river-mid"
            className="cursor-pointer group"
            onClick={handleRiverMidClick}
            onMouseEnter={() => setHoveredId('river-mid')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <path
              d="M 595 240 L 650 240 L 675 350 L 665 450 L 610 450 L 620 350 Z"
              fill={hoveredId === 'river-mid' ? 'url(#river-shimmer)' : 'transparent'}
              stroke={hoveredId === 'river-mid' ? '#38bdf8' : 'none'}
              strokeWidth="2"
              strokeDasharray="6 3"
            />
          </g>

          {/* D. River South Estuary */}
          <g
            id="landmark-river-south"
            className="cursor-pointer group"
            onClick={handleRiverSouthClick}
            onMouseEnter={() => setHoveredId('river-south')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <path
              d="M 618 520 L 685 520 L 710 620 L 720 710 L 650 710 L 635 620 Z"
              fill={hoveredId === 'river-south' ? 'url(#river-shimmer)' : 'transparent'}
              stroke={hoveredId === 'river-south' ? '#38bdf8' : 'none'}
              strokeWidth="2"
              strokeDasharray="6 3"
            />
          </g>

          {/* E. Upper Manor Vegetable Garden */}
          <g
            id="landmark-garden-upper"
            className="cursor-pointer group"
            onClick={handleUpperGardenClick}
            onMouseEnter={() => setHoveredId('garden-upper')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <rect
              x="270"
              y="95"
              width="105"
              height="80"
              rx="6"
              fill="transparent"
            />
            {hoveredId === 'garden-upper' && (
              <g>
                <rect
                  x="270"
                  y="95"
                  width="105"
                  height="80"
                  rx="6"
                  fill="#22c55e"
                  fillOpacity="0.15"
                  stroke="#4ade80"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                {/* Top-placed label */}
                <g transform="translate(322, 79)" className="pointer-events-none">
                  <rect x="-46" y="-9" width="92" height="20" rx="4" fill="#000000" opacity="0.65" />
                  <rect x="-44" y="-10" width="88" height="20" rx="4" fill="#0f172a" stroke="#4ade80" strokeWidth="1.2" />
                  <polygon points="-4,10 0,14 4,10" fill="#0f172a" stroke="#4ade80" strokeWidth="1.2" />
                  <circle cx="-32" cy="0" r="3" fill="#22c55e" />
                  <text x="-24" y="3.5" fontSize="7" fontWeight="bold" fill="#86efac" fontFamily="monospace" letterSpacing="0.02em">
                    UPPER GARDEN
                  </text>
                </g>
              </g>
            )}
          </g>

          {/* F. Autumn Pumpkin & Vegetable Garden (Fenced garden beside Village Merchant House) */}
          <g
            id="landmark-garden-lower"
            className="cursor-pointer group"
            onClick={handleLowerGardenClick}
            onMouseEnter={() => setHoveredId('garden-lower')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <rect
              x="355"
              y="452"
              width="114"
              height="36"
              rx="6"
              fill="transparent"
            />
            {hoveredId === 'garden-lower' && (
              <g>
                <rect
                  x="353"
                  y="450"
                  width="118"
                  height="40"
                  rx="7"
                  fill="#f97316"
                  fillOpacity="0.22"
                  stroke="#fb923c"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  className="animate-pulse"
                />
              </g>
            )}
            {/* Note: User specifically requested: "no need to make label for it" */}
          </g>

          {/* G. The Whispering Stone Bridge (Crossing river at x: 635..710, y: 330..380) */}
          <g
            id="landmark-bridge"
            className="cursor-pointer group"
            onClick={handleBridgeClick}
            onMouseEnter={() => setHoveredId('bridge')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <rect
              x="635"
              y="330"
              width="75"
              height="50"
              rx="6"
              fill="transparent"
            />
            {hoveredId === 'bridge' && (
              <rect
                x="633"
                y="328"
                width="79"
                height="54"
                rx="7"
                fill="#38bdf8"
                fillOpacity="0.22"
                stroke="#7dd3fc"
                strokeWidth="2.5"
                strokeDasharray="5 3"
                className="animate-pulse"
              />
            )}
            {/* User explicitly requested: no label for stone bridge */}
          </g>

          {/* H. Archery Target Range */}
          <g
            id="landmark-archery"
            className="cursor-pointer group"
            onClick={handleArcheryClick}
            onMouseEnter={() => setHoveredId('archery')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <rect
              x="55"
              y="245"
              width="50"
              height="60"
              rx="4"
              fill="transparent"
            />
            {hoveredId === 'archery' && (
              <circle
                cx="80"
                cy="275"
                r="25"
                fill="#ef4444"
                fillOpacity="0.2"
                stroke="#f87171"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}
          </g>

          {/* I. Riverside Trade Cargo & Barrels */}
          <g
            id="landmark-cargo"
            className="cursor-pointer group"
            onClick={handleCargoClick}
            onMouseEnter={() => setHoveredId('cargo')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <rect
              x="545"
              y="482"
              width="65"
              height="38"
              rx="6"
              fill="transparent"
            />
            {hoveredId === 'cargo' && (
              <g>
                <rect
                  x="543"
                  y="480"
                  width="69"
                  height="42"
                  rx="7"
                  fill="#f59e0b"
                  fillOpacity="0.25"
                  stroke="#fde047"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                  className="animate-pulse"
                />
              </g>
            )}
            {/* Top-placed label on hover or when showLabels */}
            {(showLabels || hoveredId === 'cargo') && (
              <g
                transform="translate(577, 466)"
                className="transition-transform duration-150 pointer-events-none"
                style={{ transform: hoveredId === 'cargo' ? 'translate(577px, 463px)' : undefined }}
              >
                <rect x="-48" y="-9" width="96" height="20" rx="4" fill="#000000" opacity="0.65" />
                <rect
                  x="-46"
                  y="-10"
                  width="92"
                  height="20"
                  rx="4"
                  fill="#0f172a"
                  stroke={hoveredId === 'cargo' ? '#f59e0b' : '#475569'}
                  strokeWidth="1.2"
                />
                <polygon
                  points="-4,10 0,14 4,10"
                  fill="#0f172a"
                  stroke={hoveredId === 'cargo' ? '#f59e0b' : '#475569'}
                  strokeWidth="1.2"
                />
                <circle cx="-35" cy="0" r="3" fill="#f59e0b" />
                <text
                  x="-27"
                  y="3.5"
                  fontSize="7"
                  fontWeight="bold"
                  fill={hoveredId === 'cargo' ? '#fef08a' : '#f8fafc'}
                  fontFamily="monospace"
                  letterSpacing="0.02em"
                >
                  TRADE BARRELS
                </text>
              </g>
            )}
          </g>

          {/* K. Northwest Mountain Pass Gate */}
          <g
            id="landmark-gate-northwest"
            className="cursor-pointer group"
            onClick={handleNorthwestGateClick}
            onMouseEnter={() => setHoveredId('gate-northwest')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <rect
              x="170"
              y="75"
              width="75"
              height="80"
              rx="6"
              fill="transparent"
            />
            {hoveredId === 'gate-northwest' && (
              <rect
                x="170"
                y="75"
                width="75"
                height="80"
                rx="6"
                fill="#94a3b8"
                fillOpacity="0.2"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}
          </g>

          {/* L. Royal South Gate */}
          <g
            id="landmark-gate-south"
            className="cursor-pointer group"
            onClick={handleSouthGateClick}
            onMouseEnter={() => setHoveredId('gate-south')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <rect
              x="470"
              y="640"
              width="75"
              height="75"
              rx="6"
              fill="transparent"
            />
            {hoveredId === 'gate-south' && (
              <rect
                x="470"
                y="640"
                width="75"
                height="75"
                rx="6"
                fill="#94a3b8"
                fillOpacity="0.2"
                stroke="#facc15"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}
          </g>

          {/* M. Crossroads Signpost */}
          <g
            id="landmark-crossroads"
            className="cursor-pointer group"
            onClick={handleCrossroadsClick}
            onMouseEnter={() => setHoveredId('crossroads')}
            onMouseLeave={() => setHoveredId(null)}
          >
            <circle
              cx="458"
              cy="420"
              r="22"
              fill="transparent"
            />
            {hoveredId === 'crossroads' && (
              <circle
                cx="458"
                cy="420"
                r="22"
                fill="#eab308"
                fillOpacity="0.2"
                stroke="#facc15"
                strokeWidth="2"
                strokeDasharray="3 2"
              />
            )}
          </g>

          {/* 4. INTERACTIVE VILLAGE PROPERTIES & BUILDINGS */}
          {properties.map((property) => {
            const box = buildingBoxes[property.id];
            if (!box) return null;

            const isSelected = selectedProperty?.id === property.id;
            const isHovered = hoveredId === property.id;

            return (
              <g
                key={property.id}
                id={`building-group-${property.id}`}
                className="cursor-pointer"
                onClick={(e) => handlePropertyClick(property, e)}
                onMouseEnter={() => setHoveredId(property.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Invisible Hitbox over the exact building in the map */}
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  rx="8"
                  fill="transparent"
                />

                {/* Golden RPG Highlight Boundary on Hover or Select */}
                {(isHovered || isSelected) && (
                  <g filter="url(#building-glow)">
                    <rect
                      x={box.x - 3}
                      y={box.y - 3}
                      width={box.w + 6}
                      height={box.h + 6}
                      rx="10"
                      fill="none"
                      stroke={isSelected ? '#f59e0b' : '#fde047'}
                      strokeWidth="2.5"
                      strokeDasharray={isSelected ? 'none' : '6 3'}
                      opacity={isSelected ? 0.95 : 0.85}
                    />
                    {/* Corner Target Accents */}
                    <path
                      d={`M ${box.x - 1} ${box.y + 10} L ${box.x - 1} ${box.y - 1} L ${box.x + 10} ${box.y - 1}`}
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <path
                      d={`M ${box.x + box.w - 10} ${box.y - 1} L ${box.x + box.w + 1} ${box.y - 1} L ${box.x + box.w + 1} ${box.y + 10}`}
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <path
                      d={`M ${box.x - 1} ${box.y + box.h - 10} L ${box.x - 1} ${box.y + box.h + 1} L ${box.x + 10} ${box.y + box.h + 1}`}
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    <path
                      d={`M ${box.x + box.w - 10} ${box.y + box.h + 1} L ${box.x + box.w + 1} ${box.y + box.h + 1} L ${box.x + box.w + 1} ${box.y + box.h - 10}`}
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      fill="none"
                    />
                  </g>
                )}

                {/* Pixel-Perfect RPG Nameplate Tag */}
                {(showLabels || isHovered || isSelected) && (() => {
                  const label = box.shortLabel;
                  // Calculate dynamic badge width based on monospace character count with padding
                  const badgeW = Math.max(90, label.length * 4.9 + 24);
                  const halfW = badgeW / 2;

                  return (
                    <g
                      transform={`translate(${box.tagX}, ${box.tagY})`}
                      className="transition-transform duration-150"
                      style={{ transform: isHovered ? `translate(${box.tagX}px, ${box.tagY - 3}px)` : undefined }}
                    >
                      {/* Drop shadow */}
                      <rect
                        x={-halfW - 2}
                        y="-9"
                        width={badgeW + 4}
                        height="20"
                        rx="4"
                        fill="#000000"
                        opacity="0.65"
                      />
                      {/* Badge container */}
                      <rect
                        x={-halfW}
                        y="-10"
                        width={badgeW}
                        height="20"
                        rx="4"
                        fill={isSelected ? '#1c1917' : '#0f172a'}
                        stroke={isSelected ? '#f59e0b' : isHovered ? '#fde047' : '#475569'}
                        strokeWidth={isSelected || isHovered ? '2' : '1.2'}
                      />
                      {/* Downward pointer notch */}
                      <polygon
                        points="-4,10 0,14 4,10"
                        fill={isSelected ? '#1c1917' : '#0f172a'}
                        stroke={isSelected ? '#f59e0b' : isHovered ? '#fde047' : '#475569'}
                        strokeWidth="1.2"
                      />
                      {/* Status dot */}
                      <circle
                        cx={-halfW + 10}
                        cy="0"
                        r="3"
                        fill={property.accentColor || '#f59e0b'}
                      />
                      {/* Compact, clean RPG label */}
                      <text
                        x={-halfW + 18}
                        y="3.5"
                        fontSize="7.2"
                        fontWeight="bold"
                        fill={isSelected ? '#fde047' : '#f8fafc'}
                        fontFamily="monospace"
                        letterSpacing="0.02em"
                      >
                        {box.shortLabel}
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })}

          {/* 5. CLICK RIPPLE RING (WHEN USER CLICKS TO WALK ON MAP) */}
          {clickPing && (
            <g transform={`translate(${clickPing.x}, ${clickPing.y})`}>
              <circle cx="0" cy="0" r="14" fill="none" stroke="#fde047" strokeWidth="2" opacity="0.8" className="animate-ping" />
              <circle cx="0" cy="0" r="4" fill="#f59e0b" />
            </g>
          )}

          {/* 6. HERO ADVENTURER SPRITE (RAFI) WITH WALKING ANIMATION */}
          <g
            id="village-hero-sprite"
            transform={`translate(${avatarPos.x}, ${avatarPos.y})`}
            className="transition-all duration-500 ease-out pointer-events-none"
          >
            {/* Ground shadow under character feet */}
            <ellipse cx="0" cy="8" rx="8" ry="3.5" fill="#000000" opacity="0.5" />

            <g className={isWalking ? 'animate-bounce' : ''}>
              {/* Boots */}
              <rect x="-4.5" y="4" width="3" height="4" rx="1" fill="#451a03" />
              <rect x="1.5" y="4" width="3" height="4" rx="1" fill="#451a03" />

              {/* Blue Adventurer Tunic */}
              <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#2563eb" stroke="#1e3a8a" strokeWidth="0.8" />
              {/* Golden Belt */}
              <rect x="-5" y="-1" width="10" height="1.8" fill="#facc15" />

              {/* Head */}
              <circle cx="0" cy="-9" r="4.8" fill="#fde68a" stroke="#78350f" strokeWidth="0.8" />
              {/* Adventurer Red Cap */}
              <ellipse cx="0" cy="-12.5" rx="5.2" ry="2.2" fill="#dc2626" />
              {/* Golden Feather */}
              <polygon points="1,-13.5 3,-19 2.5,-13.5" fill="#fef08a" />

              {/* Character Overhead Tag */}
              <g transform="translate(0, -22)">
                <rect
                  x="-18"
                  y="-6"
                  width="36"
                  height="11"
                  rx="2.5"
                  fill="#0f172a"
                  stroke="#f59e0b"
                  strokeWidth="0.9"
                  opacity="0.95"
                />
                <polygon points="-2,5 2,5 0,7" fill="#f59e0b" />
                <text
                  x="0"
                  y="1.8"
                  textAnchor="middle"
                  fontSize="6.2"
                  fontWeight="bold"
                  fill="#fde047"
                  fontFamily="monospace"
                >
                  {isWalking ? 'WALK...' : 'RAFI'}
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
