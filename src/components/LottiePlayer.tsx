
import { useEffect, useRef, useState } from 'react';

interface LottiePlayerProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  loop?: boolean;
  autoplay?: boolean;
}

const LottiePlayer = ({ 
  src, 
  className = "", 
  style = {}, 
  speed = 1, 
  loop = true, 
  autoplay = true 
}: LottiePlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if lottie-player script is already loaded
    if (!window.customElements.get('lottie-player')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      script.onload = () => setIsLoaded(true);
      script.onerror = () => setHasError(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`} style={style}>
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏗️</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Animation unavailable</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} style={style}>
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading animation...</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      <lottie-player
        src={src}
        background="transparent"
        speed={speed}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottiePlayer;
