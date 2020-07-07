const monk = require('monk');
require('dotenv').config();

const db = monk(process.env.MONGO_DB_URI);
const tweets = db.get('tweets');
const connections = db.get('connections');

module.exports = {
  tweets,
  connections,
};
