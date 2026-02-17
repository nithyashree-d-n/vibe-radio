import { useState } from "react";
import { Play, Radio } from "lucide-react";

const Index = () => {
  const [mood, setMood] = useState("");
  const [videoQuery, setVideoQuery] = useState("");

  const handlePlay = () => {
    if (!mood.trim()) return;
    setVideoQuery(`lofi ${mood.trim()} livestream`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handlePlay();
  };

  const embedUrl = videoQuery
    ? `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(videoQuery)}`
    : "";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="animated-gradient fixed inset-0 opacity-30" />
      <div className="fixed inset-0 bg-background/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-2xl">
        {/* Logo / Title */}
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

        {/* Input + Play */}
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
            onClick={handlePlay}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
          >
            <Play className="w-5 h-5 ml-0.5" />
          </button>
        </div>

        {/* Player */}
        {videoQuery && (
          <div className="glass rounded-2xl p-3 w-full max-w-md animate-fade-in">
            <div className="rounded-xl overflow-hidden aspect-video">
              <iframe
                src={embedUrl}
                title="Vibe Radio Player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
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
