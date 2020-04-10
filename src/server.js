const express = require("express");
const basicAuthRouter = require("./basic_auth_router");
const jwtRouter = require("./jwt_auth");
var mongoose = require("mongoose");
var options = { useNewUrlParser: true, useUnifiedTopology: true };
var passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var BasicStrategy = require("passport-http").BasicStrategy;
var Users = require("./models/user-model");

var urlmongo = "mongodb://mongo-container:27017/auth_fenoul";

mongoose.connect(urlmongo, options);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Erreur lors de la connexion"));
db.once("open", function () {
  console.log("Connexion à la base OK");
});
const app = express();
let port = process.env.PORT || 3000;

if (process.env.BASIC_AUTH === "true") {
  console.log(`Basic Auth used`);
  passport.use(
    new BasicStrategy(function (username, password, done) {
      Users.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.password === password) {
          return done(null, user);
        }
        return done(null, false);
      });
    })
  );
  basicAuthRouter(app);
}

if (process.env.JWT_AUTH === "true") {
  console.log("JWT");
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "secret";
  opts.issuer = "accounts.examplesoft.com";
  opts.audience = "yoursite.net";
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      Users.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
  jwtRouter(app);
}

if (process.env.API_KEY_AUTH === true) {
  console.log("KEY");
}

if (process.env.OIDC_AUTH === true) {
  console.log("OIDC");
}

app.listen(port, () => console.log(`API Served off port: ${port}`));
