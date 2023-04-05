export const Book = (title: string, author: string, pageCount: number, hasRead: boolean = false) => {
	return {
		title,
		author,
		pageCount,
		hasRead,
	}
}