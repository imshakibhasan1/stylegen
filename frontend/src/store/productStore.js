import create from 'zustand';
import axiosInstance from '../api/axios';

export const useProductStore = create((set) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
  error: null,

  fetchProducts: async (page = 1, limit = 12, filters = {}) => {
    set({ loading: true });
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters,
      });

      const response = await axiosInstance.get(`/products?${queryParams}`);
      set({
        products: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/products/featured/all');
      set({
        products: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ loading: false });
      return response.data.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories');
      set({ categories: response.data.data });
    } catch (error) {
      set({ error: error.message });
    }
  },

  filterProducts: (category, searchQuery) => {
    set((state) => {
      let filtered = state.products;

      if (category) {
        filtered = filtered.filter((p) => p.category._id === category);
      }

      if (searchQuery) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return { filteredProducts: filtered, selectedCategory: category, searchQuery };
    });
  },
}));
