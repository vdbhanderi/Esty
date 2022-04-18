const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('successfully connected to the mongo db');
}).catch((err) => {
  console.log(`error connecting to the database: ${err}`);
  process.exit();
});

module.exports = mongoose;