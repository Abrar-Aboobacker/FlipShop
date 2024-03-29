const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required:true
    
    },
    ordernum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    date: {
    
    },
    total: {
      type: Number,
    },
    payment: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        qty: {
          type: Number,
        },
        productPrice:{
          type:Number
        },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    status: {
      type: String,
      enum: ['Placed', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED', 'CANCELLED','Pending'],
      default: 'placed',
    },
    discountCoupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('order', orderSchema);