# Installation & Configuration Guide

Complete step-by-step guide to set up Stylezen on your local machine.

## System Requirements

### Minimum
- Node.js 14.0.0 or higher
- npm 6.0.0 or yarn 1.22.0
- 2GB RAM
- 500MB disk space

### Recommended
- Node.js 18+
- npm 8+
- 4GB RAM
- Fast internet connection

## Pre-Installation Checklist

```bash
# Check Node.js version
node --version  # Should be v14+

# Check npm version
npm --version   # Should be v6+
```

## Detailed Installation Steps

### Step 1: Clone/Extract Project

```bash
# If from zip file
unzip stylezen-ecommerce.zip
cd stylezen-ecommerce

# If from git
git clone <repository-url>
cd stylezen-ecommerce
```

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Directory
```bash
cd backend
```

#### 2.2 Install Dependencies
```bash
npm install
```

This installs:
- express (HTTP server)
- mongoose (MongoDB driver)
- jsonwebtoken (JWT auth)
- bcryptjs (Password hashing)
- cors (Cross-origin requests)
- dotenv (Environment variables)

#### 2.3 Configure Environment Variables

Edit `.env` file in backend directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stylezen?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development
```

**To get MongoDB connection:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Get connection string
5. Replace username:password with your credentials

#### 2.4 Verify Backend Setup

```bash
# Test MongoDB connection
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Step 3: Frontend Setup

#### 3.1 Open New Terminal Window

```bash
cd frontend
```

#### 3.2 Install Dependencies

```bash
npm install
```

This installs:
- react (UI library)
- react-router-dom (Routing)
- zustand (State management)
- axios (HTTP client)

#### 3.3 Configure Proxy (Optional)

Edit `package.json` in frontend:

```json
{
  "proxy": "http://localhost:5000",
  ...
}
```

This is already configured! Only change if using different backend port.

#### 3.4 Start Frontend Development Server

```bash
npm start
```

Expected output:
```
Compiled successfully!
You can now view stylezen-frontend in the browser.
```

## Configuration Details

### MongoDB Atlas Setup

1. **Create Account**
   - Visit mongodb.com/cloud/atlas
   - Sign up free

2. **Create Cluster**
   - Click "Create a Deployment"
   - Choose free tier
   - Wait for provisioning (5-10 minutes)

3. **Get Connection String**
   - Click "Connect" on cluster
   - Choose "Connect to your application"
   - Copy connection string
   - Replace `<username>` and `<password>`

4. **Add IP Whitelist**
   - Go to Network Access
   - Add Current IP Address (or 0.0.0.0/0 for development)
   - Click Confirm

5. **Create Database**
   - Go to Collections
   - Create Database: `stylezen`
   - Collections auto-created on first API call

### Environment Variables

#### Backend (.env)

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/stylezen?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-jwt-secret-key-min-32-chars-recommended

# Server
PORT=5000
NODE_ENV=development
```

#### Frontend (.env or .env.local)

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Verification Steps

### 1. Backend Verification

```bash
# Test API endpoint
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 2. Frontend Verification

- Browser opens automatically at `http://localhost:3000`
- Should see Stylezen homepage with hero section
- No console errors

### 3. Database Verification

In MongoDB Atlas:
- Go to Collections
- Should see `stylezen` database created
- Collections created on first API call

## Troubleshooting

### MongoDB Connection Error

**Problem:** `MongoServerError: connect ECONNREFUSED`

**Solutions:**
1. Verify internet connection
2. Check MongoDB connection string in `.env`
3. Whitelist your IP in MongoDB Atlas
4. Create database if not exists
5. Verify username/password are correct

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE :::5000`

**Solution (macOS/Linux):**
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

**Solution (Windows):**
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### Module Not Found

**Problem:** `Cannot find module 'express'`

**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error

**Problem:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Verify CORS is enabled in backend (server.js has `app.use(cors())`)
- Check proxy configuration in frontend package.json
- Verify API URL in frontend

### React Hot Reload Not Working

**Problem:** Changes not reflecting in browser

**Solution:**
```bash
# Clear React cache
rm -rf node_modules/.cache
npm start
```

## Performance Optimization

### Backend
```bash
# Enable compression
npm install compression

# Add to server.js
app.use(compression());
```

### Frontend
```bash
# Build optimized version
npm run build

# Check bundle size
npm install -g serve
serve -s build
```

## Security Configuration

### JWT Configuration

Update `JWT_SECRET` in `.env`:
```env
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### MongoDB Security

1. **Create Strong Password**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols

2. **Enable Network Access**
   - Whitelist specific IPs for production
   - Use VPN for sensitive operations

3. **Regular Backups**
   - Enable automatic backups
   - Test restore process

## Deployment Preparation

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create stylezen-api

# Set environment variables
heroku config:set MONGODB_URI="your-prod-mongodb-uri"
heroku config:set JWT_SECRET="your-prod-jwt-secret"

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## Common Customization

### Change Port Numbers

**Backend** (server.js):
```javascript
const PORT = process.env.PORT || 5001; // Change 5000 to 5001
```

**Frontend** (package.json):
```json
{
  "proxy": "http://localhost:5001"
}
```

### Change Database Name

```env
# In .env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/my-ecommerce?retryWrites=true
```

### Change Primary Color

Edit `frontend/src/styles/index.css`:
```css
:root {
  --primary-color: #your-color; /* Change from #ff5a1f */
}
```

## Next Steps

1. ✅ Complete installation
2. ✅ Verify all services running
3. 📝 Review API documentation
4. 🎨 Customize branding
5. 📦 Add sample products
6. 🚀 Deploy to production

---

**Need help? Check the README.md file for more information!**
