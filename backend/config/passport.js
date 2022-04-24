const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const kafka = require('../kafka/client');
const config=require("../config");

const { PASSPORT_TOPIC}=require('../kafka/topics');

// Setup work and export for the JWT passport strategy
function auth() {
  console.log("inside");
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secretkey,
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      const msg = {};
      msg.userId = jwtPayload._id;
      kafka.make_request(PASSPORT_TOPIC, msg, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          console.log("passport results",results)
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
