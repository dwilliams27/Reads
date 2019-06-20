import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';


class SearchPage extends Component {
  render() {
    return <div className="search-books">
      <div className="search-books-bar">
        <Link
          to="/"
          className="close-search"
        >Close</Link>
        <div className="search-books-input-wrapper">
            {this.state.books.map((book, index) => {
              return <Book book={book} key={index} moveToShelf={this.props.moveToShelf}/>
            })}
            <input type="text" placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  }
}

export default SearchPage;