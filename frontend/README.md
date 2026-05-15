# Stylezen Frontend

Stylezen E-commerce Platform Frontend built with React.js and Zustand state management.

## Features

- ✅ User authentication
- ✅ Product catalog with filters
- ✅ Product detail pages
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Order tracking
- ✅ User dashboard
- ✅ Admin panel
- ✅ Responsive design
- ✅ State management with Zustand

## Tech Stack

- **Framework**: React 18.2+
- **State Management**: Zustand 4.3+
- **Routing**: React Router 6.8+
- **HTTP Client**: Axios 1.3+
- **Styling**: CSS3

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file with the following:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

Development mode:
```bash
npm start
```

Production build:
```bash
npm run build
```

Application runs on `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.js
│   └── Footer.js
├── pages/              # Page components
│   ├── Home.js
│   ├── Products.js
│   ├── Login.js
│   ├── Cart.js
│   ├── Checkout.js
│   ├── Dashboard.js
│   └── AdminDashboard.js
├── store/              # Zustand state management
│   ├── authStore.js
│   ├── cartStore.js
│   └── productStore.js
├── styles/             # CSS files
│   ├── index.css
│   ├── components.css
│   └── pages.css
├── App.js              # Main App component
└── index.js            # Entry point
```

## Pages

### User Pages
- Home - Hero banner and featured products
- Products - Product listing with filters
- ProductDetail - Detailed product view with reviews
- Login - User login form
- Register - User registration form
- Cart - Shopping cart view
- Checkout - Order checkout process
- Dashboard - User profile and orders
- OrderHistory - User's order history
- OrderTracking - Track specific order
- ProfileSettings - Update profile information

### Admin Pages
- AdminDashboard - Admin overview and analytics
- AdminProducts - Product management
- AdminCategories - Category management
- AdminOrders - Order management
- AdminCustomers - Customer management

## State Management (Zustand)

### Auth Store
```javascript
- currentUser
- token
- login(email, password)
- register(userData)
- logout()
- updateProfile(userData)
```

### Cart Store
```javascript
- cartItems
- cartTotal
- addToCart(product)
- removeFromCart(productId)
- updateQuantity(productId, quantity)
- clearCart()
```

### Product Store
```javascript
- products
- filteredProducts
- selectedCategory
- searchQuery
- fetchProducts()
- filterProducts()
```

## Components

### Header
Navigation, logo, search, cart icon, user menu

### Footer
Links, newsletter signup, social media

### Product Card
Product image, name, price, rating, add to cart button

### Cart Item
Product details, quantity selector, remove button

## API Integration

All API calls use Axios with the base URL configured in environment variables.

Authentication header is automatically added for protected routes.

## Styling

Global styles and component-specific styles using pure CSS3.

Color scheme:
- Primary Orange: #ff5a1f
- Dark: #1a1a1a
- Light: #f5f5f5

Responsive breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Build & Deployment

```bash
npm run build
```

Deployment ready for:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## License

MIT
