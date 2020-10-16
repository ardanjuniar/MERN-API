const express = require('express');

const app = express();
const router = express.Router();

router.use('/products', (req, res, next) => {
  res.json({ name: "Ardan Juniar", email: "ardanjuniar@gmail.com" });
  next();
})

router.use('/price', (req, res, next) => {
  res.json({ name: "Sweeter", price: 100000 });
  next();
})

router.get('/customers', (req, res, next) => {
  res.json({ name: "Muhammad Tachril", email: "muhammadtachril@gmail.com" });
  next();
})

app.use('/', router);

app.listen(4000);