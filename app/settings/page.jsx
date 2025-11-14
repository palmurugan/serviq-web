"use client"

import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, MapPin, Globe, Smartphone, Mail, Lock, Eye, EyeOff, Download, Trash2, CheckCircle, XCircle, AlertCircle, Moon, Sun, Volume2, VolumeX, Languages, Clock, Calendar, DollarSign, HelpCircle, FileText, Share2, Users, Zap, Database, Code, Palette, Monitor, ChevronRight, Save, X, Check, Menu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Settings Menu Configuration
const settingsMenu = [
    {
        id: 'account',
        label: 'Account',
        icon: User,
        items: [
            { id: 'profile', label: 'Profile Information', icon: User },
            { id: 'email', label: 'Email Settings', icon: Mail },
            { id: 'phone', label: 'Phone Number', icon: Smartphone },
            { id: 'language', label: 'Language & Region', icon: Languages },
        ],
    },
    {
        id: 'security',
        label: 'Security & Privacy',
        icon: Shield,
        items: [
            { id: 'password', label: 'Password', icon: Lock },
            { id: 'two-factor', label: 'Two-Factor Authentication', icon: Shield },
            { id: 'sessions', label: 'Active Sessions', icon: Monitor },
            { id: 'privacy', label: 'Privacy Settings', icon: Eye },
        ],
    },
    {
        id: 'notifications',
        label: 'Notifications',
        icon: Bell,
        items: [
            { id: 'email-notifications', label: 'Email Notifications', icon: Mail },
            { id: 'push-notifications', label: 'Push Notifications', icon: Bell },
            { id: 'sms-notifications', label: 'SMS Notifications', icon: Smartphone },
        ],
    },
    {
        id: 'payments',
        label: 'Payments & Billing',
        icon: CreditCard,
        items: [
            { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
            { id: 'billing-history', label: 'Billing History', icon: FileText },
            { id: 'billing-address', label: 'Billing Address', icon: MapPin },
        ],
    },
    {
        id: 'preferences',
        label: 'Preferences',
        icon: Palette,
        items: [
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'sound', label: 'Sound Settings', icon: Volume2 },
            { id: 'booking-preferences', label: 'Booking Preferences', icon: Calendar },
        ],
    },
    {
        id: 'data',
        label: 'Data & Storage',
        icon: Database,
        items: [
            { id: 'download-data', label: 'Download Your Data', icon: Download },
            { id: 'data-sharing', label: 'Data Sharing', icon: Share2 },
            { id: 'delete-account', label: 'Delete Account', icon: Trash2 },
        ],
    },
];

// Profile Information Settings
const ProfileSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        bio: 'Service booking enthusiast',
        dateOfBirth: '1990-05-15',
        gender: 'Male',
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
                <p className="text-gray-600">Manage your personal information and how others see you</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                            <input
                                type="text"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                disabled={!isEditing}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50"
                            />
                            <p className="text-xs text-gray-500 mt-1">This is how your name will appear to service providers</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                disabled={!isEditing}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Password Settings
const PasswordSettings = () => {
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h2>
                <p className="text-gray-600">Ensure your account is using a strong password</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.current ? 'text' : 'password'}
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                >
                                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                >
                                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Alert className="bg-blue-50 border-blue-200">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            <AlertDescription className="text-blue-800 text-sm">
                                <strong>Password Tips:</strong> Use a mix of uppercase and lowercase letters, numbers, and special characters.
                            </AlertDescription>
                        </Alert>

                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            Update Password
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Two-Factor Authentication Settings
const TwoFactorSettings = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
                <p className="text-gray-600">Add an extra layer of security to your account</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">Authentication App</h3>
                            <p className="text-sm text-gray-600">Use an authentication app to generate one-time codes</p>
                        </div>
                        <button
                            onClick={() => setIsEnabled(!isEnabled)}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${isEnabled
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isEnabled ? 'Disable' : 'Enable'}
                        </button>
                    </div>

                    {isEnabled ? (
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                Two-factor authentication is currently <strong>enabled</strong>. Your account is protected.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Alert className="bg-yellow-50 border-yellow-200">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <AlertDescription className="text-yellow-800">
                                Two-factor authentication is currently <strong>disabled</strong>. Enable it to secure your account.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="mt-6 space-y-3">
                        <h4 className="font-semibold text-gray-900">Backup Codes</h4>
                        <p className="text-sm text-gray-600">Save these codes in a safe place. You can use them to access your account if you lose your phone.</p>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Backup Codes
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Email Notifications Settings
const EmailNotificationsSettings = () => {
    const [settings, setSettings] = useState({
        bookingConfirmation: true,
        bookingReminders: true,
        serviceCompletion: true,
        cancellations: true,
        promotions: false,
        newsletter: true,
        productUpdates: false,
        recommendations: true,
    });

    const toggleSetting = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const notificationCategories = [
        {
            title: 'Booking Notifications',
            items: [
                { key: 'bookingConfirmation', label: 'Booking Confirmations', description: 'Get notified when your booking is confirmed' },
                { key: 'bookingReminders', label: 'Booking Reminders', description: 'Receive reminders before your scheduled service' },
                { key: 'serviceCompletion', label: 'Service Completion', description: 'Notification when your service is completed' },
                { key: 'cancellations', label: 'Cancellations', description: 'Updates about booking cancellations or changes' },
            ],
        },
        {
            title: 'Marketing Communications',
            items: [
                { key: 'promotions', label: 'Promotional Offers', description: 'Special deals and discounts' },
                { key: 'newsletter', label: 'Newsletter', description: 'Weekly newsletter with tips and updates' },
                { key: 'productUpdates', label: 'Product Updates', description: 'New features and service announcements' },
                { key: 'recommendations', label: 'Service Recommendations', description: 'Personalized service suggestions' },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Notifications</h2>
                <p className="text-gray-600">Choose what emails you want to receive</p>
            </div>

            {notificationCategories.map((category, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {category.items.map((item) => (
                                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.label}</p>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleSetting(item.key)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${settings[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

// Appearance Settings
const AppearanceSettings = () => {
    const [theme, setTheme] = useState('light');
    const [compactMode, setCompactMode] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Appearance</h2>
                <p className="text-gray-600">Customize how the app looks for you</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Theme</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {['light', 'dark', 'auto'].map((option) => (
                            <button
                                key={option}
                                onClick={() => setTheme(option)}
                                className={`p-4 border-2 rounded-lg transition-all ${theme === option ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    {option === 'light' && <Sun className="w-8 h-8 text-yellow-500" />}
                                    {option === 'dark' && <Moon className="w-8 h-8 text-blue-600" />}
                                    {option === 'auto' && <Monitor className="w-8 h-8 text-gray-600" />}
                                    <span className="font-medium capitalize">{option}</span>
                                    {theme === option && <Check className="w-4 h-4 text-blue-600" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900">Compact Mode</p>
                            <p className="text-sm text-gray-600">Reduce spacing and make UI more dense</p>
                        </div>
                        <button
                            onClick={() => setCompactMode(!compactMode)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${compactMode ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${compactMode ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Download Data Settings
const DownloadDataSettings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Download Your Data</h2>
                <p className="text-gray-600">Get a copy of all your data stored with us</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <Alert className="bg-blue-50 border-blue-200">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            <AlertDescription className="text-blue-800">
                                You can request a copy of your data at any time. We'll prepare a downloadable file containing all your information.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900">What's included:</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    Profile information and account details
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    Booking history and service records
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    Payment history and transaction records
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    Reviews and ratings you've given
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    Communication preferences and settings
                                </li>
                            </ul>
                        </div>

                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Request Data Download
                        </button>

                        <p className="text-xs text-gray-500">You'll receive an email with a download link within 48 hours.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Delete Account Settings
const DeleteAccountSettings = () => {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Account</h2>
                <p className="text-gray-600">Permanently delete your account and all associated data</p>
            </div>

            <Card className="border-2 border-red-200">
                <CardContent className="p-6">
                    <Alert className="bg-red-50 border-red-200 mb-6">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                            <strong>Warning:</strong> This action cannot be undone. All your data will be permanently deleted.
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">What will be deleted:</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                Your profile and account information
                            </li>
                            <li className="flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                All booking history and records
                            </li>
                            <li className="flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                Saved addresses and payment methods
                            </li>
                            <li className="flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                Reviews and ratings
                            </li>
                            <li className="flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                All preferences and settings
                            </li>
                        </ul>

                        {!showConfirm ? (
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Delete My Account
                            </button>
                        ) : (
                            <div className="space-y-3 p-4 bg-red-50 rounded-lg border border-red-200">
                                <p className="font-medium text-red-900">Are you absolutely sure?</p>
                                <p className="text-sm text-red-700">Type "DELETE" to confirm account deletion</p>
                                <input
                                    type="text"
                                    placeholder="Type DELETE"
                                    className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                                <div className="flex gap-3">
                                    <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                                        Confirm Deletion
                                    </button>
                                    <button
                                        onClick={() => setShowConfirm(false)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Settings Content Renderer
const SettingsContent = ({ activeSection }) => {
    const contentMap = {
        profile: <ProfileSettings />,
        password: <PasswordSettings />,
        'two-factor': <TwoFactorSettings />,
        'email-notifications': <EmailNotificationsSettings />,
        appearance: <AppearanceSettings />,
        'download-data': <DownloadDataSettings />,
        'delete-account': <DeleteAccountSettings />,
    };

    return (
        <div>
            {contentMap[activeSection] || (
                <div className="text-center py-16">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
                    <p className="text-gray-600">This settings section is under development</p>
                </div>
            )}
        </div>
    );
};

// Main Settings Page Component
const SettingsPage = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [expandedGroups, setExpandedGroups] = useState(['account']);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleGroup = (groupId) => {
        setExpandedGroups((prev) =>
            prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
        );
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMobileSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Manage your account settings and preferences</p>
                </div>

                <div className="flex gap-6">
                    {/* Mobile Sidebar Toggle */}
                    <button
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Left Sidebar */}
                    <aside
                        className={`${isMobileSidebarOpen ? 'fixed inset-0 z-40' : 'hidden'
                            } lg:block lg:relative lg:w-64 flex-shrink-0`}
                    >
                        {/* Mobile Backdrop */}
                        {isMobileSidebarOpen && (
                            <div
                                className="lg:hidden fixed inset-0 bg-black bg-opacity-50"
                                onClick={() => setIsMobileSidebarOpen(false)}
                            />
                        )}

                        {/* Sidebar Content */}
                        <div
                            className={`${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                                } lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-64 bg-white border-r lg:border border-gray-200 rounded-none lg:rounded-xl overflow-y-auto transition-transform duration-300 z-50`}
                        >
                            {/* Mobile Close Button */}
                            <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 className="font-semibold text-gray-900">Settings Menu</h2>
                                <button
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="p-3">
                                {settingsMenu.map((group) => (
                                    <div key={group.id} className="mb-2">
                                        <button
                                            onClick={() => toggleGroup(group.id)}
                                            className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <group.icon className="w-4 h-4" />
                                                {group.label}
                                            </div>
                                            <ChevronRight
                                                className={`w-4 h-4 transition-transform ${expandedGroups.includes(group.id) ? 'rotate-90' : ''
                                                    }`}
                                            />
                                        </button>

                                        {expandedGroups.includes(group.id) && (
                                            <div className="mt-1 ml-6 space-y-1">
                                                {group.items.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleSectionClick(item.id)}
                                                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${activeSection === item.id
                                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                                : 'text-gray-600 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        <item.icon className="w-4 h-4" />
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Right Content Area */}
                    <main className="flex-1 min-w-0">
                        <SettingsContent activeSection={activeSection} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;