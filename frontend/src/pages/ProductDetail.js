import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import '../styles/pages.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { fetchProductById, loading } = useProductStore();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        if (data.colors.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes.length > 0) setSelectedSize(data.sizes[0]);
      } catch (error) {
        console.error('Failed to load product:', error);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity, selectedColor, selectedSize);
      alert('Added to cart!');
    }
  };

  if (loading || !product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Images Section */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[activeImage]?.url || 'https://via.placeholder.com/500'} alt={product.name} />
            {product.discount && <span className="discount-badge">Save {product.discount}%</span>}
          </div>
          <div className="thumbnail-images">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.altText}
                onClick={() => setActiveImage(idx)}
                className={activeImage === idx ? 'active' : ''}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="product-details">
          <h1>{product.name}</h1>
          <div className="rating-section">
            <span className="rating">⭐ {product.rating} ({product.totalReviews} reviews)</span>
          </div>

          <div className="price-section">
            <span className="price">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
            {product.discount && <span className="discount">-{product.discount}%</span>}
          </div>

          <p className="description">{product.description}</p>

          {product.material && <p><strong>Material:</strong> {product.material}</p>}

          {product.colors && product.colors.length > 0 && (
            <div className="selector">
              <label>Color:</label>
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {product.colors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="selector">
              <label>Size:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

          <div className="quantity-selector">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            />
          </div>

          <div className="stock-status">
            {product.stock > 0 ? (
              <span className="in-stock">✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>

          <div className="product-features">
            <h3>Features</h3>
            <ul>
              <li>✓ Lifetime Stitching Warranty</li>
              <li>✓ Free Express Delivery Nationwide</li>
              <li>✓ 30-Day Hassle-Free Exchange</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-list">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="review-item">
                <div className="review-header">
                  <span className="rating">{'⭐'.repeat(review.rating)}</span>
                  <span className="date">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="comment">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;
