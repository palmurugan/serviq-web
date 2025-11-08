import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Calendar, Check, Menu, X, Filter, ChevronDown, Phone, Mail, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const ServiceCard = ({ category, onClick }) => {
    return (
      <Card
        className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        onClick={onClick}
      >
        <CardContent className="p-6 flex flex-col items-center">
          <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center text-4xl mb-4`}>
            {category.icon}
          </div>
          <h3 className="font-semibold text-center">{category.name}</h3>
        </CardContent>
      </Card>
    );
  };