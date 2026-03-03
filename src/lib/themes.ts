export interface Theme {
  name: string;
  gradient: string;
  videoIds: string[];
  keywords: string[];
}

export const THEMES: Record<string, Theme> = {
  cyberpunk: {
    name: "Cyberpunk",
    gradient: "linear-gradient(to bottom, #2d0b3d, #000000)",
    videoIds: ["jfKfPfyJRdk", "4xDzrJKXOOY"],
    keywords: ["cyber", "neon", "digital", "tech", "futuristic", "hacker", "matrix", "synthwave"],
  },
  rainy: {
    name: "Rainy",
    gradient: "linear-gradient(to bottom, #1e293b, #334155)",
    videoIds: ["hBg0-64pC8E", "56vVIn3p3_E"],
    keywords: ["rain", "rainy", "storm", "cloudy", "grey", "melancholy", "cozy"],
  },
  zen: {
    name: "Zen",
    gradient: "linear-gradient(to bottom, #064e3b, #14532d)",
    videoIds: ["5yx6BWV8_80", "DWcJFNfaw9c"],
    keywords: ["zen", "calm", "peaceful", "nature", "forest", "green", "garden", "organic", "trees"],
  },
  midnight: {
    name: "Midnight",
    gradient: "linear-gradient(to bottom, #020617, #1e1b4b)",
    videoIds: ["n61ULEU7QD4", "tNkZsRW7h2c"],
    keywords: ["midnight", "night", "dark", "space", "deep", "ocean", "sea", "blue", "sunset"],
  },
};

export const DEFAULT_THEME = THEMES.midnight;

export function matchMoodToTheme(mood: string): Theme {
  const lower = mood.toLowerCase().trim();
  for (const theme of Object.values(THEMES)) {
    if (theme.keywords.some(k => lower.includes(k))) return theme;
  }
  return DEFAULT_THEME;
}
