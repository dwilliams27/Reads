import React from 'react'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
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

  moveToShelf = (book, shelf) => {

  }

  moveFromToShelf = (fromShelf, toShelf, book) => {
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
    return (
      <div className="app">
        <Route exact path='/' render={() => 
          <BookList wantToRead={this.state.wantToRead} currentlyReading={this.state.currentlyReading} read={this.state.read} moveFromToShelf={this.moveFromToShelf}/>
        }/>
        <Route path='/search' render={() => 
          <SearchPage />
        }/>
      </div>
    )
  }
}

export default BooksApp
