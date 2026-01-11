import BookingItem from './BookingItem';

const BookingList = ({ bookings, onUpdate, onDelete }) => {
    if (bookings.length === 0) {
        return (
            <div className="card p-12 text-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-gray-100 p-4 rounded-full">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                        <p className="text-gray-600">Create your first booking to get started!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    <span>All Bookings</span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-base font-semibold">
                        {bookings.length}
                    </span>
                </h2>
            </div>

            <div className="space-y-4">
                {bookings.map((booking) => (
                    <BookingItem
                        key={booking._id}
                        booking={booking}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookingList;