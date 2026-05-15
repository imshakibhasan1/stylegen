import create from 'zustand';
import axiosInstance, { API_URL } from '../api/axios';

export const useAuthStore = create((set) => ({
  currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ currentUser: user, token, loading: false });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      set({ error: message, loading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ currentUser: user, token, loading: false });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      set({ error: message, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ currentUser: null, token: null });
  },

  updateProfile: async (userData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put('/users/profile/update', userData);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      set({ currentUser: response.data.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message, loading: false });
      throw error;
    }
  },
}));
