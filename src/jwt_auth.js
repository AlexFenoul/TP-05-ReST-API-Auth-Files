const BookController = require("./controllers/books");
var passport = require("passport");

module.exports = (app) => {
  app.get(
    "/books",
    passport.authenticate('jwt', { session: false, failureRedirect: "/unauthorized", }),
    (req, res) => {
      new BookController().index(req, res);
    }
  );

  app.get("/unauthorized", (req, res) => {
    res.send("unauthorized")
  });
};