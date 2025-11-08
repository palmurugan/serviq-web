"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User, ArrowRight, Award, IndianRupee, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

const availableSlots = {
    morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
    afternoon: ['12:00 PM', '2:00 PM', '4:00 PM'],
    evening: ['5:00 PM', '6:00 PM', '7:00 PM'],
};

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

// Calendar Component for Modal
const CalendarPicker = ({ selectedDate, onDateChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    const isPastDate = (day) => {
        const date = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isSelected = (day) => {
        if (!selectedDate) return false;
        const [selYear, selMonth, selDay] = selectedDate.split('-').map(Number);
        return (
            day === selDay &&
            month === selMonth - 1 &&
            year === selYear
        );
    };

    const handleDateClick = (day) => {
        if (isPastDate(day)) return;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onDateChange(dateStr);
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const emptyDays = Array(startingDayOfWeek).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="bg-white rounded-lg">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Previous month"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h4 className="font-semibold text-base">
                    {monthNames[month]} {year}
                </h4>
                <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Next month"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium text-gray-600 py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
                {emptyDays.map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {days.map((day) => {
                    const selected = isSelected(day);
                    const today = isToday(day);
                    const past = isPastDate(day);

                    return (
                        <button
                            key={day}
                            onClick={() => handleDateClick(day)}
                            disabled={past}
                            className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                                selected
                                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                                    : past
                                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                    : today
                                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-2 border-blue-600'
                                    : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                            }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            <div className="mt-3 text-xs text-gray-500 text-center">
                Select today or any future date
            </div>
        </div>
    );
};

// Time Slot Picker Component
const TimeSlotPicker = ({ selectedSlot, onSlotChange }) => {
    return (
        <div className="space-y-4">
            {Object.entries(availableSlots).map(([period, slots]) => (
                <div key={period}>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 capitalize flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {period}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                        {slots.map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                                <button
                                    key={slot}
                                    onClick={() => onSlotChange(slot)}
                                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                        isSelected
                                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                                            : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                                    }`}
                                >
                                    {slot}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Booking Modal Component
const BookingModal = ({ isOpen, onClose, provider, onProceedToCheckout }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [step, setStep] = useState(1); // 1: Date, 2: Time

    if (!isOpen) return null;

    const handleProceed = () => {
        if (step === 1 && selectedDate) {
            setStep(2);
        } else if (step === 2 && selectedSlot) {
            onProceedToCheckout({
                provider,
                date: selectedDate,
                slot: selectedSlot,
            });
        }
    };

    const canProceed = step === 1 ? selectedDate : selectedSlot;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                    {provider.image}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                                        Book {provider.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">{provider.service}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <RatingStars rating={provider.rating} reviews={provider.reviews} />
                                        <span className="text-sm text-gray-500">•</span>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="w-3.5 h-3.5 mr-1" />
                                            {provider.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {step > 1 ? <Check className="w-5 h-5" /> : '1'}
                                </div>
                                <span className={`text-sm font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                                    Select Date
                                </span>
                            </div>
                            <div className="w-16 h-0.5 bg-gray-300" />
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                }`}>
                                    2
                                </div>
                                <span className={`text-sm font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                                    Select Time
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
                        {step === 1 ? (
                            <div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    Choose Your Preferred Date
                                </h3>
                                <CalendarPicker
                                    selectedDate={selectedDate}
                                    onDateChange={setSelectedDate}
                                />
                                {selectedDate && (
                                    <Alert className="mt-4 bg-blue-50 border-blue-200">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <AlertDescription className="text-blue-800">
                                            Selected: <strong>{formatDate(selectedDate)}</strong>
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        ) : (
                            <div>
                                <div className="mb-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Change Date
                                    </button>
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                                        <strong>Selected Date:</strong> {formatDate(selectedDate)}
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    Choose Your Preferred Time
                                </h3>
                                <TimeSlotPicker
                                    selectedSlot={selectedSlot}
                                    onSlotChange={setSelectedSlot}
                                />
                                {selectedSlot && (
                                    <Alert className="mt-4 bg-green-50 border-green-200">
                                        <Check className="w-4 h-4 text-green-600" />
                                        <AlertDescription className="text-green-800">
                                            Selected Time: <strong>{selectedSlot}</strong>
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Service Charge</p>
                                <div className="flex items-center gap-1">
                                    <IndianRupee className="w-5 h-5 text-gray-900" />
                                    <span className="text-2xl font-bold text-gray-900">{provider.price}</span>
                                    <span className="text-sm text-gray-500 ml-1">onwards</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProceed}
                                    disabled={!canProceed}
                                    className={`px-8 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                        canProceed
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {step === 1 ? (
                                        <>
                                            Continue
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    ) : (
                                        <>
                                            Proceed to Checkout
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <p>Final price may vary based on service requirements. You can cancel free of charge up to 2 hours before the scheduled time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CompactProviderCard = ({ provider, onBookNow, onViewDetails }) => {
    return (
        <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl shadow-sm">
                            {provider.image}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight">
                                    {provider.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">{provider.service}</p>
                                <RatingStars rating={provider.rating} reviews={provider.reviews} />
                            </div>

                            <div className="hidden sm:block text-right flex-shrink-0">
                                <div className="flex items-start">
                                    <IndianRupee className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <span className="text-2xl font-bold text-blue-600">{provider.price}</span>
                                </div>
                                <p className="text-xs text-gray-500">onwards</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {provider.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{provider.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-gray-400" />
                                <span>{provider.experience} experience</span>
                            </div>
                            <div className="sm:hidden flex items-center gap-1 font-semibold text-blue-600">
                                <IndianRupee className="w-4 h-4" />
                                <span>{provider.price} onwards</span>
                            </div>
                        </div>

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

const SearchResultsPage = () => {
    const router = useRouter();
    const [filters, setFilters] = useState({
        minRating: 0,
        maxPrice: 5000,
        category: 'All',
    });
    const [showFilters, setShowFilters] = useState(false);
    const [bookingModal, setBookingModal] = useState({
        isOpen: false,
        provider: null,
    });

    const filteredProviders = providers.filter(
        (p) => p.rating >= filters.minRating && p.price <= filters.maxPrice
    );

    const handleBookNow = (provider) => {
        setBookingModal({
            isOpen: true,
            provider: provider,
        });
    };

    const handleCloseModal = () => {
        setBookingModal({
            isOpen: false,
            provider: null,
        });
    };

    const handleProceedToCheckout = (bookingData) => {
        console.log('Proceeding to checkout with:', bookingData);
        // Here you would navigate to checkout page with the booking data
        // router.push('/checkout', { state: bookingData });
        alert(`Booking confirmed!\nProvider: ${bookingData.provider.name}\nDate: ${bookingData.date}\nTime: ${bookingData.slot}`);
        router.push('/checkout');
        handleCloseModal();
    };

    const handleViewDetails = (provider) => {
        console.log('View details for:', provider);
        // router.push('/service/' + provider.id);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">All Services</h1>
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

                        {/* Provider Listings */}
                        <div className="space-y-4">
                            {filteredProviders.map((provider) => (
                                <CompactProviderCard
                                    key={provider.id}
                                    provider={provider}
                                    onBookNow={() => handleBookNow(provider)}
                                    onViewDetails={() => handleViewDetails(provider)}
                                />
                            ))}
                        </div>

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

            {/* Booking Modal */}
            <BookingModal
                isOpen={bookingModal.isOpen}
                onClose={handleCloseModal}
                provider={bookingModal.provider}
                onProceedToCheckout={handleProceedToCheckout}
            />
        </div>
    );
};

export default SearchResultsPage;