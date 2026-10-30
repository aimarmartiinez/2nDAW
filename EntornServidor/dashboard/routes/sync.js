const express = require('express');
const axios = require('axios');
const users = require('../models/User');
const products = require('../models/Product');

const router = express.Router();

router.get('/sync', async (req, res) => {
  try {
    const [productsResponse, usersResponse] = await Promise.all([
      axios.get('https://fakestoreapi.com/products'),
      axios.get('https://fakestoreapi.com/users')
    ]);

    const syncedProducts = productsResponse.data.map((p) => ({
      id: p.id,
      name: p.title,
      price: p.price,
      category: p.category
    }));

    const syncedUsers = usersResponse.data.map((u) => ({
      id: u.id,
      name: `${u.name.firstname} ${u.name.lastname}`,
      email: u.email
    }));

    products.splice(0, products.length, ...syncedProducts);
    users.splice(0, users.length, ...syncedUsers);

    res.json({
      message: 'Sincronizacion completada',
      products: products.length,
      users: users.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al sincronizar datos',
      error: error.message
    });
  }
});

module.exports = router;
