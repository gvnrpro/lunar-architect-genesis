
import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    
    const revealElements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    revealElements?.forEach((el) => observer.observe(el));
    
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
            <div className="relative">
              <div className="hexagon w-20 h-20 bg-moonscape-accent absolute -top-10 -left-10 opacity-10"></div>
              <h2 className="text-3xl md:text-4xl mb-6 reveal-on-scroll">Our Vision</h2>
              <div className="h-0.5 w-16 bg-moonscape-accent mb-8 reveal-on-scroll"></div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 reveal-on-scroll">
                At Moonscape Holdings, we envision a future where architectural innovation meets sustainable development. 
                Our mission is to transform the urban landscape of Kerala and beyond with structures that stand as 
                testaments to human ingenuity and precision.
              </p>
              <p className="text-gray-600 dark:text-gray-300 reveal-on-scroll">
                Founded on principles of excellence and forward-thinking design, we bring together the finest 
                talents in construction, engineering, and project management to create spaces that inspire and endure.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 hexagon border border-moonscape-blue/30 opacity-50"></div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 hexagon border border-moonscape-blue/30 opacity-30"></div>
            
            <div className="grid grid-cols-2 gap-6 reveal-on-scroll">
              <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 mb-4 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center">
                  <span className="text-moonscape-accent text-xl font-bold">01</span>
                </div>
                <h3 className="text-xl mb-2">Precision</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Every detail matters in our construction process, from blueprint to completion.</p>
              </div>
              
              <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-shadow mt-10">
                <div className="w-12 h-12 mb-4 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center">
                  <span className="text-moonscape-accent text-xl font-bold">02</span>
                </div>
                <h3 className="text-xl mb-2">Innovation</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">We embrace cutting-edge technologies and methodologies in all our projects.</p>
              </div>
              
              <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 mb-4 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center">
                  <span className="text-moonscape-accent text-xl font-bold">03</span>
                </div>
                <h3 className="text-xl mb-2">Sustainability</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">We design with the future in mind, prioritizing eco-friendly solutions.</p>
              </div>
              
              <div className="bg-white dark:bg-moonscape-navy/40 p-6 shadow-lg hover:shadow-xl transition-shadow mt-10">
                <div className="w-12 h-12 mb-4 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center">
                  <span className="text-moonscape-accent text-xl font-bold">04</span>
                </div>
                <h3 className="text-xl mb-2">Excellence</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">We never compromise on quality, delivering excellence in every project.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
