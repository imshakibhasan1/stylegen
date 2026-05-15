import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import '../styles/pages.css';

const Categories = () => {
  const { categories, fetchCategories, loading } = useProductStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Product Categories</h1>
        <p>Browse our handcrafted leather goods by category</p>
      </div>

      <div className="categories-grid">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <p className="product-count">{category.productCount} products</p>
                <Link
                  to={`/products?category=${category._id}`}
                  className="btn btn-primary"
                >
                  View Products
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
