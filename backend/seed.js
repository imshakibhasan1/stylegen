const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://usershakib302:MWm2pZA3LYUwBqs5@cluster.mongodb.net/stylezen?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('✅ Cleared existing products and categories');

    // Create categories
    const categories = await Category.create([
      {
        name: 'Casual Wear',
        description: 'Comfortable and stylish casual clothing',
        image: 'https://via.placeholder.com/400x300?text=Casual+Wear',
        isActive: true,
        displayOrder: 1,
      },
      {
        name: 'Formal Wear',
        description: 'Elegant formal attire for special occasions',
        image: 'https://via.placeholder.com/400x300?text=Formal+Wear',
        isActive: true,
        displayOrder: 2,
      },
      {
        name: 'Sports Wear',
        description: 'Performance and style for athletes',
        image: 'https://via.placeholder.com/400x300?text=Sports+Wear',
        isActive: true,
        displayOrder: 3,
      },
      {
        name: 'Accessories',
        description: 'Complete your look with our accessories',
        image: 'https://via.placeholder.com/400x300?text=Accessories',
        isActive: true,
        displayOrder: 4,
      },
    ]);

    console.log('✅ Created 4 categories');

    // Create 20 dummy products
    const products = [
      {
        name: 'Classic White T-Shirt',
        description: 'A timeless white t-shirt made from premium cotton. Perfect for everyday wear and versatile styling.',
        price: 29.99,
        originalPrice: 49.99,
        discount: 40,
        category: categories[0]._id,
        stock: 150,
        sku: 'TSH-001-WHT',
        rating: 4.5,
        isFeatured: true,
        isActive: true,
        colors: ['white', 'black', 'gray'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        material: '100% Cotton',
        craftingProcess: 'Eco-friendly dyeing process',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=White+TShirt', altText: 'White T-Shirt' }
        ],
      },
      {
        name: 'Blue Denim Jeans',
        description: 'Classic blue denim jeans with a comfortable fit. Durable and versatile for any occasion.',
        price: 59.99,
        originalPrice: 89.99,
        discount: 33,
        category: categories[0]._id,
        stock: 120,
        sku: 'JNS-002-BLU',
        rating: 4.7,
        isFeatured: true,
        isActive: true,
        colors: ['blue', 'black', 'gray'],
        sizes: ['28', '30', '32', '34', '36', '38'],
        material: '98% Cotton, 2% Elastane',
        craftingProcess: 'Stone washed',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Blue+Jeans', altText: 'Blue Denim Jeans' }
        ],
      },
      {
        name: 'Summer Striped Polo',
        description: 'Breathable striped polo shirt perfect for summer. Moisture-wicking fabric keeps you cool.',
        price: 39.99,
        originalPrice: 59.99,
        discount: 33,
        category: categories[0]._id,
        stock: 100,
        sku: 'PLO-003-STR',
        rating: 4.3,
        isFeatured: false,
        isActive: true,
        colors: ['blue', 'red', 'white'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Cotton blend with polyester',
        craftingProcess: 'Moisture-wicking technology',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Striped+Polo', altText: 'Summer Striped Polo' }
        ],
      },
      {
        name: 'Black Business Suit',
        description: 'Professional black suit for business and formal events. Premium tailoring and fit.',
        price: 199.99,
        originalPrice: 299.99,
        discount: 33,
        category: categories[1]._id,
        stock: 50,
        sku: 'SUT-004-BLK',
        rating: 4.8,
        isFeatured: true,
        isActive: true,
        colors: ['black', 'navy', 'gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Virgin wool',
        craftingProcess: 'Hand-tailored',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Business+Suit', altText: 'Black Business Suit' }
        ],
      },
      {
        name: 'Formal White Dress Shirt',
        description: 'Elegant white dress shirt for formal occasions. Crisp finish and comfortable fit.',
        price: 79.99,
        originalPrice: 119.99,
        discount: 33,
        category: categories[1]._id,
        stock: 80,
        sku: 'SHT-005-WHT',
        rating: 4.6,
        isFeatured: false,
        isActive: true,
        colors: ['white', 'light blue', 'cream'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        material: '100% Cotton',
        craftingProcess: 'Pressed and finished',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Dress+Shirt', altText: 'Formal Dress Shirt' }
        ],
      },
      {
        name: 'Professional Gray Blazer',
        description: 'Modern gray blazer perfect for the office or business casual events.',
        price: 129.99,
        originalPrice: 189.99,
        discount: 32,
        category: categories[1]._id,
        stock: 60,
        sku: 'BLZ-006-GRY',
        rating: 4.4,
        isFeatured: false,
        isActive: true,
        colors: ['gray', 'navy', 'black'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Wool blend',
        craftingProcess: 'Professional tailoring',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Gray+Blazer', altText: 'Professional Blazer' }
        ],
      },
      {
        name: 'Performance Running Shoes',
        description: 'Lightweight running shoes with advanced cushioning technology for comfort and speed.',
        price: 109.99,
        originalPrice: 159.99,
        discount: 31,
        category: categories[2]._id,
        stock: 140,
        sku: 'SHO-007-BLK',
        rating: 4.7,
        isFeatured: true,
        isActive: true,
        colors: ['black', 'white', 'red', 'blue'],
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        material: 'Mesh and synthetic upper',
        craftingProcess: 'Precision engineered',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Running+Shoes', altText: 'Performance Shoes' }
        ],
      },
      {
        name: 'Athletic Training Tank Top',
        description: 'Sleeveless tank top designed for intense workouts. Breathable and supportive.',
        price: 34.99,
        originalPrice: 54.99,
        discount: 36,
        category: categories[2]._id,
        stock: 180,
        sku: 'TNK-008-BLK',
        rating: 4.5,
        isFeatured: false,
        isActive: true,
        colors: ['black', 'white', 'gray', 'navy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        material: 'Polyester moisture-wicking fabric',
        craftingProcess: 'Seamless construction',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Tank+Top', altText: 'Athletic Tank Top' }
        ],
      },
      {
        name: 'Yoga Leggings',
        description: 'High-waisted yoga leggings with pocket design. Perfect for yoga and everyday wear.',
        price: 69.99,
        originalPrice: 99.99,
        discount: 30,
        category: categories[2]._id,
        stock: 110,
        sku: 'LEG-009-BLK',
        rating: 4.8,
        isFeatured: true,
        isActive: true,
        colors: ['black', 'gray', 'purple', 'navy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        material: 'Nylon and spandex blend',
        craftingProcess: 'Four-way stretch',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Yoga+Leggings', altText: 'Yoga Leggings' }
        ],
      },
      {
        name: 'Sports Shorts',
        description: 'Lightweight sports shorts with built-in compression. Ideal for all activities.',
        price: 44.99,
        originalPrice: 69.99,
        discount: 36,
        category: categories[2]._id,
        stock: 130,
        sku: 'SHT-010-BLK',
        rating: 4.4,
        isFeatured: false,
        isActive: true,
        colors: ['black', 'blue', 'red'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Polyester blend',
        craftingProcess: 'Compression technology',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Sports+Shorts', altText: 'Sports Shorts' }
        ],
      },
      {
        name: 'Stainless Steel Watch',
        description: 'Elegant stainless steel watch with water resistance. A timeless accessory.',
        price: 149.99,
        originalPrice: 249.99,
        discount: 40,
        category: categories[3]._id,
        stock: 70,
        sku: 'WCH-011-SLV',
        rating: 4.6,
        isFeatured: true,
        isActive: true,
        colors: ['silver', 'gold', 'rose gold'],
        sizes: ['One Size'],
        material: 'Stainless steel',
        craftingProcess: 'Swiss movement',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Stainless+Watch', altText: 'Steel Watch' }
        ],
      },
      {
        name: 'Leather Crossbody Bag',
        description: 'Premium leather crossbody bag. Stylish and functional for everyday use.',
        price: 99.99,
        originalPrice: 159.99,
        discount: 37,
        category: categories[3]._id,
        stock: 90,
        sku: 'BAG-012-BRN',
        rating: 4.7,
        isFeatured: true,
        isActive: true,
        colors: ['brown', 'black', 'tan'],
        sizes: ['One Size'],
        material: 'Genuine leather',
        craftingProcess: 'Hand-crafted',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Leather+Bag', altText: 'Crossbody Bag' }
        ],
      },
      {
        name: 'Casual Canvas Backpack',
        description: 'Durable canvas backpack perfect for travel and daily use. Multiple compartments.',
        price: 59.99,
        originalPrice: 89.99,
        discount: 33,
        category: categories[3]._id,
        stock: 120,
        sku: 'BAK-013-KHK',
        rating: 4.5,
        isFeatured: false,
        isActive: true,
        colors: ['khaki', 'navy', 'black'],
        sizes: ['One Size'],
        material: 'Canvas with leather accents',
        craftingProcess: 'Stitched and reinforced',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Canvas+Backpack', altText: 'Canvas Backpack' }
        ],
      },
      {
        name: 'Wool Knit Beanie',
        description: 'Warm and cozy wool beanie. Perfect for cold weather and casual outfits.',
        price: 24.99,
        originalPrice: 39.99,
        discount: 37,
        category: categories[3]._id,
        stock: 200,
        sku: 'BEN-014-BLK',
        rating: 4.4,
        isFeatured: false,
        isActive: true,
        colors: ['black', 'gray', 'navy', 'red'],
        sizes: ['One Size'],
        material: '100% Acrylic',
        craftingProcess: 'Hand-knitted',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Wool+Beanie', altText: 'Wool Beanie' }
        ],
      },
      {
        name: 'Silk Scarf',
        description: 'Elegant silk scarf with vibrant patterns. Adds sophistication to any outfit.',
        price: 44.99,
        originalPrice: 74.99,
        discount: 40,
        category: categories[3]._id,
        stock: 110,
        sku: 'SCF-015-MUL',
        rating: 4.6,
        isFeatured: true,
        isActive: true,
        colors: ['multicolor', 'blue', 'red', 'gold'],
        sizes: ['One Size'],
        material: '100% Silk',
        craftingProcess: 'Hand-printed',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Silk+Scarf', altText: 'Silk Scarf' }
        ],
      },
      {
        name: 'Comfortable Loafers',
        description: 'Classic leather loafers for both casual and formal occasions. Supremely comfortable.',
        price: 89.99,
        originalPrice: 139.99,
        discount: 36,
        category: categories[0]._id,
        stock: 85,
        sku: 'LOF-016-BRN',
        rating: 4.5,
        isFeatured: false,
        isActive: true,
        colors: ['brown', 'black', 'tan'],
        sizes: ['6', '7', '8', '9', '10', '11', '12', '13'],
        material: 'Genuine leather',
        craftingProcess: 'Hand-stitched',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Loafers', altText: 'Leather Loafers' }
        ],
      },
      {
        name: 'Linen Summer Shorts',
        description: 'Light and breathable linen shorts for summer. Perfect for beach and casual wear.',
        price: 49.99,
        originalPrice: 79.99,
        discount: 37,
        category: categories[0]._id,
        stock: 95,
        sku: 'SHT-017-KHK',
        rating: 4.3,
        isFeatured: false,
        isActive: true,
        colors: ['khaki', 'white', 'light blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        material: '100% Linen',
        craftingProcess: 'Pre-shrunk',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Linen+Shorts', altText: 'Linen Shorts' }
        ],
      },
      {
        name: 'Vintage Denim Jacket',
        description: 'Classic denim jacket with a vintage look. Versatile layering piece for any outfit.',
        price: 79.99,
        originalPrice: 119.99,
        discount: 33,
        category: categories[0]._id,
        stock: 75,
        sku: 'JKT-018-BLU',
        rating: 4.7,
        isFeatured: true,
        isActive: true,
        colors: ['blue', 'black', 'light blue'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        material: '100% Cotton denim',
        craftingProcess: 'Vintage washed',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Denim+Jacket', altText: 'Denim Jacket' }
        ],
      },
      {
        name: 'Henley Long Sleeve',
        description: 'Comfortable long sleeve henley shirt. Great for layering or standalone wear.',
        price: 34.99,
        originalPrice: 54.99,
        discount: 36,
        category: categories[0]._id,
        stock: 160,
        sku: 'HNL-019-GRY',
        rating: 4.4,
        isFeatured: false,
        isActive: true,
        colors: ['gray', 'black', 'navy', 'maroon'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        material: '100% Cotton',
        craftingProcess: 'Pre-shrunk',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Henley+Shirt', altText: 'Henley Shirt' }
        ],
      },
      {
        name: 'Chino Trousers',
        description: 'Classic chino trousers for business casual. Versatile and comfortable.',
        price: 69.99,
        originalPrice: 109.99,
        discount: 36,
        category: categories[1]._id,
        stock: 100,
        sku: 'CHN-020-KHK',
        rating: 4.5,
        isFeatured: false,
        isActive: true,
        colors: ['khaki', 'navy', 'black', 'gray'],
        sizes: ['28', '30', '32', '34', '36', '38'],
        material: '98% Cotton, 2% Elastane',
        craftingProcess: 'Pressed and finished',
        images: [
          { url: 'https://via.placeholder.com/500x500?text=Chino+Trousers', altText: 'Chino Trousers' }
        ],
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} dummy products`);

    // Create or update admin user
    const adminEmail = 'admin@stylegen.com';
    const adminPassword = 'Admin@123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminUser = await User.findOneAndUpdate(
      { email: adminEmail },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        phoneNumber: '+1234567890',
        profilePicture: 'https://via.placeholder.com/400x400?text=Admin+User',
      },
      { upsert: true, new: true }
    );

    console.log('✅ Admin user created/updated');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Role: ${adminUser.role}`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

connectDB().then(seedDatabase);
