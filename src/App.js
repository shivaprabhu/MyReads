import React from "react";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";
import BookDetail from "./BookDetail";
import "./App.css";
import { Link, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    shelves: ["Currently Reading", "Want to Read", "Read"],
    books: [],
    bookAlreadyExistsError: false
  };

  addBookToShelf = (shelfName, bookToAdd) => {
    bookToAdd.shelf = shelfName;
    if (this.state.books.length === 0) {
      this.setState({ books: [bookToAdd] });
    } else if (this.state.books.length > 0) {
      let bookAdded = false;
      this.state.books.forEach((book, index) => {
        if (book.id !== bookToAdd.id) {
          if (index + 1 === this.state.books.length && !bookAdded) {
            this.setState(oldState => ({
              books: [...oldState.books, bookToAdd]
            }));
          }
        }
        if (book.id === bookToAdd.id) {
          this.setState({ bookAlreadyExistsError: true });
          // check if book's shelf is being changed, if so re-render
          if (book.self !== shelfName) {
            this.setState(oldState => ({ books: [...oldState.books] }));
          }
          bookAdded = true;
        }
      });
    }
  };

  hideBookAlreadyExistsError = () => {
    this.setState({ bookAlreadyExistsError: false });
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <Route exact path="/" render={() => <BookShelf addBookToShelf={this.addBookToShelf} shelves={this.state.shelves} books={this.state.books} />} />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                addBookToShelf={this.addBookToShelf}
                bookAlreadyExistsError={this.state.bookAlreadyExistsError}
                hideBookAlreadyExistsError={this.hideBookAlreadyExistsError}
              />
            )}
          />
          <Route path="/book" render={history => <BookDetail history={history} />} />
          <div className="open-search">
            <Link to={{ pathname: "/search" }}> Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
