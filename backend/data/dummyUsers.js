// Dummy users for fallback when MongoDB is unavailable
const dummyUsers = [
  {
    _id: 'user-001',
    firstName: 'Raj',
    lastName: 'Kumar',
    email: 'admin@stylegen.com',
    password: 'admin123', // In production, this would be hashed
    role: 'admin',
    profilePicture: 'https://via.placeholder.com/400x400?text=Admin',
    phoneNumber: '+91-9876543210',
    addresses: [
      {
        _id: 'addr-001',
        addressType: 'office',
        streetAddress: '123 StyleGen Plaza',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
      },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    _id: 'user-002',
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'user@stylegen.com',
    password: 'user123', // In production, this would be hashed
    role: 'user',
    profilePicture: 'https://via.placeholder.com/400x400?text=User',
    phoneNumber: '+91-9876543211',
    addresses: [
      {
        _id: 'addr-002',
        addressType: 'home',
        streetAddress: '456 Fashion Street',
        city: 'Delhi',
        state: 'Delhi',
        postalCode: '110001',
        country: 'India',
      },
    ],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    _id: 'user-003',
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit@stylegen.com',
    password: 'password123',
    role: 'user',
    profilePicture: 'https://via.placeholder.com/400x400?text=Amit',
    phoneNumber: '+91-9876543212',
    addresses: [
      {
        _id: 'addr-003',
        addressType: 'home',
        streetAddress: '789 Artisan Lane',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560001',
        country: 'India',
      },
    ],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
];

const dummyOrders = [
  {
    _id: 'order-001',
    userId: 'user-002',
    orderNumber: 'ORD-001001',
    items: [
      {
        productId: 'prod-001',
        productName: 'Classic White T-Shirt',
        quantity: 2,
        price: 1299,
        total: 2598,
      },
    ],
    total: 2598,
    orderStatus: 'delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: '456 Fashion Street, Delhi',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-05'),
  },
  {
    _id: 'order-002',
    userId: 'user-002',
    orderNumber: 'ORD-001002',
    items: [
      {
        productId: 'prod-003',
        productName: 'Professional Blazer',
        quantity: 1,
        price: 4999,
        total: 4999,
      },
    ],
    total: 4999,
    orderStatus: 'processing',
    paymentMethod: 'Debit Card',
    shippingAddress: '456 Fashion Street, Delhi',
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-05-10'),
  },
  {
    _id: 'order-003',
    userId: 'user-002',
    orderNumber: 'ORD-001003',
    items: [
      {
        productId: 'prod-005',
        productName: 'Leather Belt Classic',
        quantity: 1,
        price: 2499,
        total: 2499,
      },
    ],
    total: 2499,
    orderStatus: 'pending',
    paymentMethod: 'UPI',
    shippingAddress: '456 Fashion Street, Delhi',
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-05-15'),
  },
];

const dummyAdminStats = {
  totalOrders: 150,
  totalRevenue: 750000,
  activeCustomers: 45,
  lowStockProducts: 3,
};

module.exports = { dummyUsers, dummyOrders, dummyAdminStats };
