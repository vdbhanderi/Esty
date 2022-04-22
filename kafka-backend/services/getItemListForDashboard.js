var item=require('../models/item')

async function handle_request(msg, callback) {
    const res = {};
    try {
      console.log("inside the get Item list by shop Id in KAFKA")
     // const { userId } = msg;
      console.log(`User Id : ${msg.userId}`);
      const result = await item.find({});
      if (!result) {
        res.status = 404;
        callback(null, res);
      } else {
        res.status = 200;
        res.data = JSON.stringify(result);
        callback(null, res);
      }
    } catch (e) {
      res.status = 500;
      callback(null, 'error');
    }
}
exports.handle_request = handle_request;