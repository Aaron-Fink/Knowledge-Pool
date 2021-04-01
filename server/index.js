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
  const { name } = req.query;
  const { text } = req.query;
  const { colors } = req.query;
  const { colorsEqual } = req.query;
  const { type } = req.query;
  const { typeEqual } = req.query;
  const { cmc } = req.query;
  const { typeCMC } = req.query;
  const { power } = req.query;
  const { typePower } = req.query;
  const { tough } = req.query;
  const { typeTough } = req.query;
  const { legal } = req.query;
  if (name.length > 0) {
    if (query.length === 2) {
      query += `${name}`;
    } else {
      query += `+${name}`;
    }
  }
  if (text.length > 0) {
    if (query.length === 2) {
      query += `o:'${text}'`;
    } else {
      query += `+o:'${text}'`;
    }
  }
  if (colors) {
    let color = '';
    for (let i = 0; i < colors.length; i += 1) {
      color += colors[i];
    }
    if (colorsEqual === 'exactly') {
      if (query.length === 2) {
        query += `c=${color}+-c:c`;
      } else {
        query += `+c=${color}+-c:c`;
      }
    } else if (colorsEqual === 'either') {
      if (query.length === 2) {
        query += `c<=${color}+-c:c`;
      } else {
        query += `+c<=${color}+-c:c`;
      }
    } else if (colorsEqual === 'neither') {
      for (let i = 0; i < color.length; i += 1) {
        if (query.length === 2) {
          query += `-c:${color[i]}`;
        } else {
          query += `+-c:${color[i]}`;
        }
      }
    }
  }
  if (type) {
    if (typeEqual === 'exactly') {
      for (let i = 0; i < type.length; i += 1) {
        if (i === 0 && query.length === 2) {
          query += `t:${type[i]}`;
        } else {
          query += `+t:${type[i]}`;
        }
      }
    } else if (typeEqual === 'either') {
      if (query.length === 2) {
        query += '(';
      } else {
        query += '+(';
      }
      for (let i = 0; i < type.length; i += 1) {
        if (i === 0) {
          query += `t:${type[i]}`;
        } else {
          query += ` or t:${type[i]}`;
        }
      }
      query += ')';
    } else if (typeEqual === 'neither') {
      for (let i = 0; i < type.length; i += 1) {
        if (i === 0 && query.length === 2) {
          query += `-t:${type[i]}`;
        } else {
          query += `+-t:${type[i]}`;
        }
      }
    }
  }
  if (cmc.length > 0) {
    if (query.length === 2) {
      query += `cmc${typeCMC}${cmc}`;
    } else {
      query += `+cmc${typeCMC}${cmc}`;
    }
  }
  if (power.length > 0) {
    if (query.length === 2) {
      query += `pow${typePower}${power}`;
    } else {
      query += `+pow${typePower}${power}`;
    }
  }
  if (tough.length > 0) {
    if (query.length === 2) {
      query += `tou${typeTough}${tough}`;
    } else {
      query += `+tou${typeTough}${tough}`;
    }
  }
  if (legal) {
    for (let i = 0; i < legal.length; i += 1) {
      if (i === 0 && query.length === 2) {
        query += `f:${legal[i]}`;
      } else {
        query += `+f:${legal[i]}`;
      }
    }
  }
  axios.get(`https://api.scryfall.com/cards/search?${query}`)
    .then((results) => {
      results.data.query = query.slice(2);
      res.send(results.data);
    })
    .catch((err) => res.send(err.response.statusText));
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost: ${PORT}`);
});
