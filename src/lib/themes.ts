export interface Theme {
  name: string;
  id: string;
  gradient: string;
  accent: string;
}

export const THEMES: Record<string, Theme> = {
  Cyberpunk: {
    name: "Cyberpunk",
    id: "jfKfPfyJRdk",
    gradient: "linear-gradient(to bottom, #2d0b3d, #000000)",
    accent: "#ff00ff",
  },
  Rainy: {
    name: "Rainy",
    id: "mPZkdNFkNps",
    gradient: "linear-gradient(to bottom, #1e293b, #0f172a)",
    accent: "#60a5fa",
  },
  Zen: {
    name: "Zen",
    id: "hlWiI4xVXKY",
    gradient: "linear-gradient(to bottom, #134e4a, #064e3b)",
    accent: "#34d399",
  },
  Midnight: {
    name: "Midnight",
    id: "jfKfPfyJRdk",
    gradient: "linear-gradient(to bottom, #000000, #1e1b4b)",
    accent: "#a78bfa",
  },
  Sunset: {
    name: "Sunset",
    id: "jfKfPfyJRdk",
    gradient: "linear-gradient(to bottom, #7c2d12, #1c1917)",
    accent: "#fb923c",
  },
  Ocean: {
    name: "Ocean",
    id: "jfKfPfyJRdk",
    gradient: "linear-gradient(to bottom, #164e63, #0c4a6e)",
    accent: "#22d3ee",
  },
};

export function matchMoodToTheme(mood: string): Theme {
  const lower = mood.toLowerCase().trim();
  const keywords: Record<string, string> = {
    cyber: "Cyberpunk", neon: "Cyberpunk", digital: "Cyberpunk", tech: "Cyberpunk",
    rain: "Rainy", storm: "Rainy", thunder: "Rainy", cloudy: "Rainy",
    zen: "Zen", calm: "Zen", peace: "Zen", meditat: "Zen", forest: "Zen", nature: "Zen",
    midnight: "Midnight", night: "Midnight", dark: "Midnight", sleep: "Midnight",
    sunset: "Sunset", warm: "Sunset", orange: "Sunset", evening: "Sunset",
    ocean: "Ocean", sea: "Ocean", water: "Ocean", beach: "Ocean", wave: "Ocean",
  };
  for (const [kw, themeName] of Object.entries(keywords)) {
    if (lower.includes(kw)) return THEMES[themeName];
  }
  return THEMES.Midnight;
}
