export interface Theme {
  name: string;
  gradients: [string, string, string, string];
  overlay?: 'noise' | 'pulse' | 'grain';
  keywords: string[];
}

export const THEMES: Record<string, Theme> = {
  cyberpunk: {
    name: "Cyberpunk",
    gradients: ["320 100% 60%", "280 100% 65%", "340 90% 55%", "300 95% 60%"],
    overlay: 'noise',
    keywords: ["cyber", "neon", "digital", "tech", "futuristic", "hacker", "matrix"],
  },
  forest: {
    name: "Forest",
    gradients: ["150 60% 25%", "140 70% 20%", "160 50% 30%", "145 65% 22%"],
    overlay: undefined,
    keywords: ["forest", "nature", "green", "woods", "trees", "earth", "natural", "organic"],
  },
  deepSea: {
    name: "Deep Sea",
    gradients: ["200 80% 20%", "180 70% 30%", "210 60% 25%", "190 75% 28%"],
    overlay: 'pulse',
    keywords: ["ocean", "sea", "water", "deep", "blue", "aqua", "marine", "underwater"],
  },
  sunset: {
    name: "Sunset",
    gradients: ["15 90% 55%", "0 85% 50%", "35 80% 60%", "20 88% 52%"],
    overlay: undefined,
    keywords: ["sunset", "warm", "orange", "red", "gold", "evening", "dusk", "amber"],
  },
  minimalist: {
    name: "Minimalist",
    gradients: ["0 0% 95%", "0 0% 90%", "0 0% 92%", "0 0% 88%"],
    overlay: 'grain',
    keywords: ["minimal", "simple", "clean", "white", "light", "calm", "zen", "pure"],
  },
};

export function matchMoodToTheme(mood: string): Theme {
  const lowerMood = mood.toLowerCase().trim();

  for (const [_, theme] of Object.entries(THEMES)) {
    if (theme.keywords.some(keyword => lowerMood.includes(keyword))) {
      return theme;
    }
  }

  return THEMES.minimalist;
}

export function getThemeStyle(theme: Theme) {
  return {
    background: `linear-gradient(-45deg, hsl(${theme.gradients[0]}), hsl(${theme.gradients[1]}), hsl(${theme.gradients[2]}), hsl(${theme.gradients[3]}), hsl(${theme.gradients[0]}))`,
    backgroundSize: "400% 400%",
  };
}
