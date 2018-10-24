import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    const { shelves, books, addBookToShelf,  } = this.props;
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <div key={shelf} className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map(
                      book =>
                        book.shelf.toLowerCase() ===
                          shelf
                            .toLowerCase()
                            .trim()
                            .split(" ")
                            .join("") && (
                          <li key={book.title}>
                            <Book book={book} addBookToShelf={addBookToShelf} shelf={shelf}/>
                          </li>
                        )
                    )}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
