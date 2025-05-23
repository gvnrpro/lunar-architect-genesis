
import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Add line drawing animation for hexagons
    const hexOutlines = document.querySelectorAll('.hex-outline');
    hexOutlines.forEach((hex) => {
      hex.classList.add('animate-draw-hex');
    });
    
    // Value counters animation
    const valueCounters = document.querySelectorAll('.value-counter');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target') || '0');
            const duration = 2000; // ms
            const stepTime = 20; // ms
            const totalSteps = duration / stepTime;
            const stepValue = target / totalSteps;
            let currentValue = 0;
            
            const updateCounter = () => {
              currentValue += stepValue;
              if (currentValue < target) {
                counter.textContent = Math.ceil(currentValue).toString();
                setTimeout(updateCounter, stepTime);
              } else {
                counter.textContent = target.toString();
              }
            };
            
            updateCounter();
            observer.unobserve(counter);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
    
    valueCounters.forEach((counter) => {
      observer.observe(counter);
    });
    
    return () => {
      valueCounters.forEach((counter) => {
        observer.unobserve(counter);
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
    >
      <div className="container px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="relative">
              <div className="hexagon w-20 h-20 bg-moonscape-accent absolute -top-10 -left-10 opacity-10"></div>
              
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl mb-6">Our Vision</h2>
                <div className="h-0.5 w-16 bg-moonscape-accent mb-8"></div>
                
                <div className="animate-on-scroll">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line" style={{ '--line-index': 0 } as React.CSSProperties}>
                    At <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">Moonscape Holdings</span>, we envision a future where architectural innovation meets sustainable development. 
                    Our mission is to transform the urban landscape of Kerala and beyond with structures that stand as 
                    testaments to <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">human ingenuity</span> and <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">precision</span>.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 line" style={{ '--line-index': 1 } as React.CSSProperties}>
                    Founded on principles of excellence and forward-thinking design, we bring together the finest 
                    talents in construction, engineering, and project management to create spaces that <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">inspire and endure</span>.
                  </p>
                </div>
                
                {/* Key metrics with animated counters */}
                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="bg-white dark:bg-moonscape-navy/30 p-4 shadow-md">
                    <div className="value-counter text-3xl font-monument text-moonscape-accent mb-1" data-target="15">0</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Years of Excellence</div>
                  </div>
                  <div className="bg-white dark:bg-moonscape-navy/30 p-4 shadow-md">
                    <div className="value-counter text-3xl font-monument text-moonscape-accent mb-1" data-target="120">0</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Projects Completed</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 hexagon border border-moonscape-blue/30 opacity-50 hex-outline"></div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 hexagon border border-moonscape-blue/30 opacity-30 hex-outline"></div>
            
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-shadow group">
                  <div className="w-12 h-12 mb-4 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xl font-bold group-hover:scale-110 transition-transform duration-300">01</span>
                  </div>
                  <h3 className="text-xl mb-2">Precision</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Every detail matters in our construction process, from blueprint to completion.</p>
                  
                  {/* Animated underline on hover */}
                  <div className="w-0 h-0.5 bg-moonscape-accent mt-2 group-hover:w-full transition-all duration-500"></div>
                </div>
                
                <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-shadow mt-10 group">
                  <div className="w-12 h-12 mb-4 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xl font-bold group-hover:scale-110 transition-transform duration-300">02</span>
                  </div>
                  <h3 className="text-xl mb-2">Innovation</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">We embrace cutting-edge technologies and methodologies in all our projects.</p>
                  
                  {/* Animated underline on hover */}
                  <div className="w-0 h-0.5 bg-moonscape-accent mt-2 group-hover:w-full transition-all duration-500"></div>
                </div>
                
                <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-shadow group">
                  <div className="w-12 h-12 mb-4 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xl font-bold group-hover:scale-110 transition-transform duration-300">03</span>
                  </div>
                  <h3 className="text-xl mb-2">Sustainability</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">We design with the future in mind, prioritizing eco-friendly solutions.</p>
                  
                  {/* Animated underline on hover */}
                  <div className="w-0 h-0.5 bg-moonscape-accent mt-2 group-hover:w-full transition-all duration-500"></div>
                </div>
                
                <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-shadow mt-10 group">
                  <div className="w-12 h-12 mb-4 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xl font-bold group-hover:scale-110 transition-transform duration-300">04</span>
                  </div>
                  <h3 className="text-xl mb-2">Excellence</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">We never compromise on quality, delivering excellence in every project.</p>
                  
                  {/* Animated underline on hover */}
                  <div className="w-0 h-0.5 bg-moonscape-accent mt-2 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Blueprint animation in background */}
            <div className="absolute inset-0 blueprint-grid opacity-10 -z-10"></div>
          </div>
        </div>
      </div>
      
      {/* Lunar phases animation in the background */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 lunar-phases-bg"></div>
    </section>
  );
};

export default About;
