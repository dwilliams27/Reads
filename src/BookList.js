import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class BookList extends Component {
  render() {
    return <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" books={this.props.currentlyReading} moveFromToShelf={this.props.moveFromToShelf}/>
          <Bookshelf title="Want to Read" books={this.props.wantToRead} moveFromToShelf={this.props.moveFromToShelf}/>
          <Bookshelf title="Read" books={this.props.read} moveFromToShelf={this.props.moveFromToShelf}/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  }
}

export default BookList;