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
  isUsingFallback: false,

  fetchProducts: async (page = 1, limit = 12, filters = {}) => {
    set({ loading: true, error: null });
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
        isUsingFallback: response.data.fromFallback || false,
        error: response.data.fromFallback ? response.data.message : null,
      });
    } catch (error) {
      console.error('❌ Error fetching products:', error.message);
      set({ 
        error: 'Failed to load products. Please try again.', 
        loading: false,
        products: [],
      });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/products/featured/all');
      set({
        products: response.data.data,
        loading: false,
        isUsingFallback: response.data.fromFallback || false,
        error: response.data.fromFallback ? response.data.message : null,
      });
    } catch (error) {
      console.error('❌ Error fetching featured products:', error.message);
      set({ 
        error: 'Failed to load featured products. Please try again.', 
        loading: false,
        products: [],
      });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ 
        loading: false,
        isUsingFallback: response.data.fromFallback || false,
        error: response.data.fromFallback ? response.data.message : null,
      });
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching product:', error.message);
      set({ 
        error: 'Failed to load product details. Please try again.', 
        loading: false,
      });
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories');
      set({ 
        categories: response.data.data,
        isUsingFallback: response.data.fromFallback || false,
        error: response.data.fromFallback ? response.data.message : null,
      });
    } catch (error) {
      console.error('❌ Error fetching categories:', error.message);
      set({ error: 'Failed to load categories. Please try again.' });
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

  clearError: () => set({ error: null }),
}));
