import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    searchInput: "",
    books: []
  };

  handleSearch = keyword => {
    keyword !== ""
      ? BooksAPI.search(keyword).then(books => {
          this.setState({ books: books });
        })
      : BooksAPI.getAll().then(books => {
          this.setState({
            books: books
          });
        });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    });
  }

  render() {
    const { addBookToShelf, bookAlreadyExistsError,hideBookAlreadyExistsError } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => {
                this.handleSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
        {bookAlreadyExistsError && (
          <div className="error">
            <p>This book already exists on your shelf!</p>
            <a href="#" onClick={hideBookAlreadyExistsError}>Close</a>
          </div>
        )}
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.title}>
                <Book book={book} addBookToShelf={addBookToShelf} shelf="none" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
