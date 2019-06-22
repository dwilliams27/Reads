import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';


class SearchPage extends Component {
  state = {
    books: []
  }

  handleChange = (event) => {
    if(event) {
      BooksAPI.search(event.target.value).then((response) => {
        //console.log(response);
        if(response && !response.error) {
          this.setState({
            books: response
          })
        } else {
          this.setState({
            books: []
          })
        }
      })
    }
  }

  render() {
    return <div className="search-books">
      <div className="search-books-bar">
        <Link
          to="/"
          className="close-search"
        >Close</Link>
        <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books.map((book) => {
            let newBook = {...book};
            newBook.shelf = 'none';
            for(const b of this.props.savedBooks.entries()) {
              if(b[1].id === newBook.id) {
                newBook.shelf = b[1].shelf;
                break;
              }
            }
            return <Book book={newBook} key={book.id} moveFromToShelf={this.props.moveFromToShelf}/>
          })}
        </ol>
      </div>
    </div>
  }
}

export default SearchPage;