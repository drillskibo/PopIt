const express = require('express');

const tweets = require('./tweets');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Twitter Clone API - V1',
  });
});

router.use('/tweets', tweets);

module.exports = router;
