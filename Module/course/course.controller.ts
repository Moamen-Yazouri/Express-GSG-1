import { Request, Response } from "express";
import courseService from "./course.service";
import { BodyObject, StatusCodes } from "@/@types";
import { ICourse } from "./course.entity";
import { IBaseMetadata } from "@/common/repos/types";
import { deleteImage } from "@/utils/img.utils";
import path from "node:path";


class CourseController {
  getCourses(req: Request, res: Response) {

    const courses = courseService.getCourses();

    return res.success({

      success: true,
      data: courses,
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "Courses retrieved successfully",

    });

  }

  getCourseById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res.error({

        success: false,
        statusCode: StatusCodes.HttpClientError.BadRequest,
        message: "id is required",

      });
    }

    const course = courseService.getCourse(id);

    if (!course) {
      return res.error({

        success: false,
        statusCode: StatusCodes.HttpClientError.NotFound,
        message: "Course not found",

      });
    }

    return res.success({

      success: true,
      data: course,
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "Course retrieved successfully",

    });

  }

  createCourse(
    req: Request<BodyObject, BodyObject, Omit<ICourse, keyof IBaseMetadata>>,
    res: Response
  ) {

    const courseData = req.body;

    const image = req.file ? `/images/${req.file.filename}` : undefined;

    const course = courseService.createCourse({ ...courseData, image });

    return res.success({

      success: true,
      data: course,
      statusCode: StatusCodes.HttpSuccess.Created,
      message: "Course created successfully",

    });

  }

  async updateCourse(
    req: Request<{ id: string }, BodyObject, Partial<ICourse>>,
    res: Response
  ) {

    const id = req.params.id;

    const courseData = req.body;

    const image = req.file ? `/images/${req.file.filename}` : undefined;

    const existing = courseService.getCourse(id);

    if (!existing) {
      
      if (req.file) {
        
        await deleteImage(req.file.filename);
        
      }

      return res.error({

        success: false,
        statusCode: StatusCodes.HttpClientError.NotFound,
        message: "Course not found",

      });
    }

    const updatedCourse = courseService.updateCourse(id, { ...courseData, image });

    
    if (image && existing.image && updatedCourse) {

        const oldName = path.basename(existing.image);
      
        await deleteImage(oldName);
      
    }

    return res.success({

      success: true,
      data: updatedCourse!,
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "Course updated successfully",

    });
  }

  async deleteCourse(req: Request<{ id: string }>, res: Response) {

    const id = req.params.id;

    const course = courseService.getCourse(id);

    if (!course) {

      return res.error({

        success: false,
        statusCode: StatusCodes.HttpClientError.NotFound,
        message: "Course not found",

      });

    }

    courseService.deleteCourse(id);

    if (course.image) {
        const fileName = path.basename(course.image);

        await deleteImage(fileName);
    }

    return res.success({

      success: true,
      data: { id },
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "Course deleted",

    });
  }
}

export default new CourseController();
