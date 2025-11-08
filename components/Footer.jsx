"use client"
import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User, ArrowRight, Award, IndianRupee } from 'lucide-react';

export const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SB</span>
                </div>
                <span className="text-xl font-bold">ServiceBook</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted platform for booking local services with ease.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Home Cleaning</li>
                <li className="hover:text-white cursor-pointer transition-colors">Beauty & Salon</li>
                <li className="hover:text-white cursor-pointer transition-colors">Repairs</li>
                <li className="hover:text-white cursor-pointer transition-colors">All Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 ServiceBook. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };