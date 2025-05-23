
import { useEffect, useRef, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ScrollReveal from './ScrollReveal';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const expertiseAreas = [
  {
    id: 1,
    title: 'Urban Development',
    description: 'We craft comprehensive city-scale projects that shape modern urban landscapes, creating sustainable communities that thrive for generations.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="15" width="8" height="20" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.2s' }} />
        <rect x="16" y="5" width="8" height="30" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.4s' }} />
        <rect x="27" y="10" width="8" height="25" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.6s' }} />
      </svg>
    ),
    details: "Our urban development projects reimagine city spaces as interconnected ecosystems where architecture, mobility, and sustainability converge. We specialize in master planning that anticipates the future needs of growing urban populations.",
    stats: [
      { label: "Projects Completed", value: "42" },
      { label: "Area Developed", value: "8.5M sq.ft" },
      { label: "Sustainability Rating", value: "Platinum" }
    ],
    keyFeatures: ["Integrated Public Transport", "Green Spaces", "Mixed-Use Development", "Sustainable Infrastructure"]
  },
  {
    id: 2,
    title: 'Commercial Builds',
    description: 'We design state-of-the-art commercial spaces that balance stunning aesthetics with optimal functionality to drive business growth.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="30" height="25" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.2s' }} />
        <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.4s' }} />
        <line x1="20" y1="20" x2="20" y2="35" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.6s' }} />
      </svg>
    ),
    details: "From corporate headquarters to retail environments, our commercial spaces are designed to reflect brand identity while maximizing operational efficiency. We incorporate smart building technologies that reduce energy costs and enhance user experience.",
    stats: [
      { label: "Office Buildings", value: "37" },
      { label: "Retail Spaces", value: "45+" },
      { label: "Energy Efficiency", value: "40% Better" }
    ],
    keyFeatures: ["Smart Building Systems", "Flexible Floor Plans", "Visual Identity Integration", "Energy Efficient Design"]
  },
  {
    id: 3,
    title: 'Infrastructure',
    description: 'We develop critical infrastructure projects that connect communities and power economic development with precision engineering.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 30L20 10L35 30" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.2s' }} />
        <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.4s' }} />
      </svg>
    ),
    details: "Our infrastructure projects are the backbone of urban and regional development. We build bridges, highways, and utility systems that are not just functional but environmentally conscious and aesthetically impressive, enhancing the fabric of the communities they serve.",
    stats: [
      { label: "Bridges Built", value: "17" },
      { label: "Road Networks", value: "320 km" },
      { label: "Public Facilities", value: "28" }
    ],
    keyFeatures: ["Eco-Friendly Materials", "Advanced Engineering", "Public Safety Focus", "Long-Term Durability"]
  },
  {
    id: 4,
    title: 'Smart Living Projects',
    description: 'We create residential developments that seamlessly integrate cutting-edge technology with sustainable design for modern living.',
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5L35 15V35H5V15L20 5Z" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.2s' }} />
        <rect x="15" y="25" width="10" height="10" stroke="currentColor" strokeWidth="2" className="animate-draw" style={{ animationDelay: '0.4s' }} />
      </svg>
    ),
    details: "Our smart living projects combine luxury and innovation, with homes that anticipate residents' needs through automation, energy efficiency, and thoughtful design. We create living spaces that are both comfortable sanctuaries and technological marvels.",
    stats: [
      { label: "Residential Units", value: "1,250+" },
      { label: "Smart Home Features", value: "35+" },
      { label: "Green Space Ratio", value: "40%" }
    ],
    keyFeatures: ["Home Automation", "Energy Management", "Biophilic Design", "Community Spaces"]
  },
];

