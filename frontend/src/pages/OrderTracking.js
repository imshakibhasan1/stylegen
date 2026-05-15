import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuthStore } from '../store/authStore';
import '../styles/pages.css';

const OrderTracking = () => {
  const { id } = useParams();
  const { token } = useAuthStore();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(`/orders/${id}`);
        setOrder(response.data.data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrder();
  }, [id, token]);

  if (loading) return <div className="loading">Loading order...</div>;
  if (!order) return <div className="error">Order not found</div>;

  const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStep = statusSteps.indexOf(order.orderStatus);

  return (
    <div className="order-tracking-page">
      <h1>Track Your Order</h1>
      <div className="order-header">
        <h2>Order #{order.orderNumber}</h2>
        <p>Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
      </div>

      <div className="tracking-progress">
        <div className="progress-bar">
          {statusSteps.map((step, idx) => (
            <div
              key={step}
              className={`step ${idx <= currentStep ? 'completed' : ''} ${
                idx === currentStep ? 'current' : ''
              }`}
            >
              <div className="step-icon">
                {idx < currentStep && '✓'}
                {idx === currentStep && '▶'}
                {idx > currentStep && '○'}
              </div>
              <span className="step-label">{step.charAt(0).toUpperCase() + step.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tracking-container">
        <section className="shipping-info">
          <h3>Shipping Address</h3>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.streetAddress}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
            {order.shippingAddress.zipCode}
          </p>
        </section>

        <section className="tracking-history">
          <h3>Tracking History</h3>
          {order.trackingHistory && order.trackingHistory.length > 0 ? (
            <div className="timeline">
              {order.trackingHistory.map((entry, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker">●</div>
                  <div className="timeline-content">
                    <h4>{entry.status}</h4>
                    <p>{entry.location}</p>
                    <small>{new Date(entry.timestamp).toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No tracking updates yet</p>
          )}
        </section>

        <section className="order-items">
          <h3>Items Ordered</h3>
          <div className="items-list">
            {order.items.map((item) => (
              <div key={item.productId} className="order-item">
                <img src={item.image} alt={item.productName} />
                <div>
                  <h4>{item.productName}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderTracking;
