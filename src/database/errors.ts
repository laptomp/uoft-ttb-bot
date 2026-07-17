import { Course } from "../types";

export class CourseAlreadyExistsError extends Error {
	constructor(course: Course) {
		super(`Course already exists: ${course.code}`);
		this.name = "CourseAlreadyExistsError";
	}
}

export class CourseNotFoundError extends Error {
	constructor(course: Course) {
		super(`Course could not be found: ${course.code}`);
		this.name = "CourseAlreadyExistsError";
	}
}

export class InvalidSectionNameError extends Error {
	constructor(sectionName: string) {
		super(`Invalid section name provided: ${sectionName}`);
		this.name = "InvalidSectionNameError";
	}
}
