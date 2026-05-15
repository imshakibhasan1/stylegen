import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import '../styles/pages.css';

const Home = () => {
  const { products, fetchFeaturedProducts, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to StyleGen</h1>
          <p>Premium Handcrafted Leather Goods for the Modern Professional</p>
          <Link to="/products" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products?category=shoes" className="category-card">
            <div className="category-icon">👞</div>
            <h3>Shoes</h3>
          </Link>
          <Link to="/products?category=wallets" className="category-card">
            <div className="category-icon">💼</div>
            <h3>Wallets</h3>
          </Link>
          <Link to="/products?category=belts" className="category-card">
            <div className="category-icon">🎀</div>
            <h3>Belts</h3>
          </Link>
          <Link to="/products?category=bags" className="category-card">
            <div className="category-icon">👜</div>
            <h3>Bags</h3>
          </Link>
          <Link to="/products?category=accessories" className="category-card">
            <div className="category-icon">⌚</div>
            <h3>Accessories</h3>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
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
                  <div className="price-section">
                    <span className="price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="rating">⭐ {product.rating}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose StyleGen?</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">✂️</span>
            <h3>Handcrafted</h3>
            <p>Each piece is meticulously crafted by our skilled artisans.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🚚</span>
            <h3>Fast Shipping</h3>
            <p>Express delivery nationwide with real-time tracking.</p>
          </div>
          <div className="feature">
            <span className="feature-icon">♻️</span>
            <h3>Lifetime Warranty</h3>
            <p>We stand by the quality of our products.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
