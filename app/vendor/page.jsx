"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Star, Check, ChevronRight, User, Mail, Phone, CreditCard, Wallet } from 'lucide-react';

const BookingServicePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [currentDateIndex, setCurrentDateIndex] = useState(0);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [bookingComplete, setBookingComplete] = useState(false);

    // Mock vendor data
    const vendor = {
        name: "Elite Beauty Salon",
        category: "Salon",
        logo: "💇‍♀️",
        rating: 4.8,
        reviewCount: 120,
        address: "123 Main Street, Downtown, City 12345",
        banner: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=300&fit=crop"
    };

    // Mock services data
    const services = [
        {
            id: 1,
            name: "Haircut & Styling",
            description: "Professional haircut with wash and styling",
            duration: "45 min",
            price: 35
        },
        {
            id: 2,
            name: "Hair Coloring",
            description: "Full hair coloring service with premium products",
            duration: "2 hours",
            price: 85
        },
        {
            id: 3,
            name: "Manicure & Pedicure",
            description: "Complete nail care treatment",
            duration: "1 hour",
            price: 45
        },
        {
            id: 4,
            name: "Facial Treatment",
            description: "Deep cleansing facial with moisturizing",
            duration: "1 hour",
            price: 65
        },
        {
            id: 5,
            name: "Massage Therapy",
            description: "Relaxing full body massage",
            duration: "1.5 hours",
            price: 75
        },
        {
            id: 6,
            name: "Makeup Service",
            description: "Professional makeup for any occasion",
            duration: "45 min",
            price: 55
        }
    ];

    // Generate dates starting from current index
    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + currentDateIndex + i);
            dates.push(date);
        }
        return dates;
    };

    // Mock time slots
    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
        "05:00 PM", "06:00 PM"
    ];

    const getAvailableSlotsForDate = (date) => {
        // Mock: return different available slots based on date
        // In real app, this would fetch from backend
        return ["09:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "05:00 PM"];
    };

    const startBooking = (serviceId) => {
        setSelectedServices([serviceId]);
        setCurrentStep(1);
        setSelectedDate('');
        setSelectedSlot('');
        setCurrentDateIndex(0);
    };

    const toggleServiceSelection = (serviceId) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const getSelectedServicesDetails = () => {
        return services.filter(s => selectedServices.includes(s.id));
    };

    const getTotalPrice = () => {
        return getSelectedServicesDetails().reduce((sum, service) => sum + service.price, 0);
    };

    const getTotalDuration = () => {
        const selected = getSelectedServicesDetails();
        let totalMinutes = 0;
        selected.forEach(service => {
            const duration = service.duration;
            if (duration.includes('hour')) {
                const hours = parseFloat(duration);
                totalMinutes += hours * 60;
            } else {
                totalMinutes += parseInt(duration);
            }
        });
        if (totalMinutes >= 60) {
            const hours = Math.floor(totalMinutes / 60);
            const mins = totalMinutes % 60;
            return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
        }
        return `${totalMinutes}m`;
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleNextStep = () => {
        if (currentStep === 1 && selectedDate && selectedSlot) {
            setCurrentStep(2);
        } else if (currentStep === 2 && customerInfo.name && customerInfo.phone) {
            setCurrentStep(3);
        }
    };

    const handleBackStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else if (currentStep === 1) {
            // Back to service selection
            setSelectedServices([]);
            setSelectedDate('');
            setSelectedSlot('');
            setCurrentStep(0);
        }
    };

    const handleNextWeek = () => {
        setCurrentDateIndex(currentDateIndex + 7);
    };

    const handlePrevWeek = () => {
        if (currentDateIndex >= 7) {
            setCurrentDateIndex(currentDateIndex - 7);
        }
    };

    const handleBooking = () => {
        setBookingComplete(true);
        scrollToSection('confirmation-section');
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const addToCalendar = () => {
        alert('Calendar integration would be implemented here');
    };

    const shareOnWhatsApp = () => {
        const message = `Booking Confirmed at ${vendor.name}\nServices: ${getSelectedServicesDetails().map(s => s.name).join(', ')}\nDate: ${selectedDate}\nTime: ${selectedSlot}\nTotal: $${getTotalPrice()}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (bookingComplete) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div id="confirmation-section" className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                        <p className="text-gray-600 mb-8">Your appointment has been successfully scheduled</p>

                        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
                            <div className="flex items-start mb-4">
                                <div className="text-4xl mr-4">{vendor.logo}</div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">{vendor.name}</h3>
                                    <p className="text-sm text-gray-600">{vendor.address}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                                    <span>{selectedDate}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Clock className="w-5 h-5 mr-3 text-gray-400" />
                                    <span>{selectedSlot} · {getTotalDuration()}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 mt-4 pt-4">
                                <h4 className="font-semibold text-gray-900 mb-3">Services Booked:</h4>
                                {getSelectedServicesDetails().map(service => (
                                    <div key={service.id} className="flex justify-between items-center mb-2">
                                        <span className="text-gray-700">{service.name}</span>
                                        <span className="font-semibold text-gray-900">${service.price}</span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-bold text-xl text-gray-900">${getTotalPrice()}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold">Payment:</span> {paymentMethod === 'pay-now' ? 'Paid Online' : 'Pay at Service'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={addToCalendar}
                                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                            >
                                Add to Calendar
                            </button>
                            <button
                                onClick={shareOnWhatsApp}
                                className="w-full bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition"
                            >
                                Share on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white shadow-sm">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={vendor.banner}
                        alt={vendor.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-start space-x-4">
                            <div className="text-5xl bg-gray-50 rounded-xl p-3">
                                {vendor.logo}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{vendor.name}</h1>
                                </div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                                        {vendor.category}
                                    </span>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                        <span className="font-semibold">{vendor.rating}</span>
                                        <span className="mx-1">·</span>
                                        <span>{vendor.reviewCount} reviews</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{vendor.address}</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* Progress Stepper - Only show when booking started */}
            {currentStep > 0 && selectedServices.length > 0 && !bookingComplete && (
                <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            {[
                                { num: 1, label: 'Date & Time' },
                                { num: 2, label: 'Your Details' },
                                { num: 3, label: 'Payment' }
                            ].map((step, index) => (
                                <React.Fragment key={step.num}>
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${currentStep >= step.num
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                                        </div>
                                        <span className={`text-sm hidden sm:block ${currentStep >= step.num ? 'text-blue-600 font-medium' : 'text-gray-500'
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {index < 2 && (
                                        <div className={`flex-1 h-1 mx-2 rounded ${currentStep > step.num ? 'bg-blue-600' : 'bg-gray-200'
                                            }`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Services Section - Only show when no step is active */}
            {currentStep === 0 && (
                <div id="services-section" className="max-w-4xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {services.map(service => (
                            <div
                                key={service.id}
                                className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-gray-200 transition"
                            >
                                <div className="mb-3">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{service.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                </div>
                                <div className="flex items-center justify-between text-sm mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{service.duration}</span>
                                    </div>
                                    <span className="font-bold text-lg text-gray-900">${service.price}</span>
                                </div>
                                <button
                                    onClick={() => startBooking(service.id)}
                                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Booking Flow - Date & Time Section */}
            {currentStep === 1 && selectedServices.length > 0 && (
                <div id="booking-flow" className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {getSelectedServicesDetails()[0]?.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {getSelectedServicesDetails()[0]?.duration} · ${getSelectedServicesDetails()[0]?.price}
                                </p>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h2>

                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-gray-900">Choose Date</h3>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handlePrevWeek}
                                        disabled={currentDateIndex === 0}
                                        className={`p-2 rounded-lg ${currentDateIndex === 0
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <ChevronRight className="w-5 h-5 rotate-180" />
                                    </button>
                                    <button
                                        onClick={handleNextWeek}
                                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {generateDates().map((date, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedDate(formatDate(date));
                                            setSelectedSlot(''); // Reset slot when date changes
                                        }}
                                        className={`p-3 rounded-lg text-center transition ${selectedDate === formatDate(date)
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                                            }`}
                                    >
                                        <div className="text-xs mb-1">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                        <div className="font-semibold">{date.getDate()}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedDate && (
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-3">Choose Time Slot</h3>
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                    {timeSlots.map(slot => {
                                        const availableSlots = getAvailableSlotsForDate(selectedDate);
                                        const isAvailable = availableSlots.includes(slot);
                                        return (
                                            <button
                                                key={slot}
                                                onClick={() => isAvailable && setSelectedSlot(slot)}
                                                disabled={!isAvailable}
                                                className={`py-3 px-4 rounded-lg font-medium transition ${selectedSlot === slot
                                                        ? 'bg-blue-600 text-white'
                                                        : isAvailable
                                                            ? 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                                                            : 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
                                                    }`}
                                            >
                                                {slot}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                            <button
                                onClick={handleBackStep}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNextStep}
                                disabled={!selectedDate || !selectedSlot}
                                className={`px-8 py-3 rounded-lg font-medium transition ${selectedDate && selectedSlot
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Info Section */}
            {currentStep === 2 && (
                <div id="customer-info-section" className="max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Details</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={customerInfo.name}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={customerInfo.email}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={customerInfo.phone}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                            <button
                                onClick={handleBackStep}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNextStep}
                                disabled={!customerInfo.name || !customerInfo.phone}
                                className={`px-8 py-3 rounded-lg font-medium transition ${customerInfo.name && customerInfo.phone
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Section */}
            {currentStep >= 3 && (
                <div id="payment-section" className="max-w-4xl mx-auto px-4 py-8 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                        <div className="space-y-4 mb-6">
                            <button
                                onClick={() => setPaymentMethod('pay-now')}
                                className={`w-full p-4 rounded-xl border-2 transition flex items-center justify-between ${paymentMethod === 'pay-now'
                                        ? 'border-gray-900 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <CreditCard className="w-6 h-6 mr-3 text-gray-700" />
                                    <div className="text-left">
                                        <p className="font-semibold text-gray-900">Pay Now</p>
                                        <p className="text-sm text-gray-600">Secure online payment</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pay-now'
                                        ? 'border-gray-900 bg-gray-900'
                                        : 'border-gray-300'
                                    }`}>
                                    {paymentMethod === 'pay-now' && (
                                        <Check className="w-4 h-4 text-white" />
                                    )}
                                </div>
                            </button>

                            <button
                                onClick={() => setPaymentMethod('pay-at-service')}
                                className={`w-full p-4 rounded-xl border-2 transition flex items-center justify-between ${paymentMethod === 'pay-at-service'
                                        ? 'border-gray-900 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <Wallet className="w-6 h-6 mr-3 text-gray-700" />
                                    <div className="text-left">
                                        <p className="font-semibold text-gray-900">Pay at Service</p>
                                        <p className="text-sm text-gray-600">Pay when you arrive</p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pay-at-service'
                                        ? 'border-gray-900 bg-gray-900'
                                        : 'border-gray-300'
                                    }`}>
                                    {paymentMethod === 'pay-at-service' && (
                                        <Check className="w-4 h-4 text-white" />
                                    )}
                                </div>
                            </button>
                        </div>
                        {/* Booking Summary */}
                        <div className="border-t pt-6 mt-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                            <div className="space-y-3 mb-4">
                                {getSelectedServicesDetails().map(service => (
                                    <div key={service.id} className="flex justify-between text-gray-700">
                                        <span>{service.name}</span>
                                        <span className="font-medium">${service.price}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-3 flex justify-between items-center mb-6">
                                <span className="font-bold text-gray-900">Total</span>
                                <span className="font-bold text-2xl text-gray-900">${getTotalPrice()}</span>
                            </div>

                            {paymentMethod && (
                                <button
                                    onClick={handleBooking}
                                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition text-lg"
                                >
                                    {paymentMethod === 'pay-now' ? 'Proceed to Payment' : 'Confirm Booking'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingServicePage;