export interface MoodSuggestion {
  label: string;
  emoji: string;
  gradients: [string, string, string, string]; // HSL values for 4 gradient stops
}

const MOOD_MAP: Record<string, MoodSuggestion[]> = {
  earlyMorning: [
    { label: "Gym Mode", emoji: "💪", gradients: ["10 80% 50%", "30 90% 55%", "350 60% 40%", "20 70% 45%"] },
    { label: "Morning Run", emoji: "🏃", gradients: ["35 85% 55%", "50 80% 50%", "15 70% 45%", "40 75% 50%"] },
    { label: "Sunrise Calm", emoji: "🌅", gradients: ["30 90% 50%", "45 80% 55%", "10 60% 40%", "55 70% 50%"] },
    { label: "Wake Up Energy", emoji: "⚡", gradients: ["45 90% 55%", "60 80% 50%", "25 70% 45%", "50 85% 52%"] },
  ],
  morning: [
    { label: "Focused Work", emoji: "🎯", gradients: ["210 50% 35%", "230 45% 30%", "190 40% 28%", "220 55% 32%"] },
    { label: "Coffee & Code", emoji: "☕", gradients: ["25 60% 30%", "35 50% 25%", "15 45% 28%", "30 55% 27%"] },
    { label: "Productive Flow", emoji: "🧠", gradients: ["200 55% 32%", "220 50% 28%", "180 40% 30%", "210 60% 30%"] },
    { label: "Creative Mode", emoji: "🎨", gradients: ["280 50% 40%", "310 45% 35%", "260 40% 38%", "290 55% 37%"] },
  ],
  afternoon: [
    { label: "Chill Vibes", emoji: "😎", gradients: ["180 50% 35%", "200 45% 30%", "160 40% 32%", "190 55% 33%"] },
    { label: "Deep Focus", emoji: "📚", gradients: ["220 45% 28%", "240 40% 25%", "200 35% 27%", "230 50% 26%"] },
    { label: "Ambient Work", emoji: "🌿", gradients: ["140 40% 30%", "160 35% 28%", "120 30% 32%", "150 45% 29%"] },
    { label: "Mellow Beats", emoji: "🎵", gradients: ["260 40% 35%", "280 35% 30%", "240 30% 33%", "270 45% 32%"] },
  ],
  evening: [
    { label: "Relaxing", emoji: "🌙", gradients: ["240 50% 25%", "260 45% 20%", "220 40% 22%", "250 55% 23%"] },
    { label: "Dinner Mood", emoji: "🍷", gradients: ["350 50% 30%", "10 45% 25%", "340 40% 28%", "0 55% 27%"] },
    { label: "Sunset Lounge", emoji: "🌇", gradients: ["15 70% 40%", "35 65% 35%", "350 55% 38%", "25 75% 37%"] },
    { label: "Wind Down", emoji: "🧘", gradients: ["260 35% 22%", "280 30% 18%", "240 25% 20%", "270 40% 19%"] },
  ],
  lateEvening: [
    { label: "Party Mode", emoji: "🎉", gradients: ["320 80% 50%", "280 70% 45%", "340 75% 48%", "300 85% 47%"] },
    { label: "Night Drive", emoji: "🚗", gradients: ["240 60% 20%", "260 55% 18%", "220 50% 22%", "250 65% 19%"] },
    { label: "Social Vibes", emoji: "✨", gradients: ["290 65% 45%", "320 60% 40%", "270 55% 42%", "310 70% 43%"] },
    { label: "Dance Floor", emoji: "💃", gradients: ["330 75% 48%", "350 70% 42%", "310 65% 45%", "340 80% 44%"] },
  ],
  lateNight: [
    { label: "Late Night Study", emoji: "📖", gradients: ["230 40% 15%", "250 35% 12%", "210 30% 14%", "240 45% 13%"] },
    { label: "Midnight Coding", emoji: "💻", gradients: ["200 50% 18%", "220 45% 14%", "180 40% 16%", "210 55% 15%"] },
    { label: "Insomnia Radio", emoji: "🌌", gradients: ["260 45% 16%", "280 40% 12%", "240 35% 14%", "270 50% 13%"] },
    { label: "3AM Thoughts", emoji: "💭", gradients: ["250 35% 14%", "270 30% 10%", "230 25% 12%", "260 40% 11%"] },
  ],
};

function getTimeSlot(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return "earlyMorning";
  if (hour >= 8 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  if (hour >= 20 && hour < 23) return "lateEvening";
  return "lateNight";
}

export function getMoodSuggestions(): MoodSuggestion[] {
  return MOOD_MAP[getTimeSlot()];
}

export const DEFAULT_GRADIENTS: [string, string, string, string] = [
  "270 80% 60%",
  "340 70% 50%",
  "200 80% 40%",
  "160 60% 35%",
];
