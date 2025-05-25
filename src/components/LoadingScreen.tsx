
import { useEffect, useState } from 'react';
import LogoAnimation from './LogoAnimation';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 300);
    }, 500);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white dark:bg-moonscape-charcoal flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center">
        <LogoAnimation onAnimationComplete={handleAnimationComplete} />
        <div className="mt-6">
          <div className="text-sm text-moonscape-navy dark:text-white font-medium">
            Moonscape Holdings
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Building the Future
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
