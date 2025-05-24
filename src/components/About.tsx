
import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    console.log('About component mounted');
    
    // Simple intersection observer for reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            console.log('About section revealed');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    
    const revealElements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    revealElements?.forEach((el) => observer.observe(el));
    
    // Value counters animation
    const valueCounters = sectionRef.current?.querySelectorAll('.value-counter');
    valueCounters?.forEach((counter) => {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              let currentValue = 0;
              const increment = target / 50;
              
              const updateCounter = () => {
                currentValue += increment;
                if (currentValue < target) {
                  counter.textContent = Math.ceil(currentValue).toString();
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target.toString();
                }
              };
              
              updateCounter();
              counterObserver.unobserve(counter);
            }
          });
        },
        { threshold: 0.5 }
      );
      
      counterObserver.observe(counter);
    });
    
    return () => {
      revealElements?.forEach((el) => observer.unobserve(el));
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
            <ScrollReveal delay={100}>
              <h2 className="text-3xl md:text-4xl mb-6 font-monument">Our Vision</h2>
              <div className="h-0.5 w-16 bg-moonscape-accent mb-8"></div>
              
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed reveal-on-scroll">
                  At <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">Moonscape Holdings</span>, we envision a future where architectural innovation meets sustainable development. 
                  Our mission is to transform the urban landscape of Kerala and beyond with structures that stand as 
                  testaments to <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">human ingenuity</span> and <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">precision</span>.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed reveal-on-scroll">
                  Founded on principles of excellence and forward-thinking design, we bring together the finest 
                  talents in construction, engineering, and project management to create spaces that <span className="text-moonscape-navy dark:text-moonscape-accent font-medium">inspire and endure</span>.
                </p>
              </div>
              
              {/* Key metrics */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-white dark:bg-moonscape-navy/30 p-6 shadow-md rounded-sm hover:shadow-lg transition-shadow">
                  <div className="value-counter text-3xl font-monument text-moonscape-accent mb-2" data-target="15">15</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Years of Excellence</div>
                </div>
                <div className="bg-white dark:bg-moonscape-navy/30 p-6 shadow-md rounded-sm hover:shadow-lg transition-shadow">
                  <div className="value-counter text-3xl font-monument text-moonscape-accent mb-2" data-target="120">120</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Projects Completed</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="relative">
            <ScrollReveal direction="right" delay={200}>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-sm">
                  <div className="w-12 h-12 mb-4 hexagon bg-moonscape-accent/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xl font-bold group-hover:scale-110 transition-transform duration-300">01</span>
                  </div>
                  <h3 className="text-xl mb-2 font-medium">Precision</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Every detail matters in our construction process, from blueprint to completion.</p>
                  <div className="w-0 h-0.5 bg-moonscape-accent mt-3 group-hover:w-full transition-all duration-500"></div>
                </div>
                
                <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300 mt-8 group rounded-sm">
                  <div className="w-12 h-12 mb-4 hexagon bg-moonscape-accent/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xl font-bold group-hover:scale-110 transition-transform duration-300">02</span>
                  </div>
                  <h3 className="text-xl mb-2 font-medium">Innovation</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">We embrace cutting-edge technologies and methodologies in all our projects.</p>
                  <div className="w-0 h-0.5 bg-moonscape-accent mt-3 group-hover:w-full transition-all duration-500"></div>
                </div>
                
                <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-sm">
                  <div className="w-12 h-12 mb-4 hexagon bg-moonscape-accent/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xl font-bold group-hover:scale-110 transition-transform duration-300">03</span>
                  </div>
                  <h3 className="text-xl mb-2 font-medium">Sustainability</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">We design with the future in mind, prioritizing eco-friendly solutions.</p>
                  <div className="w-0 h-0.5 bg-moonscape-accent mt-3 group-hover:w-full transition-all duration-500"></div>
                </div>
                
                <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-all duration-300 mt-8 group rounded-sm">
                  <div className="w-12 h-12 mb-4 hexagon bg-moonscape-accent/10 flex items-center justify-center">
                    <span className="text-moonscape-accent text-xl font-bold group-hover:scale-110 transition-transform duration-300">04</span>
                  </div>
                  <h3 className="text-xl mb-2 font-medium">Excellence</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">We never compromise on quality, delivering excellence in every project.</p>
                  <div className="w-0 h-0.5 bg-moonscape-accent mt-3 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 hexagon border border-moonscape-blue/10 opacity-30 animate-float"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 hexagon border border-moonscape-blue/10 opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default About;
