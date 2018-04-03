import React, { Component } from 'react'

class Book extends Component {

    selectShelf(e) {
        let value = e.target.value;
        let book = this.props.book;
        //此图书原来未加入书架，则设置原来书架为none
        let oldShelf = 'none';
        if(book.shelf) {
            oldShelf= book.shelf;
        }
        book.shelf = value;
        this.props.onChangeShelf(oldShelf, book);
    };

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(' + this.props.book.imageLinks.thumbnail + ')', }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={(this.props.book.shelf || "none")} onChange={this.selectShelf.bind(this)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }
}

export default Book;