import { ICourse } from "./course.entity";
import courseRepo from "./course.repo";
import CustomError from "@/Error/customError";
import { StatusCodes } from "@/@types";
import { CreatCourseDTO, UpdateCourseDTO } from "./types/course.dto";

class CourseService {

    isDuplicate(title: string, desc: string) {
       const courses = this.getCourses();

       const existing = courses.find(course => course.title === title && course.description === desc);

       return Boolean(existing);

    }

    isExist(id: ICourse["id"]) {

        return courseRepo.findById(id);

    }
    
    createCourse(courseData: CreatCourseDTO) {

        const isDuplicate = this.isDuplicate(courseData.title, courseData.description);

        if(isDuplicate) {

            throw new CustomError(
                'Course already exists',
                StatusCodes.HttpClientError.BadRequest,
                'course',
            );

        }

        return courseRepo.create(courseData);

    };

    getCourses() {
        return courseRepo.findAll()
    };

    getCourse(id: ICourse["id"]) {
        return courseRepo.findById(id);
    };

    deleteCourse(id: ICourse["id"]) {

        const existing = this.isExist(id);

        if(!existing) {
            throw new CustomError(
                'Course not found',
                StatusCodes.HttpClientError.NotFound,
                'course',
            )
        }
        return courseRepo.delete(id);
    };

    updateCourse(id: ICourse["id"], courseData: UpdateCourseDTO) {

        const existing = this.isExist(id);

        if(!existing) {
            throw new CustomError(
                'Course not found',
                StatusCodes.HttpClientError.NotFound,
                'course',
            )
        }

        return courseRepo
                .update(id, courseData);
    };
}

export default new CourseService();