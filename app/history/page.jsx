"use client"

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Search, Filter, Download, Eye, X, CheckCircle, XCircle, AlertCircle, Package, RefreshCw, MessageSquare, Phone, Mail, ChevronRight, IndianRupee, FileText, ChevronDown, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock booking data
const mockBookings = [
    {
        id: 'BK001234',
        service: 'Home Cleaning',
        provider: {
            name: 'Sparkle Clean Services',
            image: '🏠',
            phone: '+91 9876543210',
            email: 'contact@sparkleclean.com',
        },
        date: '2025-01-15',
        time: '10:00 AM',
        status: 'completed',
        amount: 799,
        paymentStatus: 'paid',
        paymentMethod: 'UPI',
        address: '123 MG Road, Downtown Area, Kollam, Kerala - 691001',
        rating: 5,
        review: 'Excellent service! Very professional and thorough cleaning.',
        duration: '2 hours',
        professional: {
            name: 'Rajesh Kumar',
            photo: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=3b82f6&color=fff',
        },
        receipt: true,
    },
    {
        id: 'BK001235',
        service: 'AC Repair',
        provider: {
            name: 'Cool Tech AC Repair',
            image: '❄️',
            phone: '+91 9876543211',
            email: 'support@cooltech.com',
        },
        date: '2025-01-20',
        time: '2:00 PM',
        status: 'confirmed',
        amount: 599,
        paymentStatus: 'paid',
        paymentMethod: 'Card',
        address: '456 Beach Road, Coastal Area, Kollam, Kerala - 691002',
        duration: '1 hour',
        professional: {
            name: 'Amit Sharma',
            photo: 'https://ui-avatars.com/api/?name=Amit+Sharma&background=10b981&color=fff',
        },
        receipt: true,
    },
    {
        id: 'BK001236',
        service: 'Beauty & Salon',
        provider: {
            name: 'Glamour Beauty Lounge',
            image: '💇',
            phone: '+91 9876543212',
            email: 'info@glamourbeauty.com',
        },
        date: '2025-01-18',
        time: '5:00 PM',
        status: 'cancelled',
        amount: 1299,
        paymentStatus: 'refunded',
        paymentMethod: 'UPI',
        address: '789 Mall Road, Central Mall, Kollam, Kerala - 691003',
        duration: '1.5 hours',
        cancellationReason: 'Provider unavailable',
        refundAmount: 1299,
        receipt: false,
    },
    {
        id: 'BK001237',
        service: 'Plumbing',
        provider: {
            name: 'Perfect Plumbers',
            image: '🔧',
            phone: '+91 9876543213',
            email: 'help@perfectplumbers.com',
        },
        date: '2025-01-22',
        time: '11:00 AM',
        status: 'upcoming',
        amount: 499,
        paymentStatus: 'pending',
        paymentMethod: 'Cash on Service',
        address: '321 Park Street, Green Valley, Kollam, Kerala - 691004',
        duration: '1 hour',
        professional: {
            name: 'Suresh Menon',
            photo: 'https://ui-avatars.com/api/?name=Suresh+Menon&background=f59e0b&color=fff',
        },
        receipt: false,
    },
];

// Status Badge Component
const StatusBadge = ({ status }) => {
    const statusConfig = {
        completed: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Completed' },
        confirmed: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock, label: 'Confirmed' },
        cancelled: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Cancelled' },
        upcoming: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Calendar, label: 'Upcoming' },
        'in-progress': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: RefreshCw, label: 'In Progress' },
    };

    const config = statusConfig[status] || statusConfig.upcoming;
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {config.label}
        </div>
    );
};

