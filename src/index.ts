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
	const bookContainer: HTMLDivElement = document.querySelector('#book-container')!;

	const books : BookType[] = [];

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

	const resetContainer = (div: HTMLElement) => {
		while(div.firstChild) {
			div.removeChild(div.lastChild!);
		}
	}

	const renderBooks = () => {
		resetContainer(bookContainer);
		
		books.forEach(book => {
			let div = document.createElement('div');
			div.classList.add('book-item');

			let title = document.createElement('p');
			title.textContent = book.title;
			div.appendChild(title);

			let author = document.createElement('p');
			author.textContent = book.author;
			div.appendChild(author);

			let pageCount = document.createElement('p');
			pageCount.textContent = String(book.pageCount);
			div.appendChild(pageCount);

			let status = document.createElement('p');
			status.textContent = book.hasRead ? "Finished" : "Unfinished";
			div.appendChild(status);

			let details = document.createElement('button');
			details.classList.add('btn', 'rounded', 'border', 'border-cyan-200');			
			details.textContent = 'Details';
			div.appendChild(details);

			bookContainer.appendChild(div);
		})
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
			books.push(book);
			renderBooks();
		}
	})

	addBookButton.addEventListener('click', () => {
		bookDialog.showModal();
	});
})();