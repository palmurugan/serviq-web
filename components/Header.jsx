"use client"
import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User, ArrowRight, Award, IndianRupee } from 'lucide-react';

export const Header = ({ currentPage, onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SB</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ServiceBook</span>
            </div>
  
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => onNavigate('home')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'home'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('search')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'search'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Services
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                About
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Sign In
              </button>
            </nav>
  
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
  
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    onNavigate('search');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Services
                </button>
                <button className="text-left text-sm font-medium text-gray-700 hover:text-blue-600">
                  About
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-left">
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  };