const DOM = (() => {
	const addBookButton: HTMLButtonElement = document.querySelector('#add-book')!;

	addBookButton.addEventListener('click', () => {
		console.log("Hello world")
	})
})();