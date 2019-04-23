const passport = require('passport');
require('./strategies/local.strategy');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // stores users in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // retrieve user form sessionrequire('./strategies/local.strategy');

  passport.deserializeUser((user, done) => {
    done(null, user.id);
  });


};