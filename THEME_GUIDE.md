# Theme Engine Guide

## Available Themes

The app now features a smart theme engine that automatically matches your mood search to one of five distinct visual themes:

### 1. Cyberpunk
- **Colors**: Neon pink and purple gradients
- **Effect**: Digital noise overlay
- **Keywords**: cyber, neon, digital, tech, futuristic, hacker, matrix
- **Example**: Type "cyberpunk beats" or "neon nights"

### 2. Forest
- **Colors**: Deep emerald and moss green gradients
- **Effect**: None (clean)
- **Keywords**: forest, nature, green, woods, trees, earth, natural, organic
- **Example**: Type "forest sounds" or "nature vibes"

### 3. Deep Sea
- **Colors**: Dark navy to teal gradient
- **Effect**: Slow underwater pulse animation
- **Keywords**: ocean, sea, water, deep, blue, aqua, marine, underwater
- **Example**: Type "ocean waves" or "deep blue"

### 4. Sunset
- **Colors**: Warm orange, red, and gold gradient
- **Effect**: None (clean)
- **Keywords**: sunset, warm, orange, red, gold, evening, dusk, amber
- **Example**: Type "sunset chill" or "golden hour"

### 5. Minimalist (Default)
- **Colors**: Soft whites and light grays
- **Effect**: Subtle grain texture
- **Keywords**: minimal, simple, clean, white, light, calm, zen, pure
- **Example**: Type "minimal beats" or "clean vibes"

## How It Works

1. Type any mood in the search box
2. The app analyzes your input for theme keywords
3. The background automatically transitions to the matching theme
4. If no keywords match, it defaults to Minimalist theme
5. The current theme name is displayed below the player

## Technical Details

- Theme transitions take 2 seconds for smooth visual changes
- Overlay effects are CSS-based for optimal performance
- Gradients use HSL color space for rich, vibrant colors
- All themes maintain the glassmorphism effect on UI elements
