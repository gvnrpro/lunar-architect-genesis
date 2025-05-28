
import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Mail, X, Send } from 'lucide-react';

const FloatingContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 500;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Widget Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Contact Form */}
        <div className={`mb-4 transition-all duration-300 transform origin-bottom-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}>
          <div className="bg-white dark:bg-moonscape-navy rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 max-w-[calc(100vw-3rem)]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-semibold text-moonscape-navy dark:text-white">
                  Quick Contact
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We'll get back to you within 24 hours
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-moonscape-navy/50 text-sm focus:outline-none focus:ring-2 focus:ring-moonscape-accent"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-moonscape-navy/50 text-sm focus:outline-none focus:ring-2 focus:ring-moonscape-accent"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-moonscape-navy/50 text-sm focus:outline-none focus:ring-2 focus:ring-moonscape-accent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-moonscape-accent text-white py-2 rounded-lg hover:bg-moonscape-blue transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <a
                    href="mailto:moonscapeholdings@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
                  >
                    <Mail size={14} />
                    Email
                  </a>
                </div>
                
                {/* Contact persons with WhatsApp */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Contact Our Team:</p>
                  {contacts.map((contact, index) => (
                    <div key={index} className="flex gap-1">
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex-1 flex items-center justify-center gap-1 py-1 px-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded text-xs hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                      >
                        <Phone size={10} />
                        {contact.name.split(' ')[0]}
                      </a>
                      <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 py-1 px-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <MessageCircle size={10} />
                        WA
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 bg-moonscape-accent hover:bg-moonscape-blue text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
            isOpen ? 'rotate-180' : 'hover:scale-110'
          }`}
          aria-label="Contact us"
        >
          {isOpen ? (
            <X size={24} className="transition-transform duration-300" />
          ) : (
            <MessageCircle size={24} className="transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>

        {/* Pulse animation for new visitors */}
        {!isOpen && (
          <div className="absolute inset-0 w-16 h-16 bg-moonscape-accent rounded-full animate-ping opacity-20"></div>
        )}
      </div>
    </>
  );
};

export default FloatingContactWidget;
