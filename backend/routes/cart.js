const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    // Optionally support userId via query ?userId=abc
    const userId = req.query.userId || 'guest';
    const items = await CartItem.find({ userId }).populate('productId');
    const formatted = items.map(i => ({ id: i._id, productId: i.productId._id, name: i.productId.name, price: i.productId.price, qty: i.qty }));
    const total = formatted.reduce((s, it) => s + it.price * it.qty, 0);
    res.json({ items: formatted, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart { productId, qty, userId? }
router.post('/', async (req, res) => {
  try {
    const { productId, qty = 1, userId = 'guest' } = req.body;
    if (!productId || qty <= 0) return res.status(400).json({ error: 'productId and qty>0 required' });

    const prod = await Product.findById(productId);
    if (!prod) return res.status(404).json({ error: 'Product not found' });

    const existing = await CartItem.findOne({ productId, userId });
    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.json({ id: existing._id, productId: existing.productId, qty: existing.qty, name: prod.name, price: prod.price });
    }

    const ci = await CartItem.create({ productId, qty, userId });
    res.status(201).json({ id: ci._id, productId: ci.productId, qty: ci.qty, name: prod.name, price: prod.price });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// PATCH /api/cart/:id { qty }
router.patch('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    if (!qty || qty <= 0) return res.status(400).json({ error: 'qty>0 required' });
    const item = await CartItem.findById(req.params.id).populate('productId');
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    item.qty = qty;
    await item.save();
    res.json({ id: item._id, productId: item.productId._id, qty: item.qty, name: item.productId.name, price: item.productId.price });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update qty' });
  }
});

module.exports = router;
