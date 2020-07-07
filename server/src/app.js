const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const fetch = require('node-fetch');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const { connections } = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    title: 'Simple Twitter Clone',
  });
});

app.get('/login', async (req, res, next) => {
  if (req.get('token')) {
    const r = await fetch('https://discordapp.com/api/v6/users/@me', { headers: { Authorization: `Bearer ${req.get('token')}` } });
    const j = await r.json();
    console.log(`${j.username}#${j.discriminator}`);
    const x = await connections.insert({
      date: new Date(),
      user: `${j.username}#${j.discriminator}`,
    });
    console.log(x);
    res.status(200);
    res.end();
  } else {
    res.status(401);
    next(new Error('You are not logged in !'));
  }
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
