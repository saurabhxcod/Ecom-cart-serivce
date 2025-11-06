const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /api/products (admin helper for testing)
router.post('/', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const p = await Product.create({ name, price, image });
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid product data' });
  }
});

module.exports = router;
