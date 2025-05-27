
import { useState, useEffect } from 'react';
import { Filter, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  status: string;
  metrics?: {
    area?: string;
    value?: string;
    duration?: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Skyline Business Complex',
    category: 'Commercial',
    location: 'Kochi, Kerala',
    year: '2023',
    description: 'A modern 15-story business complex featuring sustainable design and smart building technologies.',
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    status: 'Completed',
    metrics: { area: '2.5M sq ft', value: '₹250 Cr', duration: '24 months' }
  },
  {
    id: 2,
    title: 'Heritage Residential Towers',
    category: 'Residential',
    location: 'Trivandrum, Kerala',
    year: '2023',
    description: 'Luxury residential towers with traditional Kerala architecture blended with modern amenities.',
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    status: 'Ongoing',
    metrics: { area: '1.8M sq ft', value: '₹180 Cr', duration: '30 months' }
  },
  {
    id: 3,
    title: 'Green Valley Infrastructure',
    category: 'Infrastructure',
    location: 'Calicut, Kerala',
    year: '2022',
    description: 'Comprehensive infrastructure development including roads, bridges, and utilities.',
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    status: 'Completed',
    metrics: { area: '50 km network', value: '₹120 Cr', duration: '18 months' }
  },
  {
    id: 4,
    title: 'Eco-Smart Campus',
    category: 'Educational',
    location: 'Thrissur, Kerala',
    year: '2024',
    description: 'State-of-the-art educational campus with sustainable building practices and smart technologies.',
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    status: 'Planning',
    metrics: { area: '3.2M sq ft', value: '₹300 Cr', duration: '36 months' }
  },
];

const categories = ['All', 'Commercial', 'Residential', 'Infrastructure', 'Educational'];

const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mr-4">
          <Filter size={16} />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 touch-button ${
              selectedCategory === category
                ? 'bg-moonscape-accent text-white transform scale-105'
                : 'bg-white dark:bg-moonscape-navy/40 text-gray-600 dark:text-gray-300 hover:bg-moonscape-accent/10 hover:scale-105'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`group bg-white dark:bg-moonscape-navy/40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => setSelectedProject(project)}
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={20} className="text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-moonscape-accent text-sm font-medium">{project.category}</span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar size={12} />
                  {project.year}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-moonscape-accent transition-colors line-clamp-2">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-4">
                <MapPin size={12} />
                {project.location}
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {project.metrics.area && (
                    <div className="text-center p-2 bg-gray-50 dark:bg-moonscape-navy/60 rounded">
                      <div className="font-medium text-moonscape-accent">{project.metrics.area}</div>
                      <div className="text-gray-500">Area</div>
                    </div>
                  )}
                  {project.metrics.value && (
                    <div className="text-center p-2 bg-gray-50 dark:bg-moonscape-navy/60 rounded">
                      <div className="font-medium text-moonscape-accent">{project.metrics.value}</div>
                      <div className="text-gray-500">Value</div>
                    </div>
                  )}
                  {project.metrics.duration && (
                    <div className="text-center p-2 bg-gray-50 dark:bg-moonscape-navy/60 rounded">
                      <div className="font-medium text-moonscape-accent">{project.metrics.duration}</div>
                      <div className="text-gray-500">Duration</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white dark:bg-moonscape-navy max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-moonscape-accent font-medium">{selectedProject.category}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 dark:text-gray-400">{selectedProject.year}</span>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
              <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400">
                <MapPin size={16} />
                {selectedProject.location}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>
              {selectedProject.metrics && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedProject.metrics.area && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-moonscape-navy/40 rounded-lg">
                      <div className="text-xl font-bold text-moonscape-accent">{selectedProject.metrics.area}</div>
                      <div className="text-gray-500">Total Area</div>
                    </div>
                  )}
                  {selectedProject.metrics.value && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-moonscape-navy/40 rounded-lg">
                      <div className="text-xl font-bold text-moonscape-accent">{selectedProject.metrics.value}</div>
                      <div className="text-gray-500">Project Value</div>
                    </div>
                  )}
                  {selectedProject.metrics.duration && (
                    <div className="text-center p-4 bg-gray-50 dark:bg-moonscape-navy/40 rounded-lg">
                      <div className="text-xl font-bold text-moonscape-accent">{selectedProject.metrics.duration}</div>
                      <div className="text-gray-500">Duration</div>
                    </div>
                  )}
                </div>
              )}
              <button className="w-full bg-moonscape-accent text-white py-3 rounded-lg hover:bg-moonscape-blue transition-colors">
                Get Similar Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
