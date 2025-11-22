"use client"

import React, { useState } from 'react';
import { Search, Star, MapPin, Filter, X, ChevronDown, ChevronRight, ChevronLeft, SlidersHorizontal, Grid, List, Award, Clock, Shield, Heart, IndianRupee, Phone, Calendar, Check, AlertCircle, Home, User, ArrowRight } from 'lucide-react';

// Mock data for providers
const mockProviders = [
    {
        id: 1,
        name: 'Sparkle Clean Services',
        category: 'Home Cleaning',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
        rating: 4.8,
        reviews: 234,
        price: 799,
        originalPrice: 999,
        badge: 'Top Rated',
        verified: true,
        responseTime: '10 mins',
        completedJobs: 1234,
        availability: 'Available Today',
        location: 'Downtown Area',
        distance: '2.5 km',
        description: 'Professional deep cleaning with eco-friendly products. Includes kitchen, bathroom, and living areas.',
        features: ['Eco-friendly', 'Same-day service', 'Insured'],
        discount: 20,
    },
    {
        id: 2,
        name: 'Elite Home Solutions',
        category: 'Home Cleaning',
        image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80',
        rating: 4.9,
        reviews: 456,
        price: 899,
        originalPrice: 1099,
        badge: 'Premium',
        verified: true,
        responseTime: '5 mins',
        completedJobs: 2345,
        availability: 'Available Now',
        location: 'Central Mall Area',
        distance: '3.2 km',
        description: 'Premium cleaning service with advanced equipment and trained staff. 100% satisfaction guaranteed.',
        features: ['Premium equipment', 'Background verified', 'Warranty'],
        discount: 18,
    },
    {
        id: 3,
        name: 'Quick Clean Express',
        category: 'Home Cleaning',
        image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80',
        rating: 4.6,
        reviews: 189,
        price: 599,
        originalPrice: 799,
        verified: true,
        responseTime: '15 mins',
        completedJobs: 890,
        availability: 'Available Tomorrow',
        location: 'Suburb Area',
        distance: '5.1 km',
        description: 'Fast and efficient cleaning service. Perfect for busy schedules with flexible timing options.',
        features: ['Flexible timing', 'Quick service', 'Affordable'],
        discount: 25,
    },
    {
        id: 4,
        name: 'Perfect Home Care',
        category: 'Home Cleaning',
        image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80',
        rating: 4.7,
        reviews: 312,
        price: 749,
        originalPrice: 899,
        badge: 'Bestseller',
        verified: true,
        responseTime: '8 mins',
        completedJobs: 1567,
        availability: 'Available Today',
        location: 'Beachside',
        distance: '4.3 km',
        description: 'Comprehensive home cleaning with attention to detail. Specialized in deep cleaning and sanitization.',
        features: ['Deep cleaning', 'Sanitization', 'Pet-friendly'],
        discount: 17,
    },
];

