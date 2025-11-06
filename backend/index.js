require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const checkoutRoute = require('./routes/checkout');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.use('/api/checkout', checkoutRoute);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
