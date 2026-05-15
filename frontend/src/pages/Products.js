import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import '../styles/pages.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const { products, categories, fetchProducts, fetchCategories, loading } = useProductStore();
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filters = {};
    if (selectedCategory) filters.category = selectedCategory;
    if (priceRange[0] > 0) filters.minPrice = priceRange[0];
    if (priceRange[1] < 5000) filters.maxPrice = priceRange[1];
    if (searchParams.get('search')) filters.search = searchParams.get('search');

    fetchProducts(1, 12, filters);
  }, [selectedCategory, priceRange, searchParams]);

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="products-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          <div className="filter-group">
            <h4>Category</h4>
            <div>
              <label>
                <input
                  type="radio"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                All Categories
              </label>
              {categories.map((cat) => (
                <label key={cat._id}>
                  <input
                    type="radio"
                    value={cat._id}
                    checked={selectedCategory === cat._id}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
            <p>${priceRange[0]} - ${priceRange[1]}</p>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                  {product.discount && <span className="discount-badge">Save {product.discount}%</span>}
                  <div className="product-image">
                    <img src={product.images[0]?.url || 'https://via.placeholder.com/250'} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="category">{product.category.name}</p>
                    <div className="price-section">
                      <span className="price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="rating">⭐ {product.rating.toFixed(1)}</div>
                    <div className="stock-status">
                      {product.stock > 0 ? (
                        <span className="in-stock">In Stock</span>
                      ) : (
                        <span className="out-of-stock">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