const filterCategories = {
    price: [
        { label: 'Under ₹500', min: 0, max: 500 },
        { label: '₹500 - ₹1000', min: 500, max: 1000 },
        { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
        { label: 'Above ₹2000', min: 2000, max: 999999 },
    ],
    rating: [
        { label: '4.5+ Stars', value: 4.5 },
        { label: '4.0+ Stars', value: 4.0 },
        { label: '3.5+ Stars', value: 3.5 },
        { label: '3.0+ Stars', value: 3.0 },
    ],
    availability: [
        { label: 'Available Now', value: 'now' },
        { label: 'Available Today', value: 'today' },
        { label: 'Available Tomorrow', value: 'tomorrow' },
    ],
    features: [
        { label: 'Verified Only', value: 'verified' },
        { label: 'Same-day Service', value: 'same-day' },
        { label: 'Premium Services', value: 'premium' },
        { label: 'Eco-friendly', value: 'eco' },
    ],
};

// Time slots availability
const slotsAvailability = {
    morning: [
        { time: '08:00 AM', available: true },
        { time: '09:00 AM', available: true },
        { time: '10:00 AM', available: false },
        { time: '11:00 AM', available: true },
    ],
    afternoon: [
        { time: '12:00 PM', available: true },
        { time: '01:00 PM', available: true },
        { time: '02:00 PM', available: true },
        { time: '03:00 PM', available: false },
    ],
    evening: [
        { time: '04:00 PM', available: true },
        { time: '05:00 PM', available: true },
        { time: '06:00 PM', available: true },
        { time: '07:00 PM', available: false },
    ],
};

// Calendar Component for Booking Modal
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
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Previous month"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h4 className="font-semibold text-lg">
                    {monthNames[month]} {year}
                </h4>
                <button
                    onClick={nextMonth}
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Next month"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
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
            <div className="grid grid-cols-7 gap-2">
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
                            type="button"
                            onClick={() => handleDateClick(day)}
                            disabled={past}
                            className={`aspect-square rounded-lg font-medium text-sm transition-all ${selected
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

            <div className="mt-4 text-xs text-gray-500 text-center">
                Select today or any future date
            </div>
        </div>
    );
};

// Time Slot Picker Component
const TimeSlotPicker = ({ selectedSlot, onSlotChange }) => {
    return (
        <div className="space-y-6">
            {Object.entries(slotsAvailability).map(([period, slots]) => (
                <div key={period}>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 capitalize flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {period}
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                        {slots.map((slot) => {
                            const isSelected = selectedSlot === slot.time;
                            const isAvailable = slot.available;

                            return (
                                <button
                                    key={slot.time}
                                    type="button"
                                    onClick={() => isAvailable && onSlotChange(slot.time)}
                                    disabled={!isAvailable}
                                    className={`relative p-4 rounded-lg text-sm font-medium transition-all ${isSelected
                                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                                        : isAvailable
                                            ? 'bg-gray-100 hover:bg-gray-200 hover:scale-105 border-2 border-transparent hover:border-blue-300'
                                            : 'bg-gray-50 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <Clock className={`w-4 h-4 ${isSelected ? 'text-white' : isAvailable ? 'text-gray-600' : 'text-gray-300'}`} />
                                        <span>{slot.time}</span>
                                        {!isAvailable && (
                                            <span className="text-xs text-red-500 font-semibold mt-1">Not Available</span>
                                        )}
                                    </div>
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
const BookingModal = ({ isOpen, onClose, provider }) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    if (!isOpen || !provider) return null;

    const handleProceed = () => {
        if (step === 1 && selectedDate) {
            setStep(2);
        } else if (step === 2 && selectedSlot) {
            setStep(3);
        } else if (step === 3) {
            console.log('Booking details:', { provider, selectedDate, selectedSlot, customerDetails });
            alert(`Booking confirmed!\nService: ${provider.name}\nDate: ${formatDate(selectedDate)}\nTime: ${selectedSlot}\nName: ${customerDetails.name}`);
            resetModal();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const canProceed = () => {
        if (step === 1) return selectedDate;
        if (step === 2) return selectedSlot;
        if (step === 3) return customerDetails.name && customerDetails.email && customerDetails.phone;
        return false;
    };

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

    const resetModal = () => {
        setStep(1);
        setSelectedDate('');
        setSelectedSlot('');
        setCustomerDetails({ name: '', email: '', phone: '', address: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={resetModal}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                                        Book {provider.name}
                                    </h2>
                                    <p className="text-sm text-gray-600">{provider.category}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-semibold">{provider.rating}</span>
                                        </div>
                                        <span className="text-gray-300">•</span>
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <MapPin className="w-3 h-3" />
                                            {provider.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={resetModal}
                                type="button"
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-center gap-4">
                            {[
                                { num: 1, label: 'Select Date' },
                                { num: 2, label: 'Select Time' },
                                { num: 3, label: 'Your Details' },
                            ].map((item, index) => (
                                <React.Fragment key={item.num}>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step > item.num
                                                ? 'bg-green-600 text-white'
                                                : step === item.num
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                            {step > item.num ? <Check className="w-5 h-5" /> : item.num}
                                        </div>
                                        <span
                                            className={`text-sm font-medium hidden sm:block ${step >= item.num ? 'text-gray-900' : 'text-gray-500'
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                    {index < 2 && <div className="w-12 h-0.5 bg-gray-300" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
                        {step === 1 && (
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
                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-800">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">
                                                Selected: <strong>{formatDate(selectedDate)}</strong>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <div className="mb-4">
                                    <button
                                        onClick={handleBack}
                                        type="button"
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
                                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center gap-2 text-green-800">
                                            <Check className="w-4 h-4" />
                                            <span className="text-sm">
                                                Selected Time: <strong>{selectedSlot}</strong>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <div className="mb-4">
                                    <button
                                        onClick={handleBack}
                                        type="button"
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Change Time
                                    </button>
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-1">
                                        <div><strong>Date:</strong> {formatDate(selectedDate)}</div>
                                        <div><strong>Time:</strong> {selectedSlot}</div>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Enter Your Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={customerDetails.name}
                                            onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={customerDetails.email}
                                            onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                                            placeholder="your.email@example.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={customerDetails.phone}
                                            onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                                            placeholder="9876543210"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Service Address
                                        </label>
                                        <textarea
                                            value={customerDetails.address}
                                            onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                                            placeholder="Enter complete address"
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Service Charge</p>
                                <div className="flex items-center gap-1">
                                    <IndianRupee className="w-6 h-6 text-gray-900" />
                                    <span className="text-2xl font-bold text-gray-900">{provider.price}</span>
                                    {provider.originalPrice && (
                                        <span className="text-lg text-gray-400 line-through ml-2">₹{provider.originalPrice}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {step > 1 && (
                                    <button
                                        onClick={handleBack}
                                        type="button"
                                        className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    onClick={handleProceed}
                                    type="button"
                                    disabled={!canProceed()}
                                    className={`px-8 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${canProceed()
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {step === 3 ? 'Proceed to Checkout' : 'Continue'}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <p>You can cancel free of charge up to 2 hours before the scheduled time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Details Modal Component
const DetailsModal = ({ isOpen, onClose, provider, onBookNow }) => {
    if (!isOpen || !provider) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all">
                    {/* Header */}
                    <div className="relative h-64 rounded-t-2xl overflow-hidden">
                        <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <button
                            onClick={onClose}
                            type="button"
                            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        {provider.badge && (
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {provider.badge}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{provider.name}</h2>
                                <p className="text-gray-600">{provider.category}</p>
                            </div>
                            {provider.verified && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                    <Shield className="w-4 h-4" />
                                    <span className="text-sm font-medium">Verified</span>
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-lg">{provider.rating}</span>
                                <span className="text-gray-600">({provider.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-5 h-5" />
                                <span>{provider.location} • {provider.distance}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-5 h-5" />
                                <span>Response: {provider.responseTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Award className="w-5 h-5" />
                                <span>{provider.completedJobs}+ completed jobs</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-3">About This Service</h3>
                            <p className="text-gray-700 leading-relaxed">{provider.description}</p>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-3">What's Included</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {provider.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <Check className="w-5 h-5 text-green-600" />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Starting from</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center text-3xl font-bold text-gray-900">
                                        <IndianRupee className="w-7 h-7" />
                                        {provider.price}
                                    </div>
                                    {provider.originalPrice && (
                                        <div className="flex items-center text-xl text-gray-400 line-through">
                                            <IndianRupee className="w-5 h-5" />
                                            {provider.originalPrice}
                                        </div>
                                    )}
                                    {provider.discount && (
                                        <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-bold rounded">
                                            {provider.discount}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    onClose();
                                    onBookNow(provider);
                                }}
                                type="button"
                                className="px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Breadcrumb Component
const Breadcrumb = ({ searchQuery }) => (
    <nav className="flex items-center gap-2 text-sm mb-6">
        <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <button className="text-gray-600 hover:text-blue-600 transition-colors">
            Services
        </button>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-medium">
            {searchQuery || 'All Services'}
        </span>
    </nav>
);

// Filter Sidebar Component
const FilterSidebar = ({ filters, onFilterChange, onClearAll, resultCount }) => {
    const [expandedSections, setExpandedSections] = useState(['price', 'rating', 'availability', 'features']);

    const toggleSection = (section) => {
        setExpandedSections((prev) =>
            prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
        );
    };

    const hasActiveFilters = filters.priceRange ||
        filters.minRating ||
        (filters.availability && filters.availability.length > 0) ||
        (filters.features && filters.features.length > 0);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                </h3>
                {hasActiveFilters && (
                    <button
                        onClick={onClearAll}
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Price Range */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <button
                    onClick={() => toggleSection('price')}
                    type="button"
                    className="w-full flex items-center justify-between mb-4"
                >
                    <h4 className="font-semibold text-gray-900">Price Range</h4>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${expandedSections.includes('price') ? 'rotate-180' : ''
                            }`}
                    />
                </button>
                {expandedSections.includes('price') && (
                    <div className="space-y-2">
                        {filterCategories.price.map((range) => (
                            <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="price"
                                    checked={filters.priceRange?.label === range.label}
                                    onChange={() => onFilterChange('priceRange', range)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                    {range.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Rating */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <button
                    onClick={() => toggleSection('rating')}
                    type="button"
                    className="w-full flex items-center justify-between mb-4"
                >
                    <h4 className="font-semibold text-gray-900">Customer Rating</h4>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${expandedSections.includes('rating') ? 'rotate-180' : ''
                            }`}
                    />
                </button>
                {expandedSections.includes('rating') && (
                    <div className="space-y-2">
                        {filterCategories.rating.map((rating) => (
                            <label key={rating.label} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={filters.minRating === rating.value}
                                    onChange={() => onFilterChange('minRating', rating.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    {rating.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Availability */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <button
                    onClick={() => toggleSection('availability')}
                    type="button"
                    className="w-full flex items-center justify-between mb-4"
                >
                    <h4 className="font-semibold text-gray-900">Availability</h4>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${expandedSections.includes('availability') ? 'rotate-180' : ''
                            }`}
                    />
                </button>
                {expandedSections.includes('availability') && (
                    <div className="space-y-2">
                        {filterCategories.availability.map((avail) => (
                            <label key={avail.label} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.availability && filters.availability.includes(avail.value)}
                                    onChange={(e) => {
                                        const currentAvail = filters.availability || [];
                                        const newAvail = e.target.checked
                                            ? [...currentAvail, avail.value]
                                            : currentAvail.filter((a) => a !== avail.value);
                                        onFilterChange('availability', newAvail);
                                    }}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                    {avail.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Features */}
            <div className="mb-6">
                <button
                    onClick={() => toggleSection('features')}
                    type="button"
                    className="w-full flex items-center justify-between mb-4"
                >
                    <h4 className="font-semibold text-gray-900">Features</h4>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${expandedSections.includes('features') ? 'rotate-180' : ''
                            }`}
                    />
                </button>
                {expandedSections.includes('features') && (
                    <div className="space-y-2">
                        {filterCategories.features.map((feature) => (
                            <label key={feature.label} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.features && filters.features.includes(feature.value)}
                                    onChange={(e) => {
                                        const currentFeatures = filters.features || [];
                                        const newFeatures = e.target.checked
                                            ? [...currentFeatures, feature.value]
                                            : currentFeatures.filter((f) => f !== feature.value);
                                        onFilterChange('features', newFeatures);
                                    }}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                    {feature.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Result Count */}
            <div className="pt-6 border-t border-gray-200">
                <button type="button" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Show {resultCount} Results
                </button>
            </div>
        </div>
    );
};

// Provider Card Component
const ProviderCard = ({ provider, viewMode, onBookNow, onViewDetails }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative md:w-80 h-56 md:h-auto overflow-hidden flex-shrink-0">
                        <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {provider.discount && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {provider.discount}% OFF
                            </div>
                        )}
                        {provider.badge && (
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                {provider.badge}
                            </div>
                        )}
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            type="button"
                            className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                                    {provider.verified && (
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            <Shield className="w-3 h-3" />
                                            Verified
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{provider.category}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{provider.description}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {provider.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                >
                                    <Check className="w-3 h-3" />
                                    {feature}
                                </span>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold text-gray-900">{provider.rating}</span>
                                <span className="text-sm text-gray-600">({provider.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                {provider.distance} away
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                {provider.responseTime} response
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Award className="w-4 h-4" />
                                {provider.completedJobs} jobs
                            </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <div className="flex items-center text-3xl font-bold text-gray-900">
                                        <IndianRupee className="w-6 h-6" />
                                        {provider.price}
                                    </div>
                                    {provider.originalPrice && (
                                        <div className="flex items-center text-lg text-gray-400 line-through">
                                            <IndianRupee className="w-4 h-4" />
                                            {provider.originalPrice}
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Starting price</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onViewDetails(provider);
                                    }}
                                    type="button"
                                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2"
                                >
                                    View Details
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onBookNow(provider);
                                    }}
                                    type="button"
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid View
    return (
        <div className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {provider.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {provider.discount}% OFF
                    </div>
                )}
                {provider.badge && (
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {provider.badge}
                    </div>
                )}
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    type="button"
                    className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{provider.name}</h3>
                    {provider.verified && (
                        <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                </div>

                <p className="text-sm text-gray-600 mb-3">{provider.category}</p>

                {/* Stats */}
                <div className="flex items-center gap-3 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{provider.rating}</span>
                        <span className="text-gray-500">({provider.reviews})</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {provider.distance}
                    </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{provider.description}</p>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-baseline gap-2 mb-3">
                        <div className="flex items-center text-2xl font-bold text-gray-900">
                            <IndianRupee className="w-5 h-5" />
                            {provider.price}
                        </div>
                        {provider.originalPrice && (
                            <div className="flex items-center text-sm text-gray-400 line-through">
                                <IndianRupee className="w-3 h-3" />
                                {provider.originalPrice}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewDetails(provider);
                            }}
                            type="button"
                            className="flex-1 border-2 border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
                        >
                            View Details
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onBookNow(provider);
                            }}
                            type="button"
                            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Search Results Page
const ProfessionalSearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('Home Cleaning');
    const [location, setLocation] = useState('Kollam, Kerala');
    const [sortBy, setSortBy] = useState('recommended');
    const [viewMode, setViewMode] = useState('grid');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [bookingModal, setBookingModal] = useState({
        isOpen: false,
        provider: null,
    });
    const [detailsModal, setDetailsModal] = useState({
        isOpen: false,
        provider: null,
    });
    const [filters, setFilters] = useState({
        priceRange: null,
        minRating: null,
        availability: [],
        features: [],
    });

    const handleBookNow = (provider) => {
        setBookingModal({
            isOpen: true,
            provider: provider,
        });
    };

    const closeBookingModal = () => {
        setBookingModal({
            isOpen: false,
            provider: null,
        });
    };

    const handleViewDetails = (provider) => {
        setDetailsModal({
            isOpen: true,
            provider: provider,
        });
    };

    const closeDetailsModal = () => {
        setDetailsModal({
            isOpen: false,
            provider: null,
        });
    };

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
    };

    const clearAllFilters = () => {
        setFilters({
            priceRange: null,
            minRating: null,
            availability: [],
            features: [],
        });
    };

    const filteredProviders = mockProviders;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for services..."
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="md:w-64 relative">
                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <button type="button" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                            <Search className="w-5 h-5" />
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <Breadcrumb searchQuery={searchQuery} />

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {searchQuery} Services in {location}
                    </h1>
                    <p className="text-gray-600">
                        {filteredProviders.length} professionals available • Verified & Trusted
                    </p>
                </div>

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            type="button"
                            className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>

                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-medium"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="reviews">Most Reviewed</option>
                        </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 bg-white border-2 border-gray-300 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            type="button"
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            type="button"
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearAll={clearAllFilters}
                            resultCount={filteredProviders.length}
                        />
                    </aside>

                    {/* Mobile Filters */}
                    {showMobileFilters && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
                            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
                                <div className="p-4 border-b flex items-center justify-between">
                                    <h3 className="text-lg font-bold">Filters</h3>
                                    <button onClick={() => setShowMobileFilters(false)} type="button">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <FilterSidebar
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        onClearAll={clearAllFilters}
                                        resultCount={filteredProviders.length}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results Section */}
                    <main className="flex-1 min-w-0">
                        {/* Provider Listings */}
                        {viewMode === 'list' ? (
                            <div className="space-y-6">
                                {filteredProviders.map((provider) => (
                                    <ProviderCard
                                        key={provider.id}
                                        provider={provider}
                                        viewMode="list"
                                        onBookNow={handleBookNow}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProviders.map((provider) => (
                                    <ProviderCard
                                        key={provider.id}
                                        provider={provider}
                                        viewMode="grid"
                                        onBookNow={handleBookNow}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredProviders.length > 0 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <button type="button" className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                                    Previous
                                </button>
                                {[1, 2, 3, 4, 5].map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${page === 1
                                            ? 'bg-blue-600 text-white'
                                            : 'border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button type="button" className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-medium">
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Trust Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div className="text-white">
                            <Shield className="w-12 h-12 mx-auto mb-3" />
                            <h4 className="font-bold text-xl mb-2">100% Verified</h4>
                            <p className="text-white/90 text-sm">Background-checked professionals</p>
                        </div>
                        <div className="text-white">
                            <Award className="w-12 h-12 mx-auto mb-3" />
                            <h4 className="font-bold text-xl mb-2">Quality Guaranteed</h4>
                            <p className="text-white/90 text-sm">30-day service guarantee</p>
                        </div>
                        <div className="text-white">
                            <Clock className="w-12 h-12 mx-auto mb-3" />
                            <h4 className="font-bold text-xl mb-2">On-Time Service</h4>
                            <p className="text-white/90 text-sm">Punctual or compensation</p>
                        </div>
                        <div className="text-white">
                            <Phone className="w-12 h-12 mx-auto mb-3" />
                            <h4 className="font-bold text-xl mb-2">24/7 Support</h4>
                            <p className="text-white/90 text-sm">Always here to help</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={bookingModal.isOpen}
                onClose={closeBookingModal}
                provider={bookingModal.provider}
            />

            {/* Details Modal */}
            <DetailsModal
                isOpen={detailsModal.isOpen}
                onClose={closeDetailsModal}
                provider={detailsModal.provider}
                onBookNow={handleBookNow}
            />
        </div>
    );
};

export default ProfessionalSearchPage;