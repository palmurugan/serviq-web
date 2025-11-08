import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { RatingStars } from './RatingStars';

export const ProviderCard = ({ provider, onBookNow, onViewDetails }) => {
    return (
        <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl">
                            {provider.image}
                        </div>
                        <div>
                            <CardTitle className="text-lg">{provider.name}</CardTitle>
                            <CardDescription>{provider.service}</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <RatingStars rating={provider.rating} reviews={provider.reviews} />
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div>
                            <span className="text-2xl font-bold text-blue-600">₹{provider.price}</span>
                            <span className="text-sm text-gray-500 ml-1">onwards</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <button
                    onClick={onViewDetails}
                    className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                    View Details
                </button>
                <button
                    onClick={onBookNow}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Book Now
                </button>
            </CardFooter>
        </Card>
    );
};