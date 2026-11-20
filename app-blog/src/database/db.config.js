const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.set('strictQuery', false);

module.exports = {
  mongoose,
  url: config.DB_URL,
  connect: () => mongoose.connect(config.DB_URL),
};
