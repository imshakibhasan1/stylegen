# Stylezen - Quick Start Guide

Get your Stylezen e-commerce platform up and running in 5 minutes!

## Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- MongoDB Atlas account (free tier available)
- Git (optional)

## 5-Minute Setup

### 1. Setup Backend (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Backend is now running on `http://localhost:5000`

### 2. Setup Frontend (2 minutes)

In a **new terminal window**:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

✅ Frontend is now running on `http://localhost:3000`

### 3. Test the Application (1 minute)

1. Open browser to `http://localhost:3000`
2. Click **"Create an account"**
3. Register with test email: `test@example.com`
4. Browse products
5. Add items to cart
6. Complete checkout

**Your e-commerce platform is live!** 🎉

## Default Configuration

### MongoDB Atlas
- Connection string provided in `.env`
- Pre-configured database: `stylezen`
- Collections auto-created on first request

### API Base URL
- Frontend automatically configured with proxy
- Backend available at `http://localhost:5000`
- All API calls prefixed with `/api`

### Test Credentials
```
Email: test@example.com
Password: Test123!
Role: User
```

## Stopping the Servers

- **Backend**: Press `Ctrl+C` in backend terminal
- **Frontend**: Press `Ctrl+C` in frontend terminal

## Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
1. Check internet connection
2. Verify MongoDB Atlas credentials in `.env`
3. Whitelist your IP in MongoDB Atlas (Network Access)
4. Check database name matches

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Still Showing as In Use
```bash
# Change port in backend server.js
const PORT = 5001; // Change to different port
```

## Next Steps

1. **Customize Branding**
   - Update logo in Header component
   - Change colors in CSS files (primary: #ff5a1f)
   - Modify site name

2. **Add Products**
   - Use Postman to POST to `/api/products`
   - Or implement admin product upload form

3. **Setup Payment**
   - Integrate Stripe in checkout
   - Update payment processing

4. **Deploy Online**
   - Backend: Heroku, Railway, Render
   - Frontend: Vercel, Netlify, AWS S3

## Useful Links

- [MongoDB Atlas Setup](https://www.mongodb.com/cloud/atlas)
- [Node.js Download](https://nodejs.org/)
- [Postman API Testing](https://www.postman.com/)
- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com/)

## Support

If you encounter issues:

1. Check the terminal error messages
2. Verify all prerequisites are installed
3. Check MongoDB Atlas connection
4. Clear browser cache and restart servers
5. Review full documentation in README.md

---

**Congratulations! Your Stylezen platform is ready!** 🚀
