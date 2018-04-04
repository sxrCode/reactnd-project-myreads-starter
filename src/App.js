import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    myBooks: [],
  }

  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
  }

  componentDidMount() {
    //组件挂载结束后更新状态
    BooksAPI.getAll().then((books) => {
      let dataBooks = books;
      this.setState({ myBooks: dataBooks });
      return dataBooks;
    });
  }

  changeShelf(oldShelf, book) {
    if (book.shelf === 'none') {
      return;//不支持移动到空书架
    }

    BooksAPI.update(book, book.shelf).then((res) => {
      let newBooksArray = this.state.myBooks;
      if ('none' === oldShelf || !oldShelf) {
        newBooksArray.push(book);
      } else {
        newBooksArray = this.state.myBooks.map((mybook) => {
          if (mybook.id === book.id) {
            mybook.shelf = book.shelf;
          }
          return mybook;
        });
      }

      //服务端更新成功后客户端要更新图书状态
      this.setState({ myBooks: newBooksArray });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<BookList myBooks={this.state.myBooks} changeShelf={this.changeShelf} />)} />
        <Route path='/search' render={() => (<BookSearch myBooks={this.state.myBooks} changeShelf={this.changeShelf} />)} />
      </div>
    )
  }
}

export default BooksApp
