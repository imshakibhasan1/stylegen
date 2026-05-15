import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { useAuthStore } from '../store/authStore';
import '../styles/pages.css';

const AdminDashboard = () => {
  const { token } = useAuthStore();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeCustomers: 0,
    lowStockProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all orders
        const ordersRes = await axiosInstance.get('/orders');
        const orders = ordersRes.data.data;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        // Fetch customers
        const customersRes = await axiosInstance.get('/users');
        const activeCustomers = customersRes.data.count;

        setStats({
          totalOrders: orders.length,
          totalRevenue: totalRevenue,
          activeCustomers: activeCustomers,
          lowStockProducts: 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStats();
  }, [token]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Manage your artisan business</p>

      <div className="dashboard-cards">
        <div className="card">
          <span className="icon">📊</span>
          <h3>${stats.totalRevenue.toFixed(2)}</h3>
          <p>Total Revenue</p>
        </div>
        <div className="card">
          <span className="icon">📦</span>
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>
        <div className="card">
          <span className="icon">👥</span>
          <h3>{stats.activeCustomers}</h3>
          <p>Active Customers</p>
        </div>
        <div className="card">
          <span className="icon">⚠️</span>
          <h3>{stats.lowStockProducts}</h3>
          <p>Low Stock Products</p>
        </div>
      </div>

      <div className="admin-sections">
        <a href="/admin/products" className="section-link">
          <h3>📦 Products Management</h3>
          <p>Manage your product inventory</p>
        </a>
        <a href="/admin/categories" className="section-link">
          <h3>📂 Categories</h3>
          <p>Organize your product categories</p>
        </a>
        <a href="/admin/orders" className="section-link">
          <h3>📋 Orders</h3>
          <p>Track and manage customer orders</p>
        </a>
        <a href="/admin/customers" className="section-link">
          <h3>👥 Customers</h3>
          <p>View and manage customers</p>
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
