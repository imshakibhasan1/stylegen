import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import '../styles/header.css';

const Header = () => {
  const { currentUser, logout } = useAuthStore();
  const { totalItems } = useCartStore();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);

  const handleUserIconClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
    setSearchQuery('');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">S</span>
          <span className="logo-text">StyleGen</span>
        </Link>

        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/track-orders">Track Order</Link>
        </nav>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="header-actions">
          <Link to="/cart" className="cart-icon">
            <span className="cart-badge">{totalItems}</span>
            🛒
          </Link>

          <div className="user-menu" ref={menuRef}>
            <button 
              className="user-btn" 
              onClick={handleUserIconClick}
              title={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Login'}
            >
              👤
            </button>

            {showMenu && (
              <div className="dropdown-menu">
                {currentUser ? (
                  <>
                    <div className="user-info">
                      <p>{currentUser.firstName} {currentUser.lastName}</p>
                      <small>{currentUser.email}</small>
                    </div>
                    <Link to="/dashboard" className="menu-item" onClick={() => setShowMenu(false)}>Dashboard</Link>
                    <Link to="/orders" className="menu-item" onClick={() => setShowMenu(false)}>My Orders</Link>
                    <Link to="/profile" className="menu-item" onClick={() => setShowMenu(false)}>Profile Settings</Link>
                    {currentUser.role === 'admin' && (
                      <Link to="/admin" className="menu-item admin" onClick={() => setShowMenu(false)}>Admin Panel</Link>
                    )}
                    <button onClick={handleLogout} className="menu-item logout">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="menu-item" onClick={() => setShowMenu(false)}>Login</Link>
                    <Link to="/register" className="menu-item" onClick={() => setShowMenu(false)}>Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
