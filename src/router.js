const BookController = require('./controllers/books');

module.exports = (app) => {

  // Books
  
  app.get('/books', (req, res) => {
    new BookController().index(req, res);
  });
}