"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { SearchBar } from '../components/SearchBar';
import { ServiceCard } from '../components/ServiceCard';

// Mock Data
const serviceCategories = [
  { id: 1, name: 'Home Cleaning', icon: '🏠', color: 'bg-blue-100' },
  { id: 2, name: 'Beauty & Salon', icon: '💇', color: 'bg-pink-100' },
  { id: 3, name: 'AC Repair', icon: '❄️', color: 'bg-cyan-100' },
  { id: 4, name: 'Plumbing', icon: '🔧', color: 'bg-orange-100' },
  { id: 5, name: 'Electrical', icon: '⚡', color: 'bg-yellow-100' },
  { id: 6, name: 'Painting', icon: '🎨', color: 'bg-purple-100' },
  { id: 7, name: 'Carpentry', icon: '🪵', color: 'bg-amber-100' },
  { id: 8, name: 'Pest Control', icon: '🐛', color: 'bg-green-100' },
];


const LandingPage = ({ onNavigate, onSearch }) => {
  const router = useRouter();

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Check if a query exists before navigating
    if (query) {
      // Constructs the path: /search?q=user+query
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      // Navigate to the search page without a query if the search box is empty
      router.push('/search');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find & Book Local Services
            <span className="block text-blue-600 mt-2">With Ease</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect with trusted professionals for home cleaning, beauty, repairs, and more. Book instantly!
          </p>
          <div className="flex justify-center mb-16">
            <SearchBar onSearch={handleSearch} placeholder="Search for services like 'Salon', 'AC Repair'..." />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: '10,000+', desc: 'Service Providers' },
              { label: '50+', desc: 'Service Categories' },
              { label: '4.8★', desc: 'Average Rating' },
              { label: '24/7', desc: 'Support Available' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-2">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {serviceCategories.map((category) => (
              <ServiceCard
                key={category.id}
                category={category}
                onClick={() => onNavigate('search', { category: category.name })}
              />
            ))}
          </div>
        </div>

        <div className="py-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white my-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Book your first service today and experience hassle-free living</p>
          <button
            onClick={() => onNavigate('search')}
            className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-xl transition-all text-lg"
          >
            Explore All Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;