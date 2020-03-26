module.exports = class BookController {

  // GET /books
  index(_, res) {
    const books = [
      {title: "First book", description: "Awesome book"},
      {title: "Second book", description: "Awesome book too"}
    ];

    res.json(books);
  }
}