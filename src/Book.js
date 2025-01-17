import React, { Component } from 'react';

class Book extends Component {
  moveBook = (event) => {
    this.props.moveFromToShelf(this.props.book.shelf, event.target.value, this.props.book);
  }

  render() {
    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.smallThumbnail : `https://static.thenounproject.com/png/140281-200.png`})` }}></div>
        <div className="book-shelf-changer">
          <select value={this.props.book.shelf} onChange={this.moveBook}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{this.props.book.title}</div>
      <div className="book-authors">{this.props.book.authors}</div>
    </div>
  }
}

export default Book;