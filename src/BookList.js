import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookList extends Component {

    state = {
        myBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            let dataBooks = books;
            this.setState({ myBooks: dataBooks });
            return dataBooks;
        });
    }

    changeShelf(oldShelf, book) {
        BooksAPI.update(book, book.shelf).then((res) => {
            console.log("res: " + res);
            let newBooksArray = this.state.myBooks.map((mybook) => {
                console.log("mybook.id: " + mybook.id + '; book.id: ' + book.id);
                if (mybook.id === book.id) {
                    mybook = book;
                }
                return mybook;
            });
            this.setState({ myBooks: newBooksArray });
        });
    }

    render() {
        let curArray = [];
        let wantArray = [];
        let readArray = [];
        for (let book of this.state.myBooks) {
            if (book.shelf === 'currentlyReading') {
                curArray.push(book);
            } else if (book.shelf === 'wantToRead') {
                wantArray.push(book);
            } else if (book.shelf === 'read') {
                readArray.push(book);
            } else { ; }
        }

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        curArray.map((value, index) => (<li key={value.id}><Book book={value} onChangeShelf={this.changeShelf} /></li>))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        wantArray.map((value, index) => (<li key={value.id}><Book book={value} onChangeShelf={this.changeShelf} /></li>))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        readArray.map((value, index) => (<li key={value.id}><Book book={value} onChangeShelf={this.changeShelf} /></li>))
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookList;