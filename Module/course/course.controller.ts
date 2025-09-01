import {Request, Response} from "express";
import courseService from "./course.service";
import { BodyObject, EHttpStatus } from "@/@types";
import { ICourse } from "./course.entity";
import { IBaseMetadata } from "@/common/repos/types";

class CourseController {

    getCourses(req: Request, res: Response) {
        const courses = courseService.getCourses();
        res
            .status(EHttpStatus.OK)
            .json(courses); 
    }

    getCourseById(req: Request<{id: string}>, res: Response) {
        const id = req.params.id;

        if(!id) {
            res
                .status(EHttpStatus.BadRequest)
                .json({message: "id is required"});  
        } 

        const course = courseService.getCourse(id);

        if(!course) {
            res
                .status(EHttpStatus.NotFound)
                .json({message: "course not found"});
        }

        res
            .status(EHttpStatus.OK)
            .json(course);
    }

    createCourse(req: Request<BodyObject, BodyObject, Omit<ICourse, keyof IBaseMetadata>>, res: Response) {
        const courseData = req.body;
        const image = req.file ? `/images/${req.file.filename}` : undefined;
        console.log(courseData);
        const course = courseService.createCourse({...courseData, image});
        res
            .status(EHttpStatus.Created)
            .json(course);
    }
}

export default new CourseController();