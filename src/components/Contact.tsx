
import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Building2 } from 'lucide-react';
import ProjectCalculator from './ProjectCalculator';
import OptimizedScrollReveal from './OptimizedScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
      className="section-padding relative overflow-hidden bg-gray-50 dark:bg-moonscape-navy/20"
      role="region"
      aria-labelledby="contact-heading"
    >
      <div className="container px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with Visual */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center lg:text-left">
              <OptimizedScrollReveal>
                <h2 id="contact-heading" className="text-3xl md:text-4xl mb-6 font-monument">Let's Build Together</h2>
                <div className="h-0.5 w-16 bg-moonscape-accent mx-auto lg:mx-0 mb-8"></div>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Ready to transform your vision into reality? Contact us today to discuss your project. Our experienced team is here to provide innovative solutions tailored to your specific needs and requirements.
                </p>
              </OptimizedScrollReveal>
            </div>
            
            <OptimizedScrollReveal delay={200}>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md h-80 flex items-center justify-center">
                  {/* Contact Visual Icons */}
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="text-center">
                      <div className="bg-moonscape-navy dark:bg-moonscape-accent/20 rounded-full p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center shadow-lg">
                        <Building2 size={32} className="text-moonscape-accent" />
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Expert Team</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-moonscape-blue dark:bg-moonscape-blue/20 rounded-full p-6 mb-4 mx-auto w-24 h-24 flex items-center justify-center shadow-xl transform scale-110">
                        <Phone size={40} className="text-white dark:text-moonscape-accent" />
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">24/7 Support</p>
                    </div>
                    
                    <div className="text-center col-span-2">
                      <div className="bg-moonscape-accent dark:bg-moonscape-accent/20 rounded-full p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center shadow-lg">
                        <Mail size={32} className="text-white dark:text-moonscape-accent" />
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Quick Response</p>
                    </div>
                  </div>
                  
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-moonscape-blue/5 to-moonscape-accent/5 rounded-full blur-2xl"></div>
                </div>
              </div>
            </OptimizedScrollReveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <OptimizedScrollReveal delay={400}>
                <div className="space-y-8">
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
              </OptimizedScrollReveal>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-1">
              <OptimizedScrollReveal delay={600}>
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
              </OptimizedScrollReveal>
            </div>

            {/* Project Calculator */}
            <div className="lg:col-span-1">
              <OptimizedScrollReveal delay={800}>
                <ProjectCalculator />
              </OptimizedScrollReveal>
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
