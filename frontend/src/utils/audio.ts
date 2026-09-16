// Web Audio API ambient & interaction sound synthesizer (zero external dependencies)
let audioCtx: AudioContext | null = null;
let isMuted = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleMuteSound(): boolean {
  isMuted = !isMuted;
  if (!isMuted) {
    playVillageChime();
  }
  return isMuted;
}

export function getIsMuted(): boolean {
  return isMuted;
}

// Gentle pleasant chime when opening a property widget
export function playVillageChime() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Two-tone soft wooden marimba / bell
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5

    osc2.frequency.setValueAtTime(659.25, now);
    osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.18); // G5

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } catch {
    // AudioContext blocked or not supported
  }
}

// Soft footstep / road traversal tick
export function playFootstepSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Ignore audio error
  }
}

// Wishing well coin drop + gentle splash
export function playWellCoinSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Coin chime
    const coin = ctx.createOscillator();
    const coinGain = ctx.createGain();
    coin.type = 'sine';
    coin.frequency.setValueAtTime(1200, now);
    coin.frequency.exponentialRampToValueAtTime(1800, now + 0.08);
    coinGain.gain.setValueAtTime(0.08, now);
    coinGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    coin.connect(coinGain);
    coinGain.connect(ctx.destination);
    coin.start(now);
    coin.stop(now + 0.16);

    // Water ripple splash
    const splash = ctx.createOscillator();
    const splashGain = ctx.createGain();
    splash.type = 'triangle';
    splash.frequency.setValueAtTime(320, now + 0.12);
    splash.frequency.exponentialRampToValueAtTime(160, now + 0.35);
    splashGain.gain.setValueAtTime(0.001, now);
    splashGain.gain.setValueAtTime(0.06, now + 0.12);
    splashGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    splash.connect(splashGain);
    splashGain.connect(ctx.destination);
    splash.start(now + 0.12);
    splash.stop(now + 0.4);
  } catch {
    // Ignore error
  }
}

// Archery target arrow release & thwack
export function playArrowSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Bow string twang
    const bow = ctx.createOscillator();
    const bowGain = ctx.createGain();
    bow.type = 'sawtooth';
    bow.frequency.setValueAtTime(440, now);
    bow.frequency.exponentialRampToValueAtTime(220, now + 0.09);
    bowGain.gain.setValueAtTime(0.06, now);
    bowGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    bow.connect(bowGain);
    bowGain.connect(ctx.destination);
    bow.start(now);
    bow.stop(now + 0.1);

    // Target thwack (wood impact)
    const hit = ctx.createOscillator();
    const hitGain = ctx.createGain();
    hit.type = 'triangle';
    hit.frequency.setValueAtTime(180, now + 0.11);
    hit.frequency.exponentialRampToValueAtTime(60, now + 0.22);
    hitGain.gain.setValueAtTime(0.09, now + 0.11);
    hitGain.gain.exponentialRampToValueAtTime(0.001, now + 0.23);
    hit.connect(hitGain);
    hitGain.connect(ctx.destination);
    hit.start(now + 0.11);
    hit.stop(now + 0.25);
  } catch {
    // Ignore error
  }
}

// Gentle river flowing / water splash
export function playWaterSplashSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const splash1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    splash1.type = 'sine';
    splash1.frequency.setValueAtTime(480, now);
    splash1.frequency.exponentialRampToValueAtTime(240, now + 0.18);
    gain1.gain.setValueAtTime(0.07, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    splash1.connect(gain1);
    gain1.connect(ctx.destination);
    splash1.start(now);
    splash1.stop(now + 0.2);

    const splash2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    splash2.type = 'triangle';
    splash2.frequency.setValueAtTime(320, now + 0.08);
    splash2.frequency.exponentialRampToValueAtTime(140, now + 0.28);
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.setValueAtTime(0.06, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    splash2.connect(gain2);
    gain2.connect(ctx.destination);
    splash2.start(now + 0.08);
    splash2.stop(now + 0.32);
  } catch {
    // Ignore error
  }
}

// Foliage / vegetable garden rustle
export function playRustleSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.linearRampToValueAtTime(420, now + 0.06);
    osc.frequency.linearRampToValueAtTime(280, now + 0.15);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.19);
  } catch {
    // Ignore error
  }
}

// Wood chopping stump sound
export function playWoodChopSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // Ignore error
  }
}

// Cargo barrels & crate clink
export function playCargoSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.1);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  } catch {
    // Ignore error
  }
}

// Heavy stone fortress gate sound
export function playGateSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.1);
    osc.frequency.linearRampToValueAtTime(110, now + 0.25);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  } catch {
    // Ignore error
  }
}
