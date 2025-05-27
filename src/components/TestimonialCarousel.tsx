
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    position: 'CEO',
    company: 'TechCorp Solutions',
    content: 'Moonscape Holdings delivered our corporate headquarters on time and within budget. Their attention to detail and innovative approach exceeded our expectations.',
    rating: 5,
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    project: 'Skyline Business Complex'
  },
  {
    id: 2,
    name: 'Priya Nair',
    position: 'Project Director',
    company: 'Kerala State Development',
    content: 'The infrastructure project was completed with exceptional quality. Moonscape\'s team demonstrated professionalism and expertise throughout the entire process.',
    rating: 5,
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    project: 'Green Valley Infrastructure'
  },
  {
    id: 3,
    name: 'Dr. Suresh Menon',
    position: 'Chairman',
    company: 'Stellar Properties',
    content: 'Outstanding residential development with perfect blend of modern amenities and traditional architecture. Highly recommend Moonscape Holdings.',
    rating: 5,
    image: '/lovable-uploads/358657be-4f35-4b8d-807b-0ed74908d702.png',
    project: 'Heritage Residential Towers'
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}
      />
    ));
  };

  return (
    <div className="relative bg-gray-50 dark:bg-moonscape-navy/20 rounded-xl p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <Quote size={200} className="absolute top-4 left-4 text-moonscape-accent" />
        <Quote size={150} className="absolute bottom-4 right-4 text-moonscape-blue transform rotate-180" />
      </div>

      {/* Testimonial Content */}
      <div 
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <div className="max-w-4xl mx-auto text-center">
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-moonscape-accent/10 flex items-center justify-center">
                    <div className="text-moonscape-accent font-bold text-xl">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-moonscape-navy dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonial.position}, {testimonial.company}
                    </p>
                    <p className="text-moonscape-accent text-xs mt-1">
                      Project: {testimonial.project}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prevTestimonial}
          className="w-12 h-12 rounded-full bg-white dark:bg-moonscape-navy shadow-lg flex items-center justify-center hover:bg-moonscape-accent hover:text-white transition-all duration-300 touch-button"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-moonscape-accent scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-moonscape-accent/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          className="w-12 h-12 rounded-full bg-white dark:bg-moonscape-navy shadow-lg flex items-center justify-center hover:bg-moonscape-accent hover:text-white transition-all duration-300 touch-button"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Auto-play indicator */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-moonscape-accent transition-colors"
        >
          {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
