import { Router } from "express";
import courseController from "./course.controller";
import { uploadSingle } from "@/config/multer.config";

const router = Router();

router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourseById);

router.post("/", 
    uploadSingle("image"), 
    courseController.createCourse,
);

const CourseRouter = router;

export default CourseRouter;