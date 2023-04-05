import "./styles/style.css"

const DOM = (() => {
	const addBookButton: HTMLButtonElement = document.querySelector('#add-book')!;
	const bookDialog: HTMLDialogElement = document.querySelector('#book-dialog')!;

	const bookDialogClose = () => {
		bookDialog.close();
	}

	bookDialog.addEventListener('click', (e: Event) => {
		if(e.target === bookDialog) {
			bookDialog.close();
		}
	})

	addBookButton.addEventListener('click', () => {
		bookDialog.showModal();
	})
})();