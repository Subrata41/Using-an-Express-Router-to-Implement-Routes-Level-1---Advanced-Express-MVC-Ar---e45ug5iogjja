const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productDataPath = path.join(__dirname, '../dev-data/product.json');

router.get('/api/v1/products', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productDataPath, 'utf-8'));
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

router.post('/api/v1/products', (req, res) => {
  try {
    const { title, price } = req.body;
    if (!title || !price) {
      return res.status(400).json({
        status: 'error',
        message: 'Product name and price are required'
      });
    }
    const products = JSON.parse(fs.readFileSync(productDataPath, 'utf-8'));
    const newProduct = {
      id: products.length + 1,
      title,
      price
    };
    products.push(newProduct);
    fs.writeFileSync(productDataPath, JSON.stringify(products));
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;
