# Stylezen - Complete API Documentation

Comprehensive reference for all Stylezen API endpoints with examples, request/response formats, and authentication details.

## API Overview

**Base URL:** `http://localhost:5000/api`

**Authentication:** JWT Bearer Token (7-day expiry)

**Response Format:** JSON

**Status Codes:** 
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### Login User
**POST** `/auth/login`

Authenticates user and returns JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

## Product Endpoints

### Get All Products
**GET** `/products`

Retrieves paginated product list with optional filters.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Category ID filter
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `search`: Search query
- `featured`: Show featured only (true/false)

**Request:**
```
GET /products?page=1&limit=12&category=507f1f77bcf86cd799439011&minPrice=50&maxPrice=500
```

**Response (200):**
```json
{
  "success": true,
  "count": 12,
  "total": 125,
  "page": 1,
  "pages": 11,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Classic Bifold Wallet",
      "description": "Premium leather wallet...",
      "price": 85,
      "originalPrice": 120,
      "discount": 29,
      "category": {
        "_id": "507f1f77bcf86cd799439001",
        "name": "Wallets"
      },
      "images": [
        {
          "url": "https://example.com/wallet.jpg",
          "altText": "Classic Bifold Wallet"
        }
      ],
      "stock": 45,
      "sku": "CBW-001",
      "rating": 4.5,
      "totalReviews": 12,
      "isFeatured": true,
      "colors": ["Brown", "Black", "Tan"],
      "sizes": ["Standard"],
      "material": "Premium Italian Leather"
    }
  ]
}
```

### Get Featured Products
**GET** `/products/featured/all`

Gets featured products (max 8).

**Request:**
```
GET /products/featured/all
```

**Response (200):**
```json
{
  "success": true,
  "count": 8,
  "data": [...]
}
```

### Get Single Product
**GET** `/products/:id`

Gets detailed information for specific product.

**Request:**
```
GET /products/507f1f77bcf86cd799439012
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Classic Bifold Wallet",
    "description": "Premium leather wallet...",
    "price": 85,
    "stock": 45,
    "reviews": [
      {
        "_id": "507f1f77bcf86cd799439099",
        "userId": {
          "_id": "507f1f77bcf86cd799439011",
          "firstName": "John"
        },
        "rating": 5,
        "comment": "Excellent quality!",
        "createdAt": "2024-01-10T08:30:00Z"
      }
    ]
  }
}
```

### Create Product (Admin)
**POST** `/products`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "name": "New Leather Bag",
  "description": "Premium handcrafted leather bag...",
  "price": 250,
  "originalPrice": 350,
  "discount": 28,
  "category": "507f1f77bcf86cd799439001",
  "images": [
    {
      "url": "https://example.com/bag.jpg",
      "altText": "Leather Bag"
    }
  ],
  "stock": 20,
  "sku": "LB-001",
  "colors": ["Brown", "Black"],
  "sizes": ["Medium", "Large"],
  "material": "Full Grain Leather"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {...}
}
```

### Update Product (Admin)
**PUT** `/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "price": 240,
  "stock": 15
}
```

### Delete Product (Admin)
**DELETE** `/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

## Category Endpoints

### Get All Categories
**GET** `/categories`

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439001",
      "name": "Wallets",
      "slug": "wallets",
      "description": "Premium leather wallets...",
      "image": "https://example.com/wallets.jpg",
      "productCount": 25,
      "isActive": true
    }
  ]
}
```

### Get Single Category
**GET** `/categories/:id`

### Create Category (Admin)
**POST** `/categories`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "name": "Bags",
  "description": "Premium leather bags...",
  "image": "https://example.com/bags.jpg",
  "displayOrder": 2
}
```

### Update Category (Admin)
**PUT** `/categories/:id`

### Delete Category (Admin)
**DELETE** `/categories/:id`

## Order Endpoints

### Create Order
**POST** `/orders`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phoneNumber": "+1 (555) 000-0192",
    "streetAddress": "123 Main Street",
    "city": "Portland",
    "state": "OR",
    "zipCode": "97201",
    "country": "United States"
  },
  "paymentMethod": "credit_card",
  "shippingCost": 15,
  "tax": 12.50
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439050",
    "orderNumber": "ORD-20240115001",
    "userId": "507f1f77bcf86cd799439011",
    "items": [...],
    "subtotal": 170,
    "shippingCost": 15,
    "tax": 12.50,
    "total": 197.50,
    "orderStatus": "pending",
    "paymentStatus": "pending",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### Get User's Orders
**GET** `/orders/user/my-orders`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

### Get Single Order
**GET** `/orders/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

### Get All Orders (Admin)
**GET** `/orders`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN (Admin only)
```

**Query Parameters:**
- `status`: Filter by order status
- `page`: Page number
- `limit`: Items per page

### Update Order (Admin)
**PUT** `/orders/:id`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN (Admin only)
```

**Request:**
```json
{
  "orderStatus": "shipped",
  "paymentStatus": "completed",
  "trackingNumber": "1Z999AA10123456784",
  "trackingHistory": [
    {
      "status": "processing",
      "location": "Los Angeles, CA",
      "description": "Package received by carrier"
    }
  ]
}
```

## Cart Endpoints

### Get User's Cart
**GET** `/cart`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439060",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439012",
        "productName": "Classic Bifold Wallet",
        "price": 85,
        "quantity": 1,
        "color": "Brown",
        "size": "Standard",
        "image": "https://example.com/wallet.jpg"
      }
    ],
    "subtotal": 85,
    "totalItems": 1
  }
}
```

### Add Item to Cart
**POST** `/cart/add`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 2,
  "color": "Brown",
  "size": "Standard"
}
```

### Update Cart Item
**PUT** `/cart/update/:productId`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "quantity": 3
}
```

### Remove from Cart
**DELETE** `/cart/remove/:productId`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

### Clear Cart
**DELETE** `/cart/clear/all`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

## User Endpoints

### Get Current Profile
**GET** `/users/profile/me`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "+1 (555) 000-0192",
    "role": "user",
    "addresses": [
      {
        "addressType": "home",
        "streetAddress": "123 Main St",
        "city": "Portland",
        "state": "OR",
        "zipCode": "97201",
        "country": "United States",
        "isDefault": true
      }
    ],
    "loyaltyPoints": 150
  }
}
```

### Update Profile
**PUT** `/users/profile/update`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+1 (555) 111-0192",
  "profilePicture": "https://example.com/avatar.jpg"
}
```

### Add Address
**POST** `/users/address/add`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "addressType": "office",
  "streetAddress": "456 Work Ave",
  "city": "Portland",
  "state": "OR",
  "zipCode": "97205",
  "country": "United States",
  "isDefault": false
}
```

### Update Address
**PUT** `/users/address/update/:addressIndex`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

### Delete Address
**DELETE** `/users/address/delete/:addressIndex`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

### Change Password
**POST** `/users/password/change`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
```

**Request:**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
```

### Get All Users (Admin)
**GET** `/users`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN (Admin only)
```

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized as admin"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

## Using with Postman

1. **Import Collection**
   - Download Postman
   - Import provided collection file
   - All endpoints pre-configured

2. **Set Authorization**
   - Go to collection
   - Click "Auth" tab
   - Select "Bearer Token"
   - Enter token from login response

3. **Test Endpoints**
   - Click endpoint
   - Set request body/params
   - Click Send
   - View response

## Rate Limits

Currently no rate limiting implemented. For production:
- Implement rate limiting per IP
- 100 requests per minute recommended
- 1000 requests per hour recommended

## Best Practices

1. **Always Include Auth Token**
   - Use Bearer token for protected routes
   - Token expires in 7 days

2. **Handle Errors Gracefully**
   - Check response.success field
   - Log error messages
   - Show user-friendly messages

3. **Pagination**
   - Use page and limit parameters
   - Check total count in response
   - Don't request excessive pages

4. **Validation**
   - Validate input on client side
   - Handle server validation errors
   - Show appropriate messages

---

**For more help, check README.md or contact support!**
