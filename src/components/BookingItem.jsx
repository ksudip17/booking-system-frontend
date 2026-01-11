import { useState } from 'react';
import BookingForm from './BookingForm';

const BookingItem = ({ booking, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleUpdate = (formData) => {
        onUpdate(booking._id, formData);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="card p-6 border-primary-100 ring-4 ring-primary-50 transition-all duration-300">
                <BookingForm
                    initialData={booking}
                    onSubmit={handleUpdate}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className="card p-6 hover:shadow-lg transition-all duration-300 group bg-white border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-4">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 bg-primary-50 p-3 rounded-2xl group-hover:bg-primary-100 transition-colors duration-300">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-200">
                                {booking.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Added {formatDateTime(booking.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                        {booking.email && (
                            <div className="flex items-center space-x-2.5 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium truncate">{booking.email}</span>
                            </div>
                        )}

                        {booking.phone && (
                            <div className="flex items-center space-x-2.5 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-sm font-medium">{booking.phone}</span>
                            </div>
                        )}

                        <div className="flex items-center space-x-2.5 text-primary-700 bg-primary-50 px-3 py-2 rounded-lg">
                            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-semibold">{formatDate(booking.date)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex-1 md:flex-none px-4 py-2 bg-white text-primary-600 border border-primary-200 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                    </button>

                    <button
                        onClick={() => onDelete(booking._id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-white text-red-600 border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingItem;