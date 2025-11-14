"use client"

import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Check, ArrowRight, Award, Shield, Zap, TrendingUp, Users, Phone, Mail, Play, ChevronLeft, ChevronRight, Quote, Sparkles, BadgeCheck, Headphones, CreditCard, Filter } from 'lucide-react';

// Mock data for services
const popularServices = [
  {
    id: 1,
    name: 'Home Cleaning',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
    rating: 4.8,
    bookings: '15,234',
    startingPrice: 499,
    description: 'Professional deep cleaning services',
    discount: '20% OFF',
  },
  {
    id: 2,
    name: 'AC Repair & Service',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1631545806609-c2e0f4c81bc0?w=400&q=80',
    rating: 4.9,
    bookings: '12,456',
    startingPrice: 399,
    description: 'Expert AC maintenance & repair',
    discount: '15% OFF',
  },
  {
    id: 3,
    name: 'Beauty & Salon',
    icon: '💇',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
    rating: 4.7,
    bookings: '18,923',
    startingPrice: 599,
    description: 'Professional salon at your doorstep',
  },
  {
    id: 4,
    name: 'Plumbing',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&q=80',
    rating: 4.6,
    bookings: '9,876',
    startingPrice: 299,
    description: 'Emergency plumbing services',
  },
  {
    id: 5,
    name: 'Electrical',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80',
    rating: 4.8,
    bookings: '11,234',
    startingPrice: 349,
    description: 'Licensed electricians available',
  },
  {
    id: 6,
    name: 'Painting',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80',
    rating: 4.7,
    bookings: '8,567',
    startingPrice: 899,
    description: 'Professional painters with warranty',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff',
    rating: 5,
    text: "Absolutely fantastic service! The cleaning crew was professional, punctual, and left my house spotless. I've been using ServiceBook for 6 months now and couldn't be happier.",
    service: 'Home Cleaning',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=10b981&color=fff',
    rating: 5,
    text: 'The AC repair service was quick and efficient. They diagnosed the problem immediately and fixed it on the spot. Great value for money and excellent customer service.',
    service: 'AC Repair',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Working Professional',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=f59e0b&color=fff',
    rating: 5,
    text: 'The salon service at home was a game-changer for me. Professional staff, quality products, and the convenience of not having to travel. Highly recommend!',
    service: 'Beauty & Salon',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All service providers are background-checked and verified for your safety',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: '30-day service guarantee on all bookings with free re-service if needed',
  },
  {
    icon: Clock,
    title: 'On-Time Service',
    description: 'Punctual professionals or we compensate you for the delay',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Multiple payment options with 100% secure transactions',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your queries',
  },
  {
    icon: BadgeCheck,
    title: 'Best Price Promise',
    description: 'Competitive pricing with transparent cost breakdown',
  },
];

const stats = [
  { value: '500K+', label: 'Happy Customers' },
  { value: '50K+', label: 'Verified Professionals' },
  { value: '2M+', label: 'Services Completed' },
  { value: '4.8★', label: 'Average Rating' },
];

// Hero Section with Large Search
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Professional Services',
      subtitle: 'At Your Doorstep',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80',
      gradient: 'from-blue-600 to-purple-600',
    },
    {
      title: 'Book Trusted Experts',
      subtitle: 'In Minutes',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Quality You Can Trust',
      subtitle: 'Every Time',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80',
      gradient: 'from-pink-600 to-red-600',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">India's #1 Home Services Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                {heroSlides[currentSlide].subtitle}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
              Book trusted professionals for cleaning, repairs, beauty & more
            </p>

            {/* Large Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-3 md:p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Service Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for services (e.g., AC Repair, Salon)"
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Location */}
                  <div className="md:w-64 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Your location"
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Search Button */}
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all text-lg font-semibold flex items-center justify-center gap-2 hover:scale-105">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-2 mt-4 px-2">
                  <span className="text-sm text-gray-600">Popular:</span>
                  {['Home Cleaning', 'AC Repair', 'Salon', 'Plumbing', 'Electrician'].map((service) => (
                    <button
                      key={service}
                      className="px-3 py-1 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full text-sm transition-colors"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-white' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Section
const StatsSection = () => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-white/90 text-sm md:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Popular Services Section
const PopularServicesSection = () => (
  <div className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Most Booked Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust us for their home service needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {service.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {service.discount}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                <span className="text-3xl">{service.icon}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{service.description}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{service.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  {service.bookings} bookings
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-blue-600">₹{service.startingPrice}</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors font-semibold text-lg flex items-center gap-2 mx-auto">
          View All Services
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

// Features Section
const FeaturesSection = () => (
  <div className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Choose ServiceBook?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're committed to providing you the best service experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Testimonials Section
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Real experiences from real customers
          </p>
        </div>

        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
              <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-200" />

              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full border-4 border-blue-600"
                />
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600 mb-2">{testimonials[currentIndex].role}</p>
                  <div className="flex items-center gap-1 justify-center md:justify-start">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                <Check className="w-4 h-4" />
                Verified {testimonials[currentIndex].service} Customer
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'w-8 bg-blue-600' : 'bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// CTA Section
const CTASection = () => (
  <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Ready to Experience Premium Service?
      </h2>
      <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
        Join 500,000+ happy customers and book your first service today
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-2xl transition-all text-lg font-semibold flex items-center justify-center gap-2 hover:scale-105">
          Browse Services
          <ArrowRight className="w-5 h-5" />
        </button>
        <button className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all text-lg font-semibold flex items-center justify-center gap-2">
          <Play className="w-5 h-5" />
          Watch How It Works
        </button>
      </div>
    </div>
  </div>
);

// Main Landing Page Component
const ProfessionalLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <PopularServicesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default ProfessionalLandingPage;