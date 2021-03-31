/* eslint-disable no-param-reassign */
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
  axios.get(`https://api.scryfall.com/cards/search?q=${term}`)
    .then((results) => {
      res.send(results.data.data);
    })
    .catch((err) => {
      console.log(err.response.statusText);
      res.send(err.response.statusText);
    });
});

app.get('/api/scroll', (req, res) => {
  const { page, query } = req.query;
  axios.get(`https://api.scryfall.com/cards/search?page=${page}&q=${query}`)
    .then((results) => {
      res.send(results.data.data);
    })
    .catch((err) => console.log(err));
});

app.get('/api/filter', (req, res) => {
  let query = 'q=';
  const { colors } = req.query;
  const { legalities } = req.query;
  const { name } = req.query;
  const { text } = req.query;
  const { rarity } = req.query;
  const { type } = req.query;
  const { cmc } = req.query;
  const { power } = req.query;
  const { toughness } = req.query;
  if (name.length > 0) {
    if (query.length === 2) {
      query += `${name}`;
    } else {
      query += `+${name}`;
    }
  }
  if (colors.length > 0) {
    if (query.length === 2) {
      query += `c:${colors}`;
    } else {
      query += `+c:${colors}`;
    }
  }
  if (cmc.length > 1) {
    if (query.length === 2) {
      const tempCMC = cmc.trim();
      query += `cmc:${tempCMC}`;
    } else {
      const tempCMC = cmc.trim();
      query += `+cmc:${tempCMC}`;
    }
  }
  if (text.length > 0) {
    if (query.length === 2) {
      query += `o:${text}`;
    } else {
      query += `+o:${text}`;
    }
  }
  if (power.length > 1) {
    if (query.length === 2) {
      const tempPower = power.trim();
      query += `pow<${tempPower}`;
    } else {
      const tempPower = power.trim();
      query += `+pow<${tempPower}`;
    }
  }
  if (toughness.length > 1) {
    if (query.length === 2) {
      const tempToughness = toughness.trim();
      query += `tou:${tempToughness}`;
    } else {
      const tempToughness = toughness.trim();
      query += `+tou:${tempToughness}`;
    }
  }
  if (type) {
    if (query.length === 2) {
      for (let i = 0; i < type.length; i += 1) {
        if (i === 0) {
          query += `t:${type[i]}`;
        } else {
          query += `+t:${type[i]}`;
        }
      }
    } else {
      for (let i = 0; i < type.length; i += 1) {
        query += `+t:${type[i]}`;
      }
    }
  }
  if (legalities) {
    if (query.length === 2) {
      for (let i = 0; i < legalities.length; i += 1) {
        if (i === 0) {
          query += `f:${legalities[i]}`;
        } else {
          query += `+or+f:${legalities[i]}`;
        }
      }
    } else {
      for (let i = 0; i < legalities.length; i += 1) {
        if (i === 0) {
          query += `+f:${legalities[i]}`;
        } else {
          query += `+or+f:${legalities[i]}`;
        }
      }
    }
  }
  if (rarity) {
    if (query.length === 2) {
      for (let i = 0; i < rarity.length; i += 1) {
        if (i === 0) {
          query += `r:${rarity[i]}`;
        } else {
          query += `+or+r:${rarity[i]}`;
        }
      }
    } else {
      for (let i = 0; i < rarity.length; i += 1) {
        if (i === 0) {
          query += `+r:${rarity[i]}`;
        } else {
          query += `+or+r:${rarity[i]}`;
        }
      }
    }
  }
  console.log(query);
  axios.get(`https://api.scryfall.com/cards/search?${query}`)
    .then((results) => {
      results.data.query = query.slice(2);
      res.send(results.data);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost: ${PORT}`);
});
