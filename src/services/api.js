const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'https://bookgarnus-api.onrender.com'}/api/v1/bookings`;

// Helper function to get token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const bookingAPI = {
  // Get all bookings
  getAll: async () => {
    const response = await fetch(API_BASE_URL, {
      headers: getAuthHeader()
    });
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch bookings');
    }
    
    return data.data;
  },

  // Get single booking
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeader()
    });
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Booking not found');
    }
    
    return data.data;
  },

  // Create booking
  create: async (bookingData) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(bookingData)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to create booking');
    }
    
    return data.data;
  },

  // Update booking
  update: async (id, bookingData) => {
    const response = await fetch(`${API_BASE_URL}/${id}/edit`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(bookingData)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to update booking');
    }
    
    return data.data;
  },

  // Delete booking
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete booking');
    }
    
    return data;
  }
};