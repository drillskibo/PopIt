const express = require('express');

const schema = require('../schema');

const { tweets } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const tweetList = await tweets.find();
  res.json(tweetList);
});

router.post('/', async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (!error) {
    const data = await tweets.insert(req.body);
    res.json(data);
  }
  next(error);
});

module.exports = router;
