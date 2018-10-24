import React, { Component } from "react";
import {Link} from "react-router-dom";

class Book extends Component {
  render() {
    const { book, addBookToShelf, shelf } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <Link to={{pathname:"/book",search:`?id=${book.id}`}}>
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`
            }}
          />
          </Link>
          <div className="book-shelf-changer">
            <select
              onChange={event => {
                addBookToShelf(event.target.value, book);
              }}
              value={
                shelf !== "none"
                  ? shelf
                      .toLowerCase()
                      .trim()
                      .split(" ")
                      .join("")
                  : "none"
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyreading">Currently Reading</option>
              <option value="wanttoread">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;
