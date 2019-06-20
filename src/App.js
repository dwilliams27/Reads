import React from 'react'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => 
          <BookList />
        }/>
        <Route path='/search' render={() => 
          <SearchPage />
        }/>
      </div>
    )
  }
}

export default BooksApp
