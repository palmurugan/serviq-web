"use client"

import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ConfirmationPage = ({ onNavigate }) => {
    const[bookingId, setBookingId] = useState('SVC001')
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <Card className="text-center">
                    <CardContent className="pt-12 pb-8">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold mb-3">Booking Confirmed!</h1>
                        <p className="text-gray-600 mb-8">
                            Your booking has been successfully confirmed. You'll receive a confirmation email shortly.
                        </p>

                        <div className="bg-blue-50 rounded-lg p-6 mb-8">
                            <div className="text-sm text-gray-600 mb-1">Booking Reference ID</div>
                            <div className="text-2xl font-bold text-blue-600">{bookingId}</div>
                        </div>

                        <Alert className="mb-8 text-left">
                            <AlertDescription>
                                <strong>What's Next?</strong>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>• You'll receive a confirmation email with all booking details</li>
                                    <li>• The service provider will contact you 30 minutes before the appointment</li>
                                    <li>• You can view or manage your booking anytime</li>
                                </ul>
                            </AlertDescription>
                        </Alert>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => onNavigate('home')}
                                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                            >
                                Go to Home
                            </button>
                            <button
                                onClick={() => alert('This would navigate to a bookings page')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                View My Bookings
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">Need help with your booking?</p>
                    <div className="flex justify-center gap-6">
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Contact Support
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;