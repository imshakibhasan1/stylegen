# Stylezen - Quick Reference Guide

## 🚀 Starting the Application

### Terminal 1 - Start Backend Server
```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Terminal 2 - Start Frontend Server
```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view stylezen-frontend in the browser.

Local:            http://localhost:3000
```

---

## 🧪 Quick Test Cases

### Test Case 1: Register New User
```
1. User icon (👤) → Register
2. First Name: Alex
3. Last Name: Rony
4. Email: user.rony302@gmail.com
5. Password: Test123456!
6. Confirm Password: Test123456!
7. Click "Create Account"
✅ Expected: Redirect to dashboard
```

### Test Case 2: Login Existing User
```
1. User icon (👤) → Login
2. Email: user.rony302@gmail.com
3. Password: Test123456!
4. Click "Sign in"
✅ Expected: Redirect to dashboard
```

### Test Case 3: Browse Products
```
1. Click "Products" in header
2. Scroll through product grid
3. Filter by category (sidebar)
4. Use search bar
✅ Expected: Products display and filter correctly
```

### Test Case 4: Add to Cart
```
1. Click on a product
2. Select color/size (if available)
3. Set quantity
4. Click "Add to Cart"
5. Check cart badge in header
✅ Expected: Cart badge updates with item count
```

### Test Case 5: View Cart
```
1. Click cart icon (🛒)
2. View items in cart
3. Update quantity
4. Remove items
✅ Expected: Cart items display and totals calculate
```

### Test Case 6: Track Order
```
1. Click "Track Order" in header
2. Enter order number and email
3. Click "Track Order"
✅ Expected: Navigate to order tracking page
```

### Test Case 7: User Menu
```
1. Click user icon (👤)
2. Menu should appear
3. Click outside menu
✅ Expected: Menu toggles on click, closes on outside click
```

---

## 🔧 Stopping Servers

### Stop Backend
Press `Ctrl+C` in backend terminal

### Stop Frontend
Press `Ctrl+C` in frontend terminal

---

## 📁 Project Structure

```
stylezen-ecommerce/
├── backend/
│   ├── node_modules/
│   ├── models/           (5 MongoDB models)
│   ├── routes/           (6 API routes)
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── node_modules/
│   ├── src/
│   │   ├── api/         (axios configuration)
│   │   ├── components/   (Header, Footer)
│   │   ├── pages/       (14+ pages)
│   │   ├── store/       (3 Zustand stores)
│   │   ├── styles/      (CSS files)
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── Documentation/
    ├── README.md
    ├── QUICKSTART.md
    ├── INSTALLATION.md
    ├── API_DOCUMENTATION.md
    ├── PROJECT_SUMMARY.md
    ├── DEPLOYMENT_CHECKLIST.md
    └── FINAL_VERIFICATION_REPORT.md
```

---

## 🛠️ Troubleshooting

### Frontend won't start (exit code 127)
```
❌ Old Issue: react-scripts ^0.0.0
✅ Fixed: Updated to react-scripts 5.0.1
✅ Solution: Already fixed in package.json
```

### User icon menu not responding
```
❌ Old Issue: Hover-only on mobile
✅ Fixed: Click-based toggle with outside detection
✅ Now works: Desktop and Mobile
```

### API calls not including authentication
```
❌ Old Issue: Manual header injection in each call
✅ Fixed: Centralized axios interceptor
✅ Now: Automatic token injection in all requests
```

### Navigation causing page reload
```
❌ Old Issue: Using <a href> tags
✅ Fixed: Using React Router <Link> components
✅ Now: Smooth SPA navigation
```

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/all` - Get featured products

### Categories
- `GET /api/categories` - Get all categories

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:productId` - Update quantity
- `DELETE /api/cart/remove/:productId` - Remove item

### Users
- `GET /api/users/profile/me` - Get current profile
- `PUT /api/users/profile/update` - Update profile
- `POST /api/users/password/change` - Change password
- `POST /api/users/address/add` - Add address
- `PUT /api/users/address/update/:index` - Update address
- `DELETE /api/users/address/delete/:index` - Delete address

---

## 💾 Browser Storage

### localStorage Keys
- `token` - JWT authentication token
- `user` - Current user object

### Clear Storage (if needed)
```javascript
// In browser console:
localStorage.clear()
// Then refresh the page
```

---

## 🎯 Pages & Routes

### Public Pages
- `/` - Home
- `/products` - Product listing
- `/products/:id` - Product detail
- `/categories` - Category listing
- `/track-orders` - Order tracking
- `/login` - User login
- `/register` - User registration

### Protected Pages (Login Required)
- `/cart` - Shopping cart
- `/checkout` - Order checkout
- `/dashboard` - User dashboard
- `/orders` - User's orders
- `/orders/:id` - Order tracking
- `/profile` - Profile settings

### Admin Pages (Admin Role Required)
- `/admin` - Admin dashboard

---

## ✅ Verification Checklist

Before deployment:
- [ ] Backend npm install successful
- [ ] Frontend npm install successful
- [ ] Backend server starts without errors
- [ ] Frontend app loads in browser
- [ ] User can register
- [ ] User can login
- [ ] User can browse products
- [ ] User can add to cart
- [ ] User can checkout
- [ ] API calls include Authorization header
- [ ] No console errors
- [ ] Navigation works smoothly

---

## 📞 Common Commands

```bash
# Install dependencies
npm install

# Run backend in development
npm run dev

# Run frontend (from root or frontend dir)
npm start

# Build frontend for production
npm run build

# Clear npm cache
npm cache clean --force

# Kill process on port
# macOS/Linux: lsof -i :3000 && kill -9 <PID>
# Windows: taskkill /PID <PID> /F
```

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Axios](https://axios-http.com)

---

**Version**: 1.0.0
**Last Updated**: May 15, 2026
**Status**: ✅ Production Ready
