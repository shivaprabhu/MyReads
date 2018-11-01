import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import { DebounceInput } from "react-debounce-input";

class SearchBooks extends Component {
  state = {
    searchInput: "",
    books: this.props.books
  };

  handleSearch = keyword => {
    keyword !== ""
      ? BooksAPI.search(keyword).then(books => {
          if (books.hasOwnProperty("error")) {
            keyword = "";
          } else {
            this.setState({ books: books, searchInput: keyword });
          }
        })
      : this.setState({
          books: this.props.books,
          searchInput: keyword
        });
  };

  componentWillReceiveProps(props) {
    if (this.state.searchInput === "") {
      this.setState({
        books: props.books
      });
    }
  }

  render() {
    console.log();

    const { addBookToShelf, bookAlreadyExistsError, hideBookAlreadyExistsError, mapBookToShelf } = this.props;
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
            <DebounceInput
              type="text"
              minLength={1}
              debounceTimeout={300}
              onChange={event => this.handleSearch(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {bookAlreadyExistsError && (
            <div className="error">
              <p>This book already exists on your shelf!</p>
              <a href="#" onClick={hideBookAlreadyExistsError}>
                Close
              </a>
            </div>
          )}
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.title}>
                <Book book={book} addBookToShelf={addBookToShelf} shelf={mapBookToShelf.get(book.id) === undefined ? "none" : mapBookToShelf.get(book.id)} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
