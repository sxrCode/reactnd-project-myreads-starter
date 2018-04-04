import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

function BookList(props) {


    // 对我的所有图书进行分类
    let cur = { shelfName: 'Currently Reading', books: [] };
    let want = { shelfName: 'Want to Read', books: [] };
    let read = { shelfName: 'Read', books: [] };
    for (let book of props.myBooks) {

        if (book.shelf === 'currentlyReading') {
            cur.books.push(book);
        } else if (book.shelf === 'wantToRead') {
            want.books.push(book);
        } else if (book.shelf === 'read') {
            read.books.push(book);
        } else { ; }
    }
    let shelfs = [];
    shelfs.push(cur);
    shelfs.push(want);
    shelfs.push(read);



    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelfs.map((shelf, shelfIndex) => (
                        <div className="bookshelf" key={shelfIndex}>
                            <h2 className="bookshelf-title">{shelf.shelfName}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        shelf.books.map((value, bookIndex) => (<li key={bookIndex}><Book book={value} onChangeShelf={props.changeShelf} /></li>))
                                    }
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="open-search">
                <Link to='/search' >Add a book</Link>
            </div>
        </div>
    );

}

export default BookList;