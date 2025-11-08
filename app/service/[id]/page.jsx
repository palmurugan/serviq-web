"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { RatingStars } from '../../../components/RatingStars';
import { DateSlotPicker } from '../../../components/DateSlotPicker';

const ServiceDetailPage = ({}) => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [provider, setProvider] = useState({
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
    });

    const canProceed = selectedDate && selectedSlot;

    const onProceedToBooking = (booking) => {
        console.log(booking);
        router.push('/checkout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => onNavigate('search')}
                    className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                    ← Back to Search
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0">
                                        {provider.image}
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-2xl mb-2">{provider.name}</CardTitle>
                                        <CardDescription className="text-base mb-3">{provider.service}</CardDescription>
                                        <RatingStars rating={provider.rating} reviews={provider.reviews} />
                                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {provider.location}
                                            </div>
                                            <div>Experience: {provider.experience}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="font-semibold mb-2">About</h3>
                                <p className="text-gray-600">{provider.description}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Reviews</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { name: 'Priya Sharma', rating: 5, comment: 'Excellent service! Very professional and punctual.', date: '2 days ago' },
                                    { name: 'Rahul Kumar', rating: 5, comment: 'Great experience. Highly recommended!', date: '1 week ago' },
                                    { name: 'Anjali Verma', rating: 4, comment: 'Good service, but could improve timing.', date: '2 weeks ago' },
                                ].map((review, i) => (
                                    <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium">{review.name}</div>
                                            <div className="text-sm text-gray-500">{review.date}</div>
                                        </div>
                                        <RatingStars rating={review.rating} reviews={0} />
                                        <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>₹{provider.price}</CardTitle>
                                <CardDescription>Starting price</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Book Your Slot</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DateSlotPicker
                                    selectedDate={selectedDate}
                                    selectedSlot={selectedSlot}
                                    onDateChange={setSelectedDate}
                                    onSlotChange={setSelectedSlot}
                                />
                                <button
                                    onClick={() => onProceedToBooking({ provider, date: selectedDate, slot: selectedSlot })}
                                    disabled={!canProceed}
                                    className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${canProceed
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Proceed to Booking
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;