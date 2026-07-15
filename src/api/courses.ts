import { Course } from "../types/course";
import { SearchedCourse } from "../types/searched-course";
import { tearsClient } from "./client";

/**
 * Get a sepcific course by course code.
 *
 * @param courseCode The course code being used to search for the course
 * @returns A promise of a `Course` instance matching `courseCode`
 * @throws {Error} When a course with `courseCode` could not be found
 */
export async function getCourse(courseCode: string): Promise<Course> {
	const searchedCourses = await searchCourseByTerm(courseCode, ["20269", "20271", "20269-20271"]);

	const searchedCourse: SearchedCourse = (() => {
		for (const course of searchedCourses) {
			if (course.code.includes(courseCode)) {
				return course;
			}
		}
		throw new Error(`Course with courseCode '${courseCode}' could not be found`);
	})();

	const courses = await tearsClient.post("/getPageableCourses", {
		availableSpace: false,
		courseCodeAndTitleProps: {
			courseCode: searchedCourse.code,
			courseSectionCode: searchedCourse.sectionCode,
			courseTitle: searchedCourse.name,
			searchCourseDescription: false,
		},
		departmentProps: [],
		divisions: ["ARTSC"],
		page: 1,
		pageSize: 20,
		sessions: ["20269", "20271", "20269-20271"],
	});

	return courses.data.payload["pageableCourse"]["courses"][0] as Course;
}

/**
 * Search for a course by a string "term".
 *
 * @param term 		The term being used to search for a course
 * @param sessions	The sessions the course is being searched in
 * @param divisions	The academic divisions hosting the courses
 * @returns A promise for an array of `SearchedCourse` instances representing the matched courses
 */
export async function searchCourseByTerm(
	term: string,
	sessions: Array<string>,
	divisions: string = "ARTSC",
): Promise<Array<SearchedCourse>> {
	const response = await tearsClient.get("/getOptimizedMatchingCourseTitles", {
		params: {
			term: term,
			sessions: sessions,
			divisions: divisions,
			lowerThreshold: 50,
			upperThreshold: 200,
		},
	});

	return response.data["payload"]["codesAndTitles"] as Array<SearchedCourse>;
}
