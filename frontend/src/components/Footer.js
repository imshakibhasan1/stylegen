import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>StyleGen</h3>
          <p>Premium handcrafted leather goods for the modern professional.</p>
          <div className="social-links">
            <a href="#facebook">f</a>
            <a href="#twitter">𝕏</a>
            <a href="#instagram">📷</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>CUSTOMER CARE</h4>
          <Link to="/track-orders">Track Order</Link>
          <Link to="/shipping">Shipping & Returns</Link>
          <Link to="/store-locator">Store Locator</Link>
          <Link to="/care-guide">Care Guide</Link>
        </div>

        <div className="footer-section">
          <h4>QUICK LINKS</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About StyleGen</Link>
        </div>

        <div className="footer-section newsletter">
          <h4>JOIN OUR NEWSLETTER</h4>
          <p>Get early access to new drops and exclusive offers.</p>
          <form>
            <input type="email" placeholder="Your email address" />
            <button type="submit">JOIN</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 StyleGen Leather Craft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
