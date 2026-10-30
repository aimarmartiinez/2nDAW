const express = require('express');
const users = require('../models/User');
const products = require('../models/Product');
const buildStats = require('../utils/buildStats');

const router = express.Router();

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/stats', (req, res) => {
  res.json(buildStats(users, products));
});

module.exports = router;
