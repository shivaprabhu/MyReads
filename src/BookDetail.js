import React, { Component } from "react";
import * as BookAPI from "./BooksAPI";

class BookDetail extends Component {
  state = {
    book: null
  };
  componentDidMount() {
    const { history } = this.props;
    const id = history.location.search.split("=")[1];

    BookAPI.get(id).then(bookDetail => {
      this.setState({ book: bookDetail });
    });
  }
  render() {
    const { book } = this.state;
    return (
      book !== null && (
        <div>
          <div style={{ position: "fixed", right: "50px", top: "50px" }}>
            <button
              onClick={() => {
                this.props.history.history.goBack();
              }}
            >
              Close
            </button>{" "}
          </div>
          <div
            style={{
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "100px"
            }}
          >
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}
            />
          </div>
          <div className="book-meta">
            <h2 style={{ marginBottom: "0" }}>{book.title}</h2>
            <p style={{ marginTop: "0", fontSize: "13px" }}>{book.subtitle}</p>
            <p style={{ marginTop: "0", fontSize: "15px", fontStyle: "italic", padding: "0 20%" }}>{book.description}</p>
            <ul>
              <li>Authors:&emsp;</li>
              {book.authors.map(author => (
                <li key={author}>{author}</li>
              ))}
            </ul>
            <ul>
              <li>Catrgories:&emsp;</li>
              {book.categories.map(category => (
                <li key={category}>{category}</li>
              ))}
            </ul>
            <p>Average Rating: {book.averageRating}</p>
            <a href={book.previewLink} target="_blank">
              Preview link
            </a>
          </div>
        </div>
      )
    );
  }
}

export default BookDetail;
