import { BookType } from "../interfaces/BookType"

const Book = (title: string, author: string, pageCount: number, hasRead: boolean = false) => {
	return {
		title,
		author,
		pageCount,
		hasRead,
	}
}

export const BookModule = (() => {
	let books : BookType[];

	const init = () => {

		const parseBooks = localStorage.getItem('books');

		if(typeof parseBooks === 'string') {
			console.log("Parsing existing data");
			books = JSON.parse(localStorage.getItem('books')!);
		} else {
			console.log("Creating new data");
			books = [];
		}
	}

	const addBook = (title: string, author: string, pageCount: number) => {
		const book = Book(title, author, pageCount);
		books.push(book);
		saveState();
		console.log(books);
	}

	const saveState = () => {
		localStorage.setItem("books", JSON.stringify(books));
	}

	const getBooks = () => {
		return books;
	}

	return {
		init,
		addBook,
		getBooks,
	}
})();