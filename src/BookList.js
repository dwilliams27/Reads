import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';

class BookList extends Component {
  state = {
    wantToRead: [],
    currentlyReading: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.filterIntoShelves(books);
    })
  }

  filterIntoShelves = (books) => {
    let wantToRead = [];
    let currentlyReading = [];
    let read = [];
    for(let book of books) {
      if(book.shelf === "wantToRead") {
        wantToRead.push(book);
      } else if(book.shelf === "currentlyReading") {
        currentlyReading.push(book);
      } else {
        read.push(book);
      }
    }
    this.setState({
      wantToRead: wantToRead,
      currentlyReading: currentlyReading,
      read: read
    });
  }

  moveToShelf = (fromShelf, toShelf, book) => {
    let newFromShelf = this.state[fromShelf];
    let newToShelf = this.state[toShelf];
    for(let [index, b] of newFromShelf.entries()) {
      if(b.id === book.id) {
        b.shelf = toShelf;
        newFromShelf.splice(index, 1);
        newToShelf.push(b);
        this.setState({
          [fromShelf]: newFromShelf,
          [toShelf]: newToShelf
        })
        break;
      }
    }
    BooksAPI.update({ id: book.id }, toShelf).then((response) => {
      console.log(response);
    })
  }

  render() {
    return <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf title="Currently Reading" books={this.state.currentlyReading} moveToShelf={this.moveToShelf}/>
          <Bookshelf title="Want to Read" books={this.state.wantToRead} moveToShelf={this.moveToShelf}/>
          <Bookshelf title="Read" books={this.state.read} moveToShelf={this.moveToShelf}/>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  }
}

export default BookList;