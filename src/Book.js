import React from 'react'
import defcover from './res/nocover.gif'

function Book(props) {
	function selectShelf(e) {
		let value = e.target.value;
		let book = props.book;
		//此图书原来未加入书架，则设置原来书架为none
		let oldShelf = 'none';
		if (book.shelf) {
			oldShelf = book.shelf;
		}
		book.shelf = value;

		if (props.onChangeShelf) {
			props.onChangeShelf(oldShelf, book);
		}

	}

	const thumbnail = props.book.imageLinks ? props.book.imageLinks.thumbnail : defcover;
	const title = props.book.title ? props.book.title : 'Book Title';
	const authors = props.book.authors ? props.book.authors : 'unknow authors';
	const defaultValue = props.book.shelf ? props.book.shelf : "none";


	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(' + thumbnail + ')', }}></div>
				<div className="book-shelf-changer">
					<select value={defaultValue} onChange={selectShelf}>
						<option value="moveTo" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{title}</div>
			<div className="book-authors">{authors}</div>
		</div>
	);
}

export default Book;