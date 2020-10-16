const express = require('express');

const app = express();

app.use(() => {
  console.log('Server dijalankan');
})

app.listen(4000);