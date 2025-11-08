"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CheckoutPage = ({}) => {
    const router = useRouter();
    const [booking, setBooking] = useState({
        provider: {
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
        }
    });
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.phone && formData.email) {
            router.push('/confirmation');
            //onConfirm({ ...booking, userDetails: formData, paymentMethod });
        }
    };

    const serviceFee = 50;
    const total = booking.provider.price + serviceFee;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => onNavigate('service', { provider: booking.provider })}
                    className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                    ← Back
                </button>

                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                placeholder="Enter your phone number"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Service Address *</label>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            placeholder="Enter complete address"
                                            rows="3"
                                            required
                                        />
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {[
                                        { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                                        { id: 'upi', label: 'UPI', icon: '📱' },
                                        { id: 'wallet', label: 'Wallet', icon: '👛' },
                                        { id: 'cod', label: 'Cash on Service', icon: '💵' },
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === method.id
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="payment"
                                                value={method.id}
                                                checked={paymentMethod === method.id}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-2xl">{method.icon}</span>
                                            <span className="font-medium">{method.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {paymentMethod === 'card' && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            You'll be redirected to a secure payment gateway to complete your transaction.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3 pb-4 border-b">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl">
                                        {booking.provider.image}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium">{booking.provider.name}</div>
                                        <div className="text-sm text-gray-600">{booking.provider.service}</div>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(booking.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span>{booking.slot}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span>{booking.provider.location}</span>
                                    </div>
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Service Price</span>
                                        <span className="font-medium">₹{booking.provider.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Service Fee</span>
                                        <span className="font-medium">₹{serviceFee}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t">
                                        <span className="font-semibold">Total Amount</span>
                                        <span className="font-bold text-blue-600 text-xl">₹{total}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!formData.name || !formData.phone || !formData.email || !formData.address}
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${formData.name && formData.phone && formData.email && formData.address
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Confirm Booking
                                </button>

                                <p className="text-xs text-center text-gray-500">
                                    By confirming, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;