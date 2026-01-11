import { useState, useEffect } from 'react';
import Layout from './Layout';
import BookingForm from './BookingForm';
import BookingList from './BookingList';
import DeleteModal from './DeleteModal';
import SearchFilter from './SearchFilter';
import { bookingAPI } from '../services/api';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchBookings();
  }, []);

  // Apply search, filter, and sort whenever they change
  useEffect(() => {
    let result = [...bookings];

    // Search by name
    if (searchTerm) {
      result = result.filter(booking =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter) {
      result = result.filter(booking => booking.date === dateFilter);
    }

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredBookings(result);
  }, [bookings, searchTerm, dateFilter, sortBy]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingAPI.getAll();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const newBooking = await bookingAPI.create(formData);
      setBookings([newBooking, ...bookings]);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const updated = await bookingAPI.update(id, formData);
      setBookings(bookings.map(b => b._id === updated._id ? updated : b));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    try {
      await bookingAPI.delete(deleteModal.id);
      setBookings(bookings.filter(b => b._id !== deleteModal.id));
      setError(null);
      closeDeleteModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      {error && (
        <div className="mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start space-x-2 sm:space-x-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-red-800 font-medium text-sm sm:text-base">Error</h3>
            <p className="text-red-700 text-xs sm:text-sm mt-1">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <BookingForm onSubmit={handleCreate} />

      {/* Search & Filter Component */}
      <SearchFilter
        onSearch={setSearchTerm}
        onFilter={setDateFilter}
        onSort={setSortBy}
      />

      {/* Results Count */}
      {(searchTerm || dateFilter) && (
        <div className="mb-4 text-xs sm:text-sm text-gray-600">
          Showing {filteredBookings.length} of {bookings.length} bookings
          {searchTerm && <span> matching "{searchTerm}"</span>}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <BookingList
          bookings={filteredBookings}
          onUpdate={handleUpdate}
          onDelete={openDeleteModal}
        />
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </Layout>
  );
};

export default Dashboard;