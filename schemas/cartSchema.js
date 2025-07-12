import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  totalItemPrice: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product : [cartItemSchema],
  totalCartPrice: {
    type: Number,
    required: true,
  }
}, { timestamp: true })

const Cart = mongoose.model("cart", cartSchema)

export default Cart