"use client"

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Shield, Bell, CreditCard, Heart, Award, TrendingUp, Package, Star, CheckCircle, Clock, Home, Briefcase, ChevronRight, Lock, Eye, EyeOff, Trash2, Plus, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock user data
const mockUserData = {
    personal: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=3b82f6&color=fff',
        dateOfBirth: '1990-05-15',
        gender: 'Male',
        joinedDate: '2024-01-15',
    },
    addresses: [
        {
            id: 1,
            type: 'Home',
            name: 'Home',
            address: '123 MG Road, Downtown Area',
            city: 'Kollam',
            state: 'Kerala',
            pincode: '691001',
            isDefault: true,
        },
        {
            id: 2,
            type: 'Work',
            name: 'Office',
            address: '456 Tech Park, IT Hub',
            city: 'Kollam',
            state: 'Kerala',
            pincode: '691002',
            isDefault: false,
        },
    ],
    stats: {
        totalBookings: 24,
        completedServices: 20,
        cancelledServices: 2,
        upcomingServices: 2,
        totalSpent: 15680,
        memberSince: 'January 2024',
        favoriteServices: ['Home Cleaning', 'AC Repair', 'Beauty & Salon'],
        averageRating: 4.8,
    },
    preferences: {
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: false,
        promotionalEmails: true,
        bookingReminders: true,
        serviceRecommendations: true,
    },
    paymentMethods: [
        {
            id: 1,
            type: 'UPI',
            identifier: 'john@paytm',
            isDefault: true,
        },
        {
            id: 2,
            type: 'Card',
            identifier: '**** **** **** 4532',
            isDefault: false,
        },
    ],
};

// Profile Header Component
const ProfileHeader = ({ userData, onEdit }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Card className="mb-6">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Avatar */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <img
                            src={userData.personal.avatar}
                            alt={userData.personal.name}
                            className="w-32 h-32 rounded-full border-4 border-blue-600"
                        />
                        {isHovering && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.personal.name}</h1>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">{userData.personal.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">{userData.personal.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">Member since {userData.stats.memberSince}</span>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                                <Package className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-xs text-blue-700">Total Bookings</p>
                                    <p className="text-lg font-bold text-blue-900">{userData.stats.totalBookings}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                                <Star className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="text-xs text-green-700">Avg Rating</p>
                                    <p className="text-lg font-bold text-green-900">{userData.stats.averageRating}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                                <div>
                                    <p className="text-xs text-purple-700">Total Spent</p>
                                    <p className="text-lg font-bold text-purple-900">₹{userData.stats.totalSpent}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <button
                        onClick={onEdit}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

// Personal Information Section
const PersonalInfoSection = ({ userData, isEditing, onSave, onCancel }) => {
    const [formData, setFormData] = useState(userData.personal);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => handleChange('gender', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                onClick={() => onSave(formData)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                            <button
                                onClick={onCancel}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Full Name</p>
                            <p className="font-medium text-gray-900">{userData.personal.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <p className="font-medium text-gray-900">{userData.personal.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Phone</p>
                            <p className="font-medium text-gray-900">{userData.personal.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                            <p className="font-medium text-gray-900">
                                {new Date(userData.personal.dateOfBirth).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Gender</p>
                            <p className="font-medium text-gray-900">{userData.personal.gender}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Address Form Modal
const AddressFormModal = ({ isOpen, onClose, address, onSave }) => {
    const [formData, setFormData] = useState(
        address || {
            name: '',
            type: 'Home',
            address: '',
            city: '',
            state: '',
            pincode: '',
            isDefault: false,
        }
    );
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Address label is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Pincode must be 6 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave(formData);
            onClose();
        }
    };

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {address ? 'Edit Address' : 'Add New Address'}
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address Label <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder="e.g., Home, Office"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => handleChange('type', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="Home">Home</option>
                                        <option value="Work">Work</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Complete Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    placeholder="House/Flat No., Street, Area, Landmark"
                                    rows={3}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.address ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleChange('city', e.target.value)}
                                        placeholder="City"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => handleChange('state', e.target.value)}
                                        placeholder="State"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.state ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pincode <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.pincode}
                                        onChange={(e) => handleChange('pincode', e.target.value)}
                                        placeholder="6-digit pincode"
                                        maxLength={6}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.pincode ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="setDefault"
                                    checked={formData.isDefault}
                                    onChange={(e) => handleChange('isDefault', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="setDefault" className="text-sm text-gray-700">
                                    Set as default address
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            {address ? 'Update Address' : 'Save Address'}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
                    {/* Content */}
                    <div className="p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h3>
                        <p className="text-sm text-gray-600 text-center mb-6">{message}</p>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="flex-1 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Saved Addresses Section
const SavedAddressesSection = ({ addresses, onAddNew, onEdit, onDelete, onSetDefault }) => {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, addressId: null });

    const handleAddNew = () => {
        setEditingAddress(null);
        setShowAddressModal(true);
    };

    const handleEdit = (address) => {
        setEditingAddress(address);
        setShowAddressModal(true);
    };

    const handleSaveAddress = (addressData) => {
        if (editingAddress) {
            console.log('Update address:', { ...addressData, id: editingAddress.id });
        } else {
            console.log('Add new address:', addressData);
        }
        onAddNew(addressData);
        setShowAddressModal(false);
        setEditingAddress(null);
    };

    const handleDeleteClick = (addressId) => {
        setDeleteModal({ isOpen: true, addressId });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.addressId) {
            onDelete(deleteModal.addressId);
        }
    };

    return (
        <>
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            Saved Addresses
                        </CardTitle>
                        <button
                            onClick={handleAddNew}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add New
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className={`p-4 rounded-lg border-2 ${address.isDefault ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            {address.type === 'Home' ? (
                                                <Home className="w-5 h-5 text-gray-600" />
                                            ) : address.type === 'Work' ? (
                                                <Briefcase className="w-5 h-5 text-gray-600" />
                                            ) : (
                                                <MapPin className="w-5 h-5 text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-900">{address.name}</h4>
                                                {address.isDefault && (
                                                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-medium">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                                            <p className="text-sm text-gray-600">
                                                {address.city}, {address.state} - {address.pincode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!address.isDefault && (
                                            <button
                                                onClick={() => onSetDefault(address.id)}
                                                className="px-3 py-1.5 text-xs border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                                            >
                                                Set Default
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleEdit(address)}
                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(address.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Address Form Modal */}
            <AddressFormModal
                isOpen={showAddressModal}
                onClose={() => {
                    setShowAddressModal(false);
                    setEditingAddress(null);
                }}
                address={editingAddress}
                onSave={handleSaveAddress}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, addressId: null })}
                onConfirm={handleConfirmDelete}
                title="Delete Address?"
                message="Are you sure you want to delete this address? This action cannot be undone."
            />
        </>
    );
};

// Payment Methods Section
const PaymentMethodsSection = ({ paymentMethods, onAddNew, onDelete, onSetDefault }) => {
    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        Payment Methods
                    </CardTitle>
                    <button
                        onClick={onAddNew}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add New
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className={`p-4 rounded-lg border-2 flex items-center justify-between ${method.isDefault ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-gray-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-900">{method.type}</p>
                                        {method.isDefault && (
                                            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-medium">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{method.identifier}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!method.isDefault && (
                                    <button
                                        onClick={() => onSetDefault(method.id)}
                                        className="px-3 py-1.5 text-xs border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                                    >
                                        Set Default
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete(method.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

// Notification Preferences Section
const NotificationPreferencesSection = ({ preferences, onChange }) => {
    const notificationOptions = [
        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive booking updates via email' },
        { key: 'smsNotifications', label: 'SMS Notifications', description: 'Get SMS alerts for bookings' },
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
        { key: 'promotionalEmails', label: 'Promotional Emails', description: 'Receive offers and discounts' },
        { key: 'bookingReminders', label: 'Booking Reminders', description: 'Reminders before service time' },
        { key: 'serviceRecommendations', label: 'Service Recommendations', description: 'Personalized service suggestions' },
    ];

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Notification Preferences
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {notificationOptions.map((option) => (
                        <div key={option.key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{option.label}</p>
                                <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                            <button
                                onClick={() => onChange(option.key, !preferences[option.key])}
                                className={`relative w-12 h-6 rounded-full transition-colors ${preferences[option.key] ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${preferences[option.key] ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

// Security Section
const SecuritySection = () => {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Security Settings
                </CardTitle>
            </CardHeader>
            <CardContent>
                {!showPasswordForm ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="font-medium text-gray-900">Password</p>
                                    <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowPasswordForm(true)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                            >
                                Change Password
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-gray-600" />
                                <div>
                                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                                Enable
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.current ? 'text' : 'password'}
                                    value={passwordData.current}
                                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? 'text' : 'password'}
                                    value={passwordData.new}
                                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    value={passwordData.confirm}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Update Password
                            </button>
                            <button
                                onClick={() => setShowPasswordForm(false)}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Main User Profile Component
const UserProfile = () => {
    const [userData] = useState(mockUserData);
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);

    const handleSavePersonalInfo = (data) => {
        console.log('Save personal info:', data);
        setIsEditingPersonal(false);
    };

    const handlePreferenceChange = (key, value) => {
        console.log('Update preference:', key, value);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ProfileHeader userData={userData} onEdit={() => setIsEditingPersonal(true)} />

                <PersonalInfoSection
                    userData={userData}
                    isEditing={isEditingPersonal}
                    onSave={handleSavePersonalInfo}
                    onCancel={() => setIsEditingPersonal(false)}
                />

                <SavedAddressesSection
                    addresses={userData.addresses}
                    onAddNew={() => console.log('Add new address')}
                    onEdit={(address) => console.log('Edit address:', address)}
                    onDelete={(id) => console.log('Delete address:', id)}
                    onSetDefault={(id) => console.log('Set default address:', id)}
                />

                <PaymentMethodsSection
                    paymentMethods={userData.paymentMethods}
                    onAddNew={() => console.log('Add payment method')}
                    onDelete={(id) => console.log('Delete payment method:', id)}
                    onSetDefault={(id) => console.log('Set default payment:', id)}
                />

                <NotificationPreferencesSection
                    preferences={userData.preferences}
                    onChange={handlePreferenceChange}
                />

                <SecuritySection />

                {/* Danger Zone */}
                <Card className="border-2 border-red-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            Danger Zone
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Delete Account</p>
                                <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                            </div>
                            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                                Delete Account
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserProfile;