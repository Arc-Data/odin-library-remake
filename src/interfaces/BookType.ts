export type Status = "Planning" | "Completed" | "Paused" | "Reading"; 

export type BookType = {
	title: string;
	author: string;
	pageCount: number;
	status: Status;
}

