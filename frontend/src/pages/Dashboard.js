import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuthStore } from '../store/authStore';
import '../styles/pages.css';

const Dashboard = () => {
  const { currentUser, token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders/user/my-orders');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Welcome back, {currentUser?.firstName}!</h1>
        <p>Manage your leather collection</p>

        <div className="dashboard-cards">
          <div className="card">
            <span className="icon">📦</span>
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
          <div className="card">
            <span className="icon">✔️</span>
            <h3>{orders.filter(o => o.orderStatus === 'delivered').length}</h3>
            <p>Delivered</p>
          </div>
          <div className="card">
            <span className="icon">⏳</span>
            <h3>{orders.filter(o => o.orderStatus === 'processing').length}</h3>
            <p>Processing</p>
          </div>
          <div className="card">
            <span className="icon">🎁</span>
            <h3>12</h3>
            <p>Loyalty Points</p>
          </div>
        </div>

        <section className="recent-orders">
          <h2>Recent Orders</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders yet. Start shopping!</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td><span className="status-badge">{order.orderStatus}</span></td>
                    <td><a href={`/orders/${order._id}`}>View</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
