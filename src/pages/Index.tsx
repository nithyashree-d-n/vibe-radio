import { useState, useMemo } from "react";
import { Play, Radio, SkipForward } from "lucide-react";
import { getMoodSuggestions } from "@/lib/moods";
import { matchMoodToTheme, DEFAULT_THEME, type Theme } from "@/lib/themes";

const Index = () => {
  const [mood, setMood] = useState("");
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);
  const [activeVideoId, setActiveVideoId] = useState("");
  const [videoIndex, setVideoIndex] = useState(0);
  const suggestions = useMemo(() => getMoodSuggestions(), []);

  const handlePlay = (moodText?: string) => {
    const query = (moodText ?? mood).trim();
    if (!query) return;
    if (moodText) setMood(moodText);

    const theme = matchMoodToTheme(query);
    const idx = 0;
    setCurrentTheme(theme);
    setVideoIndex(idx);
    setActiveVideoId(theme.videoIds[idx]);
  };

  const handleTryAnother = () => {
    const nextIdx = (videoIndex + 1) % currentTheme.videoIds.length;
    setVideoIndex(nextIdx);
    setActiveVideoId(currentTheme.videoIds[nextIdx]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handlePlay();
  };

  const iframeSrc = activeVideoId
    ? `https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&mute=1&origin=${window.location.origin}`
    : "";

  return (
    <div
      style={{
        background: currentTheme.gradient,
        minHeight: "100vh",
        transition: "background 0.5s ease",
      }}
      className="flex flex-col items-center justify-center overflow-hidden relative"
    >
      <div className="relative z-50 flex flex-col items-center gap-8 px-4 w-full max-w-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Radio className="w-8 h-8 text-white/80 animate-pulse" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
              Vibe Radio
            </h1>
          </div>
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Type a mood. Find your frequency.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-2xl w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10">
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="cyber, rainy, zen, midnight..."
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none bg-transparent text-white placeholder:text-white/40"
          />
          <button
            onClick={() => handlePlay()}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors shrink-0"
          >
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {suggestions.map((s) => (
            <button
              key={s.label}
              onClick={() => handlePlay(s.label)}
              className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-1.5"
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {activeVideoId && (
          <div className="rounded-2xl p-3 w-full max-w-md animate-fade-in bg-black/30 backdrop-blur-md border border-white/10">
            <div className="rounded-xl overflow-hidden aspect-video bg-black/50">
              <iframe
                src={iframeSrc}
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
                className="w-full h-full"
              />
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <p className="text-white/50 text-xs tracking-wide">
                Now vibing: <span className="text-white">{mood || "lofi"}</span>
                <span className="text-white/40 ml-2">({currentTheme.name})</span>
              </p>
              <button
                onClick={handleTryAnother}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Try another</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
