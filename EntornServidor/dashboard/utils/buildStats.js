function buildStats(users, products) {
  const stats = {
    users: users.length,
    products: products.length,
    avgPrice: 0,
    categories: [],
    topProducts: []
  };

  let totalPrice = 0;
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    const price = product.price || 0;
    totalPrice += price;
  }

  if (products.length > 0) {
    stats.avgPrice = totalPrice / products.length;
  }

  const categoryCounter = {};
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    let category = product.category;
    if (!category) {
      category = 'Sin categoria';
    }

    if (!categoryCounter[category]) {
      categoryCounter[category] = 0;
    }
    categoryCounter[category] += 1;
  }

  const categoryNames = Object.keys(categoryCounter);
  for (let i = 0; i < categoryNames.length; i += 1) {
    const name = categoryNames[i];
    stats.categories.push({
      name,
      count: categoryCounter[name]
    });
  }

  const orderedProducts = [];
  for (let i = 0; i < products.length; i += 1) {
    orderedProducts.push(products[i]);
  }

  for (let i = 0; i < orderedProducts.length - 1; i += 1) {
    for (let j = 0; j < orderedProducts.length - i - 1; j += 1) {
      const currentPrice = orderedProducts[j].price || 0;
      const nextPrice = orderedProducts[j + 1].price || 0;

      if (currentPrice < nextPrice) {
        const temp = orderedProducts[j];
        orderedProducts[j] = orderedProducts[j + 1];
        orderedProducts[j + 1] = temp;
      }
    }
  }

  const topLimit = orderedProducts.length < 5 ? orderedProducts.length : 5;
  for (let i = 0; i < topLimit; i += 1) {
    stats.topProducts.push({
      name: orderedProducts[i].name,
      price: orderedProducts[i].price || 0
    });
  }

  return stats;
}

module.exports = buildStats;
