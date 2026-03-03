import { useState, useMemo } from "react";
import { Play, Radio, SkipForward } from "lucide-react";
import { getMoodSuggestions } from "@/lib/moods";
import { THEMES, matchMoodToTheme, type Theme } from "@/lib/themes";

const Index = () => {
  const [mood, setMood] = useState("");
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES.Midnight);
  const [isPlaying, setIsPlaying] = useState(false);
  const suggestions = useMemo(() => getMoodSuggestions(), []);

  const handlePlay = (moodText?: string) => {
    const query = (moodText ?? mood).trim();
    if (!query) return;
    if (moodText) setMood(moodText);

    const matched = matchMoodToTheme(query);
    setActiveTheme(matched);
    setIsPlaying(true);
  };

  const handleThemeClick = (themeName: string) => {
    setActiveTheme(THEMES[themeName]);
    setMood(themeName.toLowerCase());
    setIsPlaying(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handlePlay();
  };

  const iframeSrc = isPlaying
    ? `https://www.youtube-nocookie.com/embed/${activeTheme.id}?autoplay=1&mute=1`
    : "";

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: activeTheme.gradient,
        minHeight: "100vh",
        transition: "all 0.5s ease",
      }}
    >
      <div className="fixed inset-0 bg-black/40" />

      <div className="relative z-50 flex flex-col items-center gap-8 px-4 w-full max-w-2xl">
        {/* Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Radio className="w-8 h-8 animate-pulse" style={{ color: activeTheme.accent }} />
            <h1
              className="text-5xl sm:text-6xl font-bold tracking-tight"
              style={{ color: activeTheme.accent }}
            >
              Vibe Radio
            </h1>
          </div>
          <p className="text-white/60 text-sm tracking-widest uppercase">
            Type a mood. Find your frequency.
          </p>
        </div>

        {/* Search bar */}
        <div className="glass flex items-center gap-2 p-2 rounded-2xl w-full max-w-md">
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="cyber, rainy, zen, midnight..."
            className="glass-input flex-1 px-4 py-3 rounded-xl text-sm outline-none bg-transparent border-none"
          />
          <button
            onClick={() => handlePlay()}
            className="flex items-center justify-center w-12 h-12 rounded-xl text-black hover:opacity-90 transition-opacity shrink-0"
            style={{ backgroundColor: activeTheme.accent }}
          >
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        </div>

        {/* Mood suggestion chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {suggestions.map((s) => (
            <button
              key={s.label}
              onClick={() => handlePlay(s.label)}
              className="glass px-4 py-2 rounded-full text-sm text-white/70 hover:text-white transition-all duration-300 flex items-center gap-1.5"
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Theme buttons */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {Object.keys(THEMES).map((name) => (
            <button
              key={name}
              onClick={() => handleThemeClick(name)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                border: `1px solid ${THEMES[name].accent}`,
                color: THEMES[name].accent,
                background:
                  activeTheme.name === name ? `${THEMES[name].accent}22` : "transparent",
              }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Player */}
        {isPlaying && (
          <div className="glass rounded-2xl p-3 w-full max-w-md animate-fade-in">
            <div className="rounded-xl overflow-hidden aspect-video bg-black/50">
              <iframe
                src={iframeSrc}
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
                className="w-full h-full"
              />
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-white/50 text-xs tracking-wide">
                Now vibing:{" "}
                <span className="text-white">{mood || "midnight"}</span>
                <span className="ml-2" style={{ color: activeTheme.accent }}>
                  ({activeTheme.name})
                </span>
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${activeTheme.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Open in YouTube</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
