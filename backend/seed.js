require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const catalog = [
    { name: 'Classic Tee', price: 19.99, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Denim Jacket', price: 59.99, image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Running Shoes', price: 89.5, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Baseball Cap', price: 12.0, image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Sunglasses', price: 29.99, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Leather Wallet', price: 39.0, image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=80' }
  ];

  for (const item of catalog) {
    await Product.updateOne(
      { name: item.name },
      { $set: { price: item.price, image: item.image } },
      { upsert: true }
    );
  }

  const total = await Product.countDocuments();
  console.log(`Seed complete. Products in catalog: ${total}`);
  process.exit(0);
}
seed();
