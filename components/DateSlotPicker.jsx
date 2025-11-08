import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const availableSlots = {
    morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
    afternoon: ['12:00 PM', '2:00 PM', '4:00 PM'],
    evening: ['5:00 PM', '6:00 PM', '7:00 PM'],
};

export const DateSlotPicker = ({ selectedDate, selectedSlot, onDateChange, onSlotChange }) => {
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
        // Create date in local timezone to avoid UTC conversion issues
        const date = new Date(year, month, day);
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
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select Date
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={previousMonth}
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
                                    onClick={() => handleDateClick(day)}
                                    disabled={past}
                                    className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                                        selected
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : past
                                            ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                            : today
                                            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                            : 'bg-gray-50 hover:bg-gray-100'
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
                                    const isSlotSelected = selectedSlot === slot;
                                    return (
                                        <button
                                            key={slot}
                                            onClick={() => onSlotChange(slot)}
                                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                                isSlotSelected
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