const Expertise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeExpertise, setActiveExpertise] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  
  useEffect(() => {
    // Add SVG animation
    const svgPaths = document.querySelectorAll('.animate-draw');
    svgPaths.forEach((path) => {
      const pathLength = (path as SVGPathElement).getTotalLength ? 
                        (path as SVGPathElement).getTotalLength() : 
                        500;
      
      path.setAttribute('stroke-dasharray', pathLength.toString());
      path.setAttribute('stroke-dashoffset', pathLength.toString());
    });

    // Check if the URL points to this section and scroll into view
    if (window.location.hash === '#expertise' && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const toggleExpertise = (id: number) => {
    if (activeExpertise === id) {
      setActiveExpertise(null);
    } else {
      setActiveExpertise(id);
    }
  };

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Our Areas of Expertise"
    >
      <div className="container px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight">Our Expertise</h2>
            <div className="h-0.5 w-16 bg-moonscape-accent mx-auto mb-8"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              We specialize in a diverse range of construction and development services, delivering exceptional 
              results across various sectors with <span className="text-moonscape-accent font-medium">precision</span> and <span className="text-moonscape-accent font-medium">innovation</span>.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseAreas.map((area, index) => (
            <ScrollReveal key={area.id} delay={index * 150} direction="up" cascade={index > 1}>
              <Collapsible
                open={activeExpertise === area.id}
                onOpenChange={() => toggleExpertise(area.id)}
                className="bg-white dark:bg-moonscape-navy/40 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden border border-transparent hover:border-moonscape-blue/10 dark:hover:border-moonscape-accent/10 rounded-sm"
              >
                <CollapsibleTrigger asChild>
                  <div className="p-8 cursor-pointer">
                    <div className="text-moonscape-blue dark:text-moonscape-accent mb-6 group-hover:text-moonscape-accent dark:group-hover:text-white transition-colors relative">
                      {area.icon}
                      <div className="absolute w-16 h-16 -top-8 -right-8 hexagon border border-moonscape-blue/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{area.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{area.description}</p>
                    
                    {/* Toggle indicator */}
                    <div className="mt-4 flex items-center text-xs text-moonscape-accent gap-1">
                      {activeExpertise === area.id ? (
                        <>
                          <span>Show less</span>
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <span>Discover more</span>
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="border-t border-gray-200 dark:border-gray-700">
                  <div className="p-6">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                      <TabsList className="grid grid-cols-2 mb-4 bg-gray-100 dark:bg-moonscape-navy/60">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="stats">Key Stats</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                        <p>{area.details}</p>
                        <div>
                          <h4 className="text-xs uppercase tracking-wider font-medium mb-2 text-moonscape-blue dark:text-moonscape-accent">Key Features</h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {area.keyFeatures.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-1 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                      <TabsContent value="stats">
                        <div className="grid grid-cols-3 gap-2">
                          {area.stats.map((stat, idx) => (
                            <Card key={idx} className="text-center overflow-hidden border-moonscape-blue/10 dark:border-moonscape-accent/10">
                              <CardContent className="p-4">
                                <p className="text-lg font-semibold text-moonscape-accent">{stat.value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{stat.label}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CollapsibleContent>
                
                {/* Decorative lunar surface at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-moonscape-accent/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Collapsible>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={400}>
          <div className="mt-16 text-center">
            <Button 
              asChild
              className="border-2 border-moonscape-navy dark:border-moonscape-silver px-8 py-6 hover:bg-moonscape-navy hover:text-white dark:hover:bg-moonscape-silver dark:hover:text-moonscape-charcoal transition-colors group relative overflow-hidden"
              variant="outline"
              size="lg"
            >
              <a href="#projects" className="flex items-center gap-2">
                <span className="relative z-10">View Our Projects</span>
                <span className="w-1.5 h-1.5 rounded-full bg-moonscape-accent inline-block group-hover:animate-pulse"></span>
                
                {/* Hover animation */}
                <span className="absolute inset-0 bg-moonscape-navy dark:bg-moonscape-silver transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Enhanced background elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 hexagon border border-moonscape-blue/10 opacity-50"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 hexagon border border-moonscape-blue/10 opacity-30"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 hexagon border border-moonscape-accent/10 opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Particles container */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particles-container"></div>
      </div>
    </section>
  );
};

export default Expertise;
