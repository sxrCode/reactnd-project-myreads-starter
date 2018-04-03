import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

const terms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

class BookSearch extends Component {
    state = {
        search: '',
        searchBooks: [],
        myBooks: [],
    }

    componentDidMount() {
        //组件挂载结束后抓取‘我的图书’
        BooksAPI.getAll().then((books) => {
            let dataBooks = books;
            this.setState({ myBooks: dataBooks });
            return dataBooks;
        });
    }

    handleSearchChange(e) { // 受控组件
        let searchText = e.target.value.trim();
        this.setState({ search: searchText });
        let testResult = terms.find((term) => { 
            return term === searchText;
        });
        if (testResult) {//符合搜索术语则进行搜索
            BooksAPI.search(testResult).then((searchBooks) => {
                //查询后，将其中已经放到书架的图书同步状态
                let newSearchBooks = searchBooks.map((searchBook) => {
                    for (let mybook of this.state.myBooks) {
                        if (mybook.title === searchBook.title && mybook.subtitle === searchBook.subtitle) {
                            searchBook = mybook;
                            break;
                        }
                    }
                    return searchBook;
                });
                this.setState({ searchBooks: newSearchBooks });
            });
        }
    }

    changeShelf(oldShelf, book) {
        if (book.shelf === 'none') {
            return;//不支持移动到空书架
        }

        BooksAPI.update(book, book.shelf).then((res) => {
            let newBooksArray = this.state.myBooks;
            //服务端更新成功后客户端要更新图书状态
            if('none' === oldShelf || !oldShelf) {
                newBooksArray.push(book);
            } else {
                newBooksArray = this.state.myBooks.map((mybook) => {
                    if (mybook.id === book.id) {
                        mybook = book;
                    }
                    return mybook;
                });
            }
   
            //更新图书后同步我的图书和查询结果图书的状态
            let searchBooks = this.state.searchBooks.map((searchBook) => {
                for (let mybook of newBooksArray) {
                    if (mybook.title === searchBook.title && mybook.subtitle === searchBook.subtitle) {
                        searchBook = mybook;
                        break;
                    }
                }
                return searchBook;
            });
            this.setState({ searchBooks: searchBooks, myBooks: newBooksArray });
            
        });
    }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.search} onChange={this.handleSearchChange.bind(this)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchBooks.map((value, index) => (<li key={value.id}><Book book={value} onChangeShelf={this.changeShelf.bind(this)} /></li>))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch;