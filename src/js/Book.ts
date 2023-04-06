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

	const addBook = (title: string, author: string, pageCount: number, status: Status) => {
		const book = Book(title, author, pageCount, status);
		books.push(book);
		saveState();
	}

	const saveState = () => {
		localStorage.setItem("books", JSON.stringify(books));
	}

	const getBooks = () => {
		return books;
	}

	const getBook = (idx: number) => {
		return books[idx];
	}

	return {
		init,
		addBook,
		getBooks,
		getBook,
	}
})();