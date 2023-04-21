const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();

// Including product.json file
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Define middleware
router.use(express.json());

// Get all the products
router.get('/api/v1/product', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      results: product.length,
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Error getting products' });
  }
});

// Create a new Product
router.post('/api/v1/product', (req, res) => {
  try {
    const newProduct = {
      id: product.length + 1,
      title: req.body.title,
      price: req.body.price,
    };
    product.push(newProduct);
    fs.writeFile(`${__dirname}/../dev-data/product.json`, JSON.stringify(product), () => {});
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Error creating product' });
  }
});

// Registering our Router
app.use('/', router);

module.exports = app;
