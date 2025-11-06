const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// POST /api/checkout { cartItems: [{id}], name, email, userId? }
router.post('/', async (req, res) => {
  try {
    const { cartItems, name, email, userId = 'guest' } = req.body;
    if (!Array.isArray(cartItems) || cartItems.length === 0) return res.status(400).json({ error: 'cartItems array required' });

    const ids = cartItems.map(ci => ci.id);
    const items = await CartItem.find({ _id: { $in: ids }, userId }).populate('productId');
    const lineItems = items.map(i => ({
      id: i._id.toString(),
      name: i.productId.name,
      qty: i.qty,
      unitPrice: i.productId.price,
      lineTotal: +(i.qty * i.productId.price).toFixed(2)
    }));
    const subtotal = lineItems.reduce((s, li) => s + li.lineTotal, 0);
    const tax = +(subtotal * 0.1).toFixed(2); // 10% mock tax
    const total = +(subtotal + tax).toFixed(2);

    // mock receipt
    const receipt = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name || null,
      email: email || null,
      items: lineItems,
      subtotal,
      tax,
      total
    };

    // remove purchased
    await CartItem.deleteMany({ _id: { $in: ids }, userId });

    res.json({ receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

module.exports = router;
