const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(express.json());
app.use(express.static(PUBLIC_DIR));
app.use(morgan('dev'));

app.get('/api/search', (req, res) => {
  const { term } = req.query;
  axios.get('https://api.magicthegathering.io/v1/cards', { params: { name: term } })
    .then((results) => {
      res.send(results.data.cards);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost: ${PORT}`);
});
