
import { useEffect, useRef } from 'react';
import ProjectCalculator from './ProjectCalculator';

const Contact = () => {
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
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
    >
      <div className="container px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 reveal-on-scroll">Contact Us</h2>
            <div className="h-0.5 w-16 bg-moonscape-accent mx-auto mb-8 reveal-on-scroll"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed reveal-on-scroll max-w-2xl mx-auto">
              Ready to transform your vision into reality? Our team is ready to discuss your project needs 
              and provide innovative solutions tailored to your requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-6 reveal-on-scroll">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-moonscape-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Moonscape Headquarters<br />
                      123 Business Park, Kochi<br />
                      Kerala, India 682030
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-moonscape-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      info@moonscapeholdings.com<br />
                      projects@moonscapeholdings.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-moonscape-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +91 484 1234 5678<br />
                      +91 9876 543 210
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-1 reveal-on-scroll">
              <form className="bg-white dark:bg-moonscape-navy/40 p-8 shadow-lg rounded-xl">
                <h3 className="text-2xl mb-6">Send us a message</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full border border-gray-300 dark:border-gray-700 dark:bg-moonscape-navy/70 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-moonscape-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 dark:border-gray-700 dark:bg-moonscape-navy/70 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-moonscape-accent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full border border-gray-300 dark:border-gray-700 dark:bg-moonscape-navy/70 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-moonscape-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full border border-gray-300 dark:border-gray-700 dark:bg-moonscape-navy/70 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-moonscape-accent"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-moonscape-navy text-white py-3 px-4 hover:bg-moonscape-blue transition-colors flex items-center justify-center gap-2 rounded-lg"
                    >
                      Send Message
                      <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Project Calculator */}
            <div className="lg:col-span-1 reveal-on-scroll">
              <ProjectCalculator />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 hexagon border border-moonscape-blue/10 opacity-20"></div>
    </section>
  );
};

export default Contact;
