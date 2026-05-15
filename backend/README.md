# Stylezen Backend

Stylezen E-commerce Platform Backend API built with Express.js and MongoDB.

## Features

- ✅ User authentication & authorization
- ✅ Product management
- ✅ Shopping cart operations
- ✅ Order management
- ✅ Category management
- ✅ JWT-based security
- ✅ Role-based access control

## Tech Stack

- **Framework**: Express.js 4.18+
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **Security**: Bcryptjs

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/featured/all` - Get featured products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id` - Update order (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:productId` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear/all` - Clear entire cart

### Users
- `GET /api/users/profile/me` - Get current user profile
- `PUT /api/users/profile/update` - Update user profile
- `POST /api/users/address/add` - Add address
- `PUT /api/users/address/update/:addressIndex` - Update address
- `DELETE /api/users/address/delete/:addressIndex` - Delete address
- `POST /api/users/password/change` - Change password
- `GET /api/users` - Get all users (Admin)

## Database Models

### User
```javascript
{
  firstName, lastName, email, password,
  phoneNumber, profilePicture, role,
  addresses, loyaltyPoints, isActive
}
```

### Product
```javascript
{
  name, description, price, originalPrice, discount,
  category, images, stock, sku, rating,
  reviews, isFeatured, isActive, colors, sizes
}
```

### Order
```javascript
{
  orderNumber, userId, items, shippingAddress,
  subtotal, shippingCost, tax, total,
  paymentMethod, paymentStatus, orderStatus,
  trackingNumber, trackingHistory
}
```

### Category
```javascript
{
  name, slug, description, image,
  parentCategory, subCategories, productCount
}
```

### Cart
```javascript
{
  userId, items, subtotal, totalItems
}
```

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Error Handling

All endpoints return JSON responses with a consistent format:

```json
{
  "success": true/false,
  "message": "Description",
  "data": {}
}
```

## License

MIT
