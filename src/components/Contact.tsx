
import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import ProjectCalculator from './ProjectCalculator';
import LottiePlayer from './LottiePlayer';
import { useOptimizedScroll } from '@/hooks/useOptimizedScroll';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useOptimizedScroll(sectionRef);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contacts = [
    {
      name: "Dr. Afnan Abdul",
      phone: "+918075447170",
      whatsapp: "918075447170"
    },
    {
      name: "Rabeeh Maprom", 
      phone: "+919633941567",
      whatsapp: "919633941567"
    },
    {
      name: "Dr. PT Abdul Rahman",
      phone: "+919895100002", 
      whatsapp: "919895100002"
    }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
      role="region"
      aria-labelledby="contact-heading"
    >
      <div className="container px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with Animation */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center lg:text-left">
              <h2 id="contact-heading" className="text-3xl md:text-4xl mb-6 reveal-on-scroll font-monument">Let's Build Together</h2>
              <div className="h-0.5 w-16 bg-moonscape-accent mx-auto lg:mx-0 mb-8 reveal-on-scroll"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed reveal-on-scroll">
                Ready to transform your vision into reality? Contact us today to discuss your project. Our experienced team is here to provide innovative solutions tailored to your specific needs and requirements.
              </p>
            </div>
            
            <div className="flex justify-center reveal-on-scroll">
              <LottiePlayer
                src="https://assets10.lottiefiles.com/packages/lf20_a3zkkhqn.json"
                className="w-full max-w-sm"
                style={{ height: '280px' }}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8 reveal-on-scroll">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-moonscape-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visit Our Office</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Moonscape Holdings<br />
                      Ottapalam, Palakkad<br />
                      Kerala, PIN 679501<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-moonscape-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="mailto:moonscapeholdings@gmail.com" className="hover:text-moonscape-accent transition-colors">
                        moonscapeholdings@gmail.com
                      </a><br />
                      <a href="mailto:info@moonscapeholdings.com" className="hover:text-moonscape-accent transition-colors">
                        info@moonscapeholdings.com
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Contact Persons */}
                <div className="space-y-6">
                  {contacts.map((contact, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 hexagon bg-moonscape-navy/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-moonscape-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{contact.name}</h3>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a 
                            href={`tel:${contact.phone}`} 
                            className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm"
                          >
                            <Phone size={14} />
                            Call
                          </a>
                          <a 
                            href={`https://wa.me/${contact.whatsapp}`} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
                          >
                            <MessageCircle size={14} />
                            WhatsApp
                          </a>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{contact.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-1 reveal-on-scroll">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-moonscape-navy/40 p-8 shadow-lg rounded-xl">
                <h3 className="text-2xl mb-6 font-semibold">Send us a message</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 dark:bg-moonscape-navy/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moonscape-accent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 dark:bg-moonscape-navy/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moonscape-accent transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 dark:border-gray-700 dark:bg-moonscape-navy/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moonscape-accent transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full border border-gray-300 dark:border-gray-700 dark:bg-moonscape-navy/70 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-moonscape-accent transition-colors resize-none"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-moonscape-navy text-white py-4 px-6 hover:bg-moonscape-blue transition-colors flex items-center justify-center gap-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-moonscape-accent focus:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>
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
      <div className="absolute -bottom-16 -right-16 w-48 h-48 hexagon border border-moonscape-blue/10 opacity-20" aria-hidden="true"></div>
    </section>
  );
};

export default Contact;
