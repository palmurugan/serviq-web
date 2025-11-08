"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User, ArrowRight, Award, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { SearchBar } from '../../components/SearchBar';

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

const providers = [
    {
        id: 1,
        name: 'Sparkle Clean Services',
        service: 'Home Cleaning',
        rating: 4.8,
        reviews: 234,
        price: 799,
        image: '🏠',
        description: 'Professional home cleaning services with eco-friendly products. Our experienced team ensures your home is spotless.',
        experience: '5 years',
        location: 'Downtown Area',
    },
    {
        id: 2,
        name: 'Glamour Beauty Lounge',
        service: 'Beauty & Salon',
        rating: 4.9,
        reviews: 567,
        price: 1299,
        image: '💇',
        description: 'Premium beauty and salon services including haircuts, styling, facials, and spa treatments.',
        experience: '8 years',
        location: 'Central Mall',
    },
    {
        id: 3,
        name: 'Cool Tech AC Repair',
        service: 'AC Repair',
        rating: 4.7,
        reviews: 189,
        price: 599,
        image: '❄️',
        description: 'Expert AC repair and maintenance services. Quick response time and reliable solutions.',
        experience: '10 years',
        location: 'Citywide',
    },
    {
        id: 4,
        name: 'Perfect Plumbers',
        service: 'Plumbing',
        rating: 4.6,
        reviews: 145,
        price: 499,
        image: '🔧',
        description: 'Licensed plumbers for all your plumbing needs. Available 24/7 for emergencies.',
        experience: '12 years',
        location: 'All Areas',
    },
];

const RatingStars = ({ rating, reviews }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                />
            ))}
            <span className="text-sm font-medium text-gray-700 ml-1">
                {rating}
            </span>
            <span className="text-sm text-gray-500">({reviews})</span>
        </div>
    );
};

const CompactProviderCard = ({ provider, onBookNow, onViewDetails }) => {
    return (
        <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    {/* Provider Image/Icon */}
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl shadow-sm">
                            {provider.image}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight">
                                    {provider.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">{provider.service}</p>
                                <RatingStars rating={provider.rating} reviews={provider.reviews} />
                            </div>

                            {/* Price - Desktop */}
                            <div className="hidden sm:block text-right flex-shrink-0">
                                <div className="flex items-start">
                                    <IndianRupee className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <span className="text-2xl font-bold text-blue-600">{provider.price}</span>
                                </div>
                                <p className="text-xs text-gray-500">onwards</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {provider.description}
                        </p>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{provider.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-gray-400" />
                                <span>{provider.experience} experience</span>
                            </div>
                            {/* Price - Mobile */}
                            <div className="sm:hidden flex items-center gap-1 font-semibold text-blue-600">
                                <IndianRupee className="w-4 h-4" />
                                <span>{provider.price} onwards</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={onViewDetails}
                                className="flex-1 sm:flex-none px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm inline-flex items-center justify-center gap-2"
                            >
                                View Details
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={onBookNow}
                                className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const SearchResultsPage = ({ searchQuery }) => {
    const router = useRouter();
    const [filters, setFilters] = useState({
        minRating: 0,
        maxPrice: 5000,
        category: 'All',
    });
    const [showFilters, setShowFilters] = useState(false);

    const filteredProviders = providers.filter(
        (p) => p.rating >= filters.minRating && p.price <= filters.maxPrice
    );

    const onSelectProvider = (provider) => {
        console.log('OnSelectProvider', provider);
        router.push('/service/' + provider.id);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Services'}
                    </h1>
                    <SearchBar onSearch={(query) => router.push(`/search?q=${query}`)} />
                </div>

                <div className="flex gap-8">
                    {/* Desktop Filters Sidebar */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Filter className="w-5 h-5" />
                                        Filters
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                                        <select
                                            value={filters.minRating}
                                            onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value={0}>All Ratings</option>
                                            <option value={4}>4+ Stars</option>
                                            <option value={4.5}>4.5+ Stars</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Max Price: ₹{filters.maxPrice}</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000"
                                            step="100"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                                            className="w-full accent-blue-600"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>₹0</span>
                                            <span>₹5000</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Category</label>
                                        <select
                                            value={filters.category}
                                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="All">All Categories</option>
                                            {serviceCategories.map((cat) => (
                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-900">{filteredProviders.length}</span> providers found
                            </p>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>

                        {/* Mobile Filters */}
                        {showFilters && (
                            <Card className="lg:hidden mb-6">
                                <CardContent className="pt-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                                        <select
                                            value={filters.minRating}
                                            onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                                            className="w-full p-2 border rounded-lg"
                                        >
                                            <option value={0}>All Ratings</option>
                                            <option value={4}>4+ Stars</option>
                                            <option value={4.5}>4.5+ Stars</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Max Price: ₹{filters.maxPrice}</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000"
                                            step="100"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                                            className="w-full accent-blue-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Category</label>
                                        <select
                                            value={filters.category}
                                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                            className="w-full p-2 border rounded-lg"
                                        >
                                            <option value="All">All Categories</option>
                                            {serviceCategories.map((cat) => (
                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Provider Listings - One per row */}
                        <div className="space-y-4">
                            {filteredProviders.map((provider) => (
                                <CompactProviderCard
                                    key={provider.id}
                                    provider={provider}
                                    onBookNow={() => onSelectProvider(provider)}
                                    onViewDetails={() => onSelectProvider(provider)}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredProviders.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
                                <p className="text-gray-600">Try adjusting your filters to see more results</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;