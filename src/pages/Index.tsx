import { useState, useMemo } from "react";
import { Play, Radio } from "lucide-react";
import { getMoodSuggestions, DEFAULT_GRADIENTS, type MoodSuggestion } from "@/lib/moods";

const Index = () => {
  const [mood, setMood] = useState("");
  const [videoQuery, setVideoQuery] = useState("");
  const [gradients, setGradients] = useState(DEFAULT_GRADIENTS);
  const suggestions = useMemo(() => getMoodSuggestions(), []);

  const handlePlay = (moodText?: string) => {
    const query = (moodText ?? mood).trim();
    if (!query) return;
    if (moodText) setMood(moodText);
    setVideoQuery(`lofi ${query} livestream`);
  };

  const handleSuggestionClick = (s: MoodSuggestion) => {
    setGradients(s.gradients);
    handlePlay(s.label);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handlePlay();
  };

  const youtubeSearchUrl = videoQuery
    ? `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(videoQuery)}`
    : "";

  const gradientStyle = {
    background: `linear-gradient(-45deg, hsl(${gradients[0]}), hsl(${gradients[1]}), hsl(${gradients[2]}), hsl(${gradients[3]}), hsl(${gradients[0]}))`,
    backgroundSize: "400% 400%",
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="animated-gradient fixed inset-0 opacity-30 transition-all duration-[2000ms]" style={gradientStyle} />
      <div className="fixed inset-0 bg-background/80" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <Radio className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
              Vibe Radio
            </h1>
          </div>
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Type a mood. Find your frequency.
          </p>
        </div>

        <div className="glass flex items-center gap-2 p-2 rounded-2xl w-full max-w-md">
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="chill, rainy, midnight study..."
            className="glass-input flex-1 px-4 py-3 rounded-xl text-sm outline-none bg-transparent border-none backdrop-blur-none"
          />
          <button
            onClick={() => handlePlay()}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
          >
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {suggestions.map((s) => (
            <button
              key={s.label}
              onClick={() => handleSuggestionClick(s)}
              className="glass px-4 py-2 rounded-full text-sm text-foreground/80 hover:text-foreground hover:border-primary/30 transition-all duration-300 flex items-center gap-1.5"
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {videoQuery && (
          <div className="glass rounded-2xl p-3 w-full max-w-md animate-fade-in">
            <div className="rounded-xl overflow-hidden aspect-video">
              <iframe
                src={youtubeSearchUrl}
                title="Vibe Radio Player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
              />
            </div>
            <p className="text-center text-muted-foreground text-xs mt-3 tracking-wide">
              Now vibing: <span className="text-foreground">{mood}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
