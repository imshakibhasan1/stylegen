import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import '../styles/pages.css';

const TrackOrders = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.get('/orders/user/my-orders', {
        params: { orderNumber, email },
      });

      if (response.data.success && response.data.data.length > 0) {
        navigate(`/orders/${response.data.data[0]._id}`);
      } else {
        setError('Order not found. Please check your details.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to track order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-orders-page">
      <div className="page-header">
        <h1>Track Your Order</h1>
        <p>Enter your order details to track your shipment</p>
      </div>

      <div className="track-orders-container">
        <form onSubmit={handleSubmit} className="track-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Order Number</label>
            <input
              type="text"
              placeholder="e.g., ORD-20240115001"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </form>

        <div className="track-info">
          <h3>How to track your order:</h3>
          <ol>
            <li>Enter your order number (found in your confirmation email)</li>
            <li>Provide your email address</li>
            <li>Click "Track Order" to see real-time updates</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TrackOrders;
