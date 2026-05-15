import create from 'zustand';
import axiosInstance from '../api/axios';

export const useCartStore = create((set, get) => ({
  cartItems: [],
  subtotal: 0,
  totalItems: 0,
  loading: false,

  fetchCart: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true });
    try {
      const response = await axiosInstance.get('/cart');
      set({
        cartItems: response.data.data.items || [],
        subtotal: response.data.data.subtotal || 0,
        totalItems: response.data.data.totalItems || 0,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      set({ loading: false });
    }
  },

  addToCart: async (productId, quantity = 1, color, size) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.post('/cart/add', {
        productId,
        quantity,
        color,
        size,
      });
      set({
        cartItems: response.data.data.items,
        subtotal: response.data.data.subtotal,
        totalItems: response.data.data.totalItems,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      set({ loading: false });
    }
  },

  updateQuantity: async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/cart/update/${productId}`, { quantity });
      set({
        cartItems: response.data.data.items,
        subtotal: response.data.data.subtotal,
        totalItems: response.data.data.totalItems,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
      set({ loading: false });
    }
  },

  removeFromCart: async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true });
    try {
      const response = await axiosInstance.delete(`/cart/remove/${productId}`);
      set({
        cartItems: response.data.data.items,
        subtotal: response.data.data.subtotal,
        totalItems: response.data.data.totalItems,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      set({ loading: false });
    }
  },

  clearCart: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true });
    try {
      await axiosInstance.delete('/cart/clear/all');
      set({ cartItems: [], subtotal: 0, totalItems: 0, loading: false });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      set({ loading: false });
    }
  },
}));
