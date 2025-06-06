
import { Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-moonscape-charcoal text-white pt-16 pb-8">
      <div className="container px-6 md:px-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 hexagon bg-white flex items-center justify-center">
                <div className="w-4 h-4 hexagon bg-moonscape-navy"></div>
              </div>
              <span className="font-monument text-xl tracking-wider">MOONSCAPE</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transforming visions into architectural realities with precision, innovation, and excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-700 hover:border-moonscape-accent hover:text-moonscape-accent transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-700 hover:border-moonscape-accent hover:text-moonscape-accent transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-700 hover:border-moonscape-accent hover:text-moonscape-accent transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-moonscape-accent transition-colors">About Us</a>
              </li>
              <li>
                <a href="#expertise" className="text-gray-400 hover:text-moonscape-accent transition-colors">Our Expertise</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-moonscape-accent transition-colors">Projects</a>
              </li>
              <li>
                <a href="#clients" className="text-gray-400 hover:text-moonscape-accent transition-colors">Clients</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-moonscape-accent transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Office Location</p>
                <p className="text-white text-sm">
                  Ottapalam, Palakkad<br />
                  Kerala, PIN 679501
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Email</p>
                <a href="mailto:moonscapeholdings@gmail.com" className="text-moonscape-accent hover:text-white transition-colors text-sm">
                  moonscapeholdings@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-6">Reach Our Team</h3>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-white text-sm font-medium">{contact.name}</p>
                  <div className="flex gap-2">
                    <a 
                      href={`tel:${contact.phone}`} 
                      className="inline-flex items-center gap-1 bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs hover:bg-green-600/30 transition-colors"
                    >
                      <Phone size={10} />
                      Call
                    </a>
                    <a 
                      href={`https://wa.me/${contact.whatsapp}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs hover:bg-blue-600/30 transition-colors"
                    >
                      <MessageCircle size={10} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Moonscape Holdings. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
