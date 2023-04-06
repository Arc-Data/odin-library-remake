import { BookType, Status } from "../interfaces/BookType";
import { BookModule } from "./Book";

export const DOM = (() => {
	
	const addBookButton: HTMLButtonElement = document.querySelector('#add-book')!;
	const bookDialog: HTMLDialogElement = document.querySelector('#book-dialog')!;
	const bookForm: HTMLFormElement = document.querySelector('#book-form')!;
	const bookSubmit: HTMLButtonElement = document.querySelector('#book-submit')!;
	const bookContainer: HTMLDivElement = document.querySelector('#book-container')!;
	const bookDetailDialog: HTMLDialogElement = document.querySelector('#book-detail-dialog')!;
	const closeButtons = [...document.querySelectorAll('.close-btn')];
	const changeStatus = document.querySelector('#changeStatus')!;
	const changeStatusBtn = document.querySelector('#save-book')!;
	const bookOptions = document.querySelector('#book-options')!;
	const bookOptionsBtn = document.querySelector('#book-options-btn')!;
	const bookDeleteBtn = document.querySelector('#delete-book')!;

	let activeBookIdx = -1;

	const init = () => {
		BookModule.init();
		renderBooks();
	}

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

	const openBookDetails = (idx: number) => {
		activeBookIdx = idx;
		const book = BookModule.getBook(idx);
		const title = bookDetailDialog.querySelector('#book-title')!;
		title.textContent = book.title;

		const content: HTMLDivElement = bookDetailDialog.querySelector('#book-details')!;
		resetContainer(content);

		const author = document.createElement('p');
		author.textContent = `Author: ${book.author}`;

		const pageCount = document.createElement('p');
		pageCount.textContent = `Page Count: ${book.pageCount}`;

		const status = document.createElement('p');
		status.textContent = `Status: ${book.status}`;

		content.append(author, pageCount, status);
		bookDetailDialog.showModal();
	}

	const renderBooks = () => {
		resetContainer(bookContainer);
		const books: BookType[] = BookModule.getBooks();

		books.forEach((book, idx) => {
			let div = document.createElement('div');
			div.classList.add('book-item');

			let title = document.createElement('p');
			title.textContent = book.title;
			title.classList.add('col-span-2');
			div.appendChild(title);

			let author = document.createElement('p');
			author.textContent = book.author;
			div.appendChild(author);

			let pageCount = document.createElement('p');
			pageCount.textContent = String(book.pageCount);
			div.appendChild(pageCount);

			let status = document.createElement('p');
			status.textContent = book.status;
			div.appendChild(status);

			let details: HTMLButtonElement = document.createElement('button');
			details.classList.add('btn', 'rounded', 'border', 'border-cyan-200');			
			details.textContent = 'Details';
			details.dataset.data = `${idx}`;


			details.addEventListener('click', () => openBookDetails(idx));


			div.appendChild(details);

			bookContainer.appendChild(div);
		})
	}

	const closeDialog = (e: Event, dialog: HTMLDialogElement) => {
		if(e.target === dialog) {
			dialog.close();
		}
	}

	const openDialog = (dialog: HTMLDialogElement) => {
		dialog.showModal();
	}

	const deleteBook = () => {
		BookModule.deleteBook(activeBookIdx);
		bookOptions.classList.toggle('invisible');
		bookDetailDialog.close();
		renderBooks();
	}

	const changeBookStatus = (e: Event) => {
		e.preventDefault();
		console.log("Change book status in DOM");

		const status: HTMLSelectElement = document.querySelector('#status')!;
		BookModule.changeStatus(activeBookIdx, status.value as Status);
		bookDetailDialog.close();
		renderBooks();
	}

	bookDeleteBtn.addEventListener('click', deleteBook);

	changeStatusBtn.addEventListener('click', changeBookStatus);

	closeButtons.forEach(button => {
		button.addEventListener('click', () => {
			button.closest('dialog')!.close();
		})
	})

	bookOptionsBtn.addEventListener('click', (e: Event) => {
		bookOptions.classList.toggle('invisible');
	})

	bookSubmit.addEventListener('click', (e: Event) => {
		e.preventDefault();
		const inputs = bookForm.querySelectorAll('input');
		
		if(checkInputs()) {
			const title = inputs[0].value;
			const author = inputs[1].value;
			const pageCount = inputs[2].valueAsNumber;
			const status = bookForm.querySelector('select')!.value as Status;

			BookModule.addBook(title, author, pageCount, status);
			renderBooks();
			
			inputs.forEach(input => input.value = "");
			bookDialog.close();
		}

	})

	addBookButton.addEventListener('click', () => openDialog(bookDialog));

	return {
		init,
	}
})();