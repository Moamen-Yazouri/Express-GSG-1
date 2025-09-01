import { IBaseMetadata } from "@/common/repos/types";
import { ICourse } from "./course.entity";
import courseRepo from "./course.repo";

class CourseService {

    createCourse(courseData: Omit<ICourse, keyof IBaseMetadata>) {
        return courseRepo.create(courseData);
    };

    getCourses() {
        return courseRepo.findAll()
    };

    getCourse(id: ICourse["id"]) {
        return courseRepo.findById(id);
    };

    deleteCourse(id: ICourse["id"]) {
        return courseRepo.delete(id);
    };

    updateCourse(id: ICourse["id"], courseData: Partial<ICourse>) {
        return courseRepo.update(id, courseData);
    };
}

export default new CourseService();