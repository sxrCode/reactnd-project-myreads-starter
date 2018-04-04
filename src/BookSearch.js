import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

const terms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

class BookSearch extends Component {
    state = {
        search: '',
        searchBooks: [],
    }

    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e) { // 受控组件
        let searchText = e.target.value.trim();
        this.setState({ search: searchText });
        let testResult = terms.find((term) => { // 与输入匹配开头的第一个关键词
            return 0 === term.indexOf(searchText);
        });
        if (testResult) {//对关键词进行搜索
            BooksAPI.search(testResult).then((searchBooks) => {
                this.syncBookState(searchBooks);
            });
        }
    }

    syncBookState(searchBooks) {
        //与已经放到书架的图书同步状态
        if (!searchBooks) {
            searchBooks = this.state.searchBooks;
        }

        let newSearchBooks = searchBooks.map((searchBook) => {
            for (let mybook of this.props.myBooks) {
                if (mybook.title === searchBook.title && mybook.subtitle === searchBook.subtitle) {
                    searchBook = mybook;
                    break;
                }
            }
            return searchBook;
        });

        this.setState({ searchBooks: newSearchBooks });
    }

    componentWillReceiveProps() {
        this.syncBookState();
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.search} onChange={this.handleSearchChange} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchBooks.map((value, index) => (<li key={index}><Book book={value} onChangeShelf={this.props.changeShelf} /></li>))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch;