import { BookType, Status } from "../interfaces/BookType"

const Book = (title: string, author: string, pageCount: number, status: Status = "Planning") => {
	return {
		title,
		author,
		pageCount,
		status,
	}
}

export const BookModule = (() => {
	let books : BookType[];

	const init = () => {

		const parseBooks = localStorage.getItem('books');

		if(typeof parseBooks === 'string') {
			books = JSON.parse(localStorage.getItem('books')!);
		} else {
			books = [];
		}
	}

	const changeStatus = (idx: number, status: Status) => {
		books[idx].status = status;
		saveState();
	}

	const addBook = (title: string, author: string, pageCount: number, status: Status) => {
		const book = Book(title, author, pageCount, status);
		books.push(book);
		saveState();
	}

	const deleteBook = (idx: number) => {
		books.splice(idx, 1);
		saveState();
	}

	const saveState = () => {
		localStorage.setItem("books", JSON.stringify(books));
	}

	const getBooks = () => {
		return books;
	}

	const editBook = (idx: number, bookDetails: BookType) => {
		const book = books[idx];

		book.title = bookDetails.title;
		book.author = bookDetails.author;
		book.pageCount = bookDetails.pageCount;
		book.status = bookDetails.status;
		saveState();
	}

	const getBook = (idx: number) => {
		return books[idx];
	}

	return {
		init,
		addBook,
		getBooks,
		editBook,
		getBook,
		changeStatus,
		deleteBook,
	}
})();