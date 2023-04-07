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
	const bookEditBtn = document.querySelector('#edit-book')!;
	const statusSelect = document.querySelector('#status')!;


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
		const statusOptions = statusSelect.querySelectorAll('option')!;
		title.textContent = book.title;

		const content: HTMLDivElement = bookDetailDialog.querySelector('#book-details')!;
		resetContainer(content);

		const author = document.createElement('p');
		author.textContent = `Author: ${book.author}`;

		const pageCount = document.createElement('p');
		pageCount.textContent = `Page Count: ${book.pageCount}`;

		const status = document.createElement('p');
		status.textContent = `Status: ${book.status}`;

		statusOptions.forEach(option => {
			if(option.value === book.status) {
				option.selected = true;
			}
		})

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

	const openDialog = (dialog: HTMLDialogElement, idx?: number) => {
		dialog.showModal();
		const title: HTMLInputElement = bookForm.querySelector('#book-title')!;
		const author: HTMLInputElement = bookForm.querySelector('#book-author')!;
		const pageCount: HTMLInputElement = bookForm.querySelector('#book-page-count')!;

		title.value = '';
		author.value = '';
		pageCount.value = '';

		if(typeof idx === 'number') {
			const book: BookType = BookModule.getBook(idx);
			console.log(book);

			title.value = book.title;
			author.value = book.author;
			pageCount.value = String(book.pageCount);
		} else {
			activeBookIdx = -1;
		}

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
		
		activeBookIdx = -1;
		bookDetailDialog.close();
		renderBooks();
	}

	bookDeleteBtn.addEventListener('click', deleteBook);

	changeStatusBtn.addEventListener('click', changeBookStatus);

	closeButtons.forEach(button => {
		button.addEventListener('click', () => {
			button.closest('dialog')!.close();
		})
		activeBookIdx = -1;
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

			if(activeBookIdx === -1) {
				console.log("Will add");
				BookModule.addBook(title, author, pageCount, status);
			} else {
				console.log("will edit");
				BookModule.editBook(activeBookIdx, {title, author, pageCount, status} as BookType);
			}

			renderBooks();
			
			inputs.forEach(input => input.value = "");
			
			bookDialog.close();
		}

	})

	bookDialog.addEventListener('click', (e: Event) => closeDialog(e, bookDialog));

	bookDetailDialog.addEventListener('click', (e: Event) => {
		closeDialog(e, bookDetailDialog)
	});

	bookEditBtn.addEventListener('click', () => {
		bookOptions.classList.toggle('invisible');
		bookDetailDialog.close();
		openDialog(bookDialog, activeBookIdx);
	});

	addBookButton.addEventListener('click', () => openDialog(bookDialog));

	return {
		init,
	}
})();