import {Request, Response} from "express";
import courseService from "./course.service";
import { BodyObject, EHttpStatus } from "@/@types";
import { ICourse } from "./course.entity";
import { IBaseMetadata } from "@/common/repos/types";
import { deleteImage } from "@/utils/img.utils";
import path from "path";

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

        const course = courseService.createCourse({...courseData, image});

        res
            .status(EHttpStatus.Created)
            .json(course);
    }

    async updateCourse(req: Request<{id: string}, BodyObject, Partial<ICourse>>, res: Response) {
        const id = req.params.id;
        
        const courseData = req.body;

        const image = req.file ? `/images/${req.file.filename}` : undefined;

        const course = courseService.getCourse(id);

        if(!course) {

            if(req.file) {

                const uploaded = req.file.filename;

                await deleteImage(uploaded);
            }

            return res  
                        .status(EHttpStatus.NotFound)
                        .json({message: "course not found"});
        }

        const updatedCourse = courseService.updateCourse(id, {...courseData, image});

        if(image && course.image && updatedCourse) {
            const imageName = path.basename(course.image);
            await deleteImage(imageName);
        }

        res
            .status(EHttpStatus.OK)
            .json(updatedCourse);
    }

    async deleteCourse(req: Request<{id: string}>, res: Response) {
        const id = req.params.id;

        const course = courseService.getCourse(id);

        if(!course) {
            return res  
                        .status(EHttpStatus.NotFound)
                        .json({message: "course not found"});
        }

        
        courseService.deleteCourse(id);

        if(course.image) {
            await deleteImage(course.image);
        }

        res
            .status(EHttpStatus.OK)
            .json({message: "course deleted"});
    }
}

export default new CourseController();