const User = require('../models/User')

async function handle_request(msg, callback)  {
  const res = {};
  try {
    const { userId } = msg;
    console.log(`User Id : ${userId}`);
    const user = await User.findById(userId);
    if (!user) {
      res.status = 404;
      callback(null, res);
    } else {
      res.status = 200;
      res.data = JSON.stringify(user);
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

exports.handle_request = handle_request;