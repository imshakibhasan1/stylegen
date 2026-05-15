const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: String,
        image: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        color: String,
        size: String,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    subtotal: {
      type: Number,
      default: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate subtotal and total items
cartSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  this.totalItems = this.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};

module.exports = mongoose.model('Cart', cartSchema);