// Payment Status Badge
const PaymentBadge = ({ status }) => {
    const config = {
        paid: { color: 'bg-green-100 text-green-800', label: 'Paid' },
        pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
        refunded: { color: 'bg-blue-100 text-blue-800', label: 'Refunded' },
    };

    const badge = config[status] || config.pending;

    return (
        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${badge.color}`}>
            {badge.label}
        </span>
    );
};

// Booking Detail Modal
const BookingDetailModal = ({ booking, onClose, onRebook, onReview }) => {
    if (!booking) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                                <p className="text-sm text-gray-600 mt-1">Booking ID: {booking.id}</p>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 space-y-6">
                        {/* Status Section */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <StatusBadge status={booking.status} />
                            <PaymentBadge status={booking.paymentStatus} />
                        </div>

                        {/* Provider Info */}
                        <div className="border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Package className="w-5 h-5 text-blue-600" />
                                Service Provider
                            </h3>
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl">
                                    {booking.provider.image}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{booking.provider.name}</p>
                                    <p className="text-sm text-gray-600 mb-2">{booking.service}</p>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            {booking.provider.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="w-4 h-4" />
                                            {booking.provider.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Info (if assigned) */}
                        {booking.professional && (
                            <div className="border border-gray-200 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-blue-600" />
                                    Assigned Professional
                                </h3>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={booking.professional.photo}
                                        alt={booking.professional.name}
                                        className="w-12 h-12 rounded-full border-2 border-blue-600"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900">{booking.professional.name}</p>
                                        <p className="text-sm text-gray-600">Service Professional</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Booking Details */}
                        <div className="border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                Appointment Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Date</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(booking.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Time</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.time}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.duration}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Service Type</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.service}</p>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                Service Location
                            </h3>
                            <p className="text-sm text-gray-600">{booking.address}</p>
                        </div>

                        {/* Payment Details */}
                        <div className="border border-gray-200 rounded-xl p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-blue-600" />
                                Payment Information
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Service Charge</span>
                                    <span className="font-medium text-gray-900">₹{booking.amount}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Payment Method</span>
                                    <span className="font-medium text-gray-900">{booking.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Payment Status</span>
                                    <PaymentBadge status={booking.paymentStatus} />
                                </div>
                                {booking.refundAmount && (
                                    <div className="flex justify-between text-sm pt-2 border-t">
                                        <span className="text-gray-600">Refund Amount</span>
                                        <span className="font-medium text-green-600">₹{booking.refundAmount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between pt-2 border-t">
                                    <span className="font-semibold text-gray-900">Total Amount</span>
                                    <span className="font-bold text-blue-600 text-lg">₹{booking.amount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rating & Review (if completed) */}
                        {booking.status === 'completed' && booking.rating && (
                            <div className="border border-gray-200 rounded-xl p-4 bg-yellow-50">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    Your Review
                                </h3>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < booking.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm font-medium text-gray-900">{booking.rating}/5</span>
                                </div>
                                <p className="text-sm text-gray-700 italic">"{booking.review}"</p>
                            </div>
                        )}

                        {/* Cancellation Reason */}
                        {booking.status === 'cancelled' && booking.cancellationReason && (
                            <Alert className="bg-red-50 border-red-200">
                                <AlertCircle className="w-4 h-4 text-red-600" />
                                <AlertDescription className="text-red-800">
                                    <strong>Cancellation Reason:</strong> {booking.cancellationReason}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
                        <div className="flex gap-3">
                            {booking.receipt && (
                                <button className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Download Receipt
                                </button>
                            )}
                            {booking.status === 'completed' && !booking.rating && (
                                <button
                                    onClick={() => onReview(booking)}
                                    className="flex-1 px-4 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    <Star className="w-4 h-4" />
                                    Write Review
                                </button>
                            )}
                            {(booking.status === 'completed' || booking.status === 'cancelled') && (
                                <button
                                    onClick={() => onRebook(booking)}
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Book Again
                                </button>
                            )}
                            {booking.status === 'upcoming' && (
                                <button className="flex-1 px-4 py-2.5 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Booking Card Component
const BookingCard = ({ booking, onClick }) => {
    return (
        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={onClick}>
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                            {booking.provider.image}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">{booking.provider.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{booking.service}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {booking.time}
                                </div>
                            </div>
                        </div>
                    </div>
                    <StatusBadge status={booking.status} />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Booking ID</p>
                        <p className="text-sm font-medium text-gray-900">{booking.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-0.5">Amount</p>
                        <p className="text-lg font-bold text-blue-600">₹{booking.amount}</p>
                    </div>
                </div>

                {booking.status === 'completed' && booking.rating && (
                    <div className="mt-3 flex items-center gap-1 pt-3 border-t border-gray-200">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < booking.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">Your Rating</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Main Booking History Component
const BookingHistory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    const filteredBookings = mockBookings.filter((booking) => {
        const matchesSearch =
            booking.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: mockBookings.length,
        completed: mockBookings.filter((b) => b.status === 'completed').length,
        upcoming: mockBookings.filter((b) => b.status === 'upcoming' || b.status === 'confirmed').length,
        cancelled: mockBookings.filter((b) => b.status === 'cancelled').length,
        totalSpent: mockBookings
            .filter((b) => b.paymentStatus === 'paid')
            .reduce((sum, b) => sum + b.amount, 0),
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
                    <p className="text-gray-600">Track and manage all your service bookings</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-700 font-medium">Total Bookings</p>
                                    <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                                </div>
                                <Package className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-700 font-medium">Completed</p>
                                    <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
                                </div>
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-700 font-medium">Upcoming</p>
                                    <p className="text-2xl font-bold text-purple-900">{stats.upcoming}</p>
                                </div>
                                <Clock className="w-8 h-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-red-700 font-medium">Cancelled</p>
                                    <p className="text-2xl font-bold text-red-900">{stats.cancelled}</p>
                                </div>
                                <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-yellow-700 font-medium">Total Spent</p>
                                    <p className="text-2xl font-bold text-yellow-900">₹{stats.totalSpent}</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by service, provider, or booking ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium"
                        >
                            <Filter className="w-5 h-5" />
                            Filters
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Filter Options */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-3">Filter by Status</p>
                            <div className="flex flex-wrap gap-2">
                                {['all', 'completed', 'upcoming', 'confirmed', 'cancelled'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === status
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bookings List */}
                {filteredBookings.length > 0 ? (
                    <div className="grid gap-4">
                        {filteredBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onClick={() => setSelectedBooking(booking)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchQuery || filterStatus !== 'all'
                                ? 'Try adjusting your search or filters'
                                : "You haven't made any bookings yet"}
                        </p>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Browse Services
                        </button>
                    </div>
                )}
            </div>

            {/* Booking Detail Modal */}
            <BookingDetailModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
                onRebook={(booking) => {
                    console.log('Rebook:', booking);
                    setSelectedBooking(null);
                }}
                onReview={(booking) => {
                    console.log('Review:', booking);
                    setSelectedBooking(null);
                }}
            />
        </div>
    );
};

export default BookingHistory;