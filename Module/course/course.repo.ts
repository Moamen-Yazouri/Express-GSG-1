import BaseRepo from "@/common/repos/baseRepo";
import { ICourse } from "./course.entity";
import { COURSES_DATA } from "./dummy";

class CourseRepo extends BaseRepo<ICourse> {
    constructor() {
        super(COURSES_DATA);
    }
}

export default new CourseRepo();