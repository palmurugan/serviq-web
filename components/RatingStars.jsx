"use client"
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User } from 'lucide-react';

export const RatingStars = ({ rating, reviews }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">
          {rating} ({reviews})
        </span>
      </div>
    );
  };