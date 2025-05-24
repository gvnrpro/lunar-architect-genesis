
import { useEffect, useState } from 'react';

const LunarNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: 'home', name: 'Home', phase: 'new' },
    { id: 'about', name: 'About', phase: 'waxing-crescent' },
    { id: 'expertise', name: 'Expertise', phase: 'first-quarter' },
    { id: 'projects', name: 'Projects', phase: 'waxing-gibbous' },
    { id: 'clients', name: 'Clients', phase: 'full' },
    { id: 'contact', name: 'Contact', phase: 'waning-gibbous' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getMoonPhase = (phase: string, isActive: boolean) => {
    const baseClasses = "w-4 h-4 rounded-full border border-moonscape-blue/30 relative overflow-hidden transition-all duration-500";
    const activeClasses = isActive ? "border-moonscape-accent shadow-lg" : "";

    return (
      <div className={`${baseClasses} ${activeClasses}`}>
        <div 
          className={`absolute inset-0 bg-moonscape-accent transition-all duration-500 ${
            isActive ? 'opacity-100' : 'opacity-20'
          }`}
          style={{
            clipPath: phase === 'new' ? 'circle(0%)' :
                     phase === 'waxing-crescent' ? 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' :
                     phase === 'first-quarter' ? 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' :
                     phase === 'waxing-gibbous' ? 'polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%)' :
                     phase === 'full' ? 'circle(50%)' :
                     'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)'
          }}
        />
      </div>
    );
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 bg-white/80 dark:bg-moonscape-charcoal/80 backdrop-blur-sm rounded-full py-4 px-3 shadow-lg">
      {/* Progress indicator */}
      <div className="w-0.5 h-20 bg-gray-200 dark:bg-gray-700 rounded-full relative">
        <div 
          className="absolute top-0 w-full bg-moonscape-accent rounded-full transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Lunar phase navigation */}
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group relative"
            title={section.name}
          >
            {getMoonPhase(section.phase, activeSection === section.id)}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-moonscape-navy text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {section.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LunarNavigation;
