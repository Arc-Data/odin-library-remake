import "./styles/style.css"
import { Book } from "./js/Book";

type BookType = {
	title: string;
	author: string;
	pageCount: number;
	hasRead: boolean;
}

const DOM = (() => {
	const addBookButton: HTMLButtonElement = document.querySelector('#add-book')!;
	const bookDialog: HTMLDialogElement = document.querySelector('#book-dialog')!;
	const bookForm: HTMLFormElement = document.querySelector('#book-form')!;
	const bookSubmit: HTMLButtonElement = document.querySelector('#book-submit')!;

	const bookDialogClose = () => {
		bookDialog.close();
	}

	const checkInputs = () => {
		const inputs = [...bookForm.querySelectorAll('input')]!;
		const valid = inputs.every(input => {
			return input.value;
		})

		return valid;
	}

	bookDialog.addEventListener('click', (e: Event) => {
		if(e.target === bookDialog) {
			bookDialog.close();
		}
	});

	bookSubmit.addEventListener('click', (e: Event) => {
		e.preventDefault();
		if(checkInputs()) {
			const inputs = bookForm.querySelectorAll('input');
			const title = inputs[0].value;
			const author = inputs[1].value;
			const pageCount = inputs[2].valueAsNumber;

			const book: BookType = Book(title, author, pageCount);
			console.log(book);
		}
	})

	addBookButton.addEventListener('click', () => {
		bookDialog.showModal();
	});
})();