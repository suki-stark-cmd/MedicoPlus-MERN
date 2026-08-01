import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { Bell, Check, Trash2, Clock, Calendar } from 'lucide-react'

const Notifications = () => {
    const { backendUrl, token } = useContext(AppContext)
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    // Mock notification data
    const mockNotifications = [
        {
            id: 1,
            type: 'appointment',
            title: 'Appointment Confirmed',
            message: 'Your appointment with Dr. Sarah Chen is confirmed for 2026-08-05 at 10:30 AM.',
            time: '2 hours ago',
            read: false,
            icon: <Calendar className="w-5 h-5 text-blue-600" />,
        },
        {
            id: 2,
            type: 'reminder',
            title: 'Appointment Reminder',
            message: 'Reminder: Your appointment with Dr. Michael Rodriguez is tomorrow at 2:00 PM.',
            time: '1 day ago',
            read: false,
            icon: <Clock className="w-5 h-5 text-amber-600" />,
        },
        {
            id: 3,
            type: 'prescription',
            title: 'Prescription Ready',
            message: 'Dr. Sarah Chen has added a prescription to your record. You can view it in your Prescriptions page.',
            time: '3 days ago',
            read: true,
            icon: <Calendar className="w-5 h-5 text-emerald-600" />,
        },
    ]

    useEffect(() => {
        // In production, fetch from backend
        // const response = await axios.get(`${backendUrl}/api/user/notifications`, { headers: { token } })
        setNotifications(mockNotifications)
        setLoading(false)
    }, [backendUrl, token])

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ))
    }

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id))
    }

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-16 bg-slate-200 rounded"></div>
                    <div className="h-16 bg-slate-200 rounded"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-12 px-4 sm:px-[6%] max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Notifications</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {notifications.filter(n => !n.read).length} unread notification{notifications.filter(n => !n.read).length !== 1 ? 's' : ''}
                    </p>
                </div>
                {notifications.some(n => !n.read) && (
                    <button
                        onClick={markAllRead}
                        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No notifications</h3>
                    <p className="text-slate-500 text-sm">You're all caught up! Check back later for updates.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`bg-white rounded-2xl border p-4 transition-all ${
                                notification.read
                                    ? 'border-slate-100'
                                    : 'border-blue-200 bg-blue-50/30'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 pt-0.5">
                                    {notification.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className={`font-semibold ${
                                                notification.read ? 'text-slate-700' : 'text-slate-900'
                                            }`}>
                                                {notification.title}
                                            </h3>
                                            <p className={`text-sm text-slate-500 mt-1 ${
                                                notification.read ? '' : 'font-medium'
                                            }`}>
                                                {notification.message}
                                            </p>
                                        </div>
                                        <span className="text-xs text-slate-400 flex-shrink-0">
                                            {notification.time}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-3">
                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                            >
                                                <Check className="w-3 h-3" />
                                                Mark as read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Notifications
