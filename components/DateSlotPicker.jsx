"use client"

import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User } from 'lucide-react';

const availableSlots = {
    morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
    afternoon: ['12:00 PM', '2:00 PM', '4:00 PM'],
    evening: ['5:00 PM', '6:00 PM', '7:00 PM'],
};

export const DateSlotPicker = ({ selectedDate, selectedSlot, onDateChange, onSlotChange }) => {
    const [currentMonth] = useState(new Date());
    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const nextDays = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select Date
                </h3>
                <div className="grid grid-cols-7 gap-2">
                    {nextDays.map((date, i) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const isSelected = selectedDate === dateStr;
                        return (
                            <button
                                key={i}
                                onClick={() => onDateChange(dateStr)}
                                className={`p-3 rounded-lg text-center transition-all ${isSelected
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                <div className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                <div className="font-semibold">{date.getDate()}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Select Time Slot
                </h3>
                <div className="space-y-4">
                    {Object.entries(availableSlots).map(([period, slots]) => (
                        <div key={period}>
                            <h4 className="text-sm font-medium text-gray-600 mb-2 capitalize">{period}</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {slots.map((slot) => {
                                    const isSelected = selectedSlot === slot;
                                    return (
                                        <button
                                            key={slot}
                                            onClick={() => onSlotChange(slot)}
                                            className={`p-3 rounded-lg text-sm font-medium transition-all ${isSelected
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : 'bg-gray-100 hover:bg-gray-200'
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
            </div>
        </div>
    );
};