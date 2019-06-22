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
    read: [],
    saved: []
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
      read: read,
      saved: books
    });
  }

  moveFromToShelf = (fromShelf, toShelf, book) => {
    book.shelf = toShelf;
    let newFromShelf = this.state[fromShelf];
    let newToShelf = this.state[toShelf];
    if(newFromShelf) {
      for(let [index, b] of newFromShelf.entries()) {
        if(b.id === book.id) {
          b.shelf = toShelf;
          newFromShelf.splice(index, 1);
          break;
        }
      }
      if(newToShelf) {
        if(newToShelf.filter(b => b.id === book.id).length === 0) {
          newToShelf.push(book);
        }
        this.setState(prevState => {
          return {
            [fromShelf]: newFromShelf,
            [toShelf]: newToShelf,
            saved: prevState.saved.map(b => {
              if(b.id === book.id) {
                return {...b, shelf: book.shelf}
              }
              return b;
            })
          }
        });
      } else {
        this.setState(prevState => {
          return {
            [fromShelf]: newFromShelf,
            saved: prevState.saved.filter(b => b.id !== book.id)
          }
        });
      }
    } else {
      newToShelf.push(book);
      this.setState(prevState => {
        return {
          [toShelf]: newToShelf,
          saved: [...prevState.saved, book]
        }
        
      })
    }
    BooksAPI.update({ id: book.id }, toShelf).then((response) => {
      //console.log(response);
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => 
          <BookList wantToRead={this.state.wantToRead} currentlyReading={this.state.currentlyReading} read={this.state.read} moveFromToShelf={this.moveFromToShelf}/>
        }/>
        <Route path='/search' render={() => 
          <SearchPage moveFromToShelf={this.moveFromToShelf} savedBooks={this.state.saved}/>
        }/>
      </div>
    )
  }
}

export default BooksApp
