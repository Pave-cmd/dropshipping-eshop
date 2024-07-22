const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const apiKey = 'e150a6da120d086b6d2a0ada30a66174';
const password = '7e278015ba129b041d80a2f7fc21be73';
const shopName = 'quickstart-d75ea2c0.myshopify.com'; // Změňte na svou Shopify doménu

const url = `https://${shopName}/admin/api/2023-01/products.json`;

app.get('/products', async (req, res) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(apiKey + ':' + password).toString('base64')
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
