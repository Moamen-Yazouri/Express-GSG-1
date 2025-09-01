import { Router } from "express";
import courseController from "./course.controller";
import { uploadSingle } from "@/config/multer.config";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { rolesMiddleware } from "@/middlewares/roles.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourseById);

router.post("/",
    rolesMiddleware(["admin", "coach"]), 
    uploadSingle("image"), 
    courseController.createCourse,
);

router.put("/:id",
    rolesMiddleware(["admin", "coach"]),
    uploadSingle("image"),
    courseController.updateCourse,
)

router.delete("/:id",
    rolesMiddleware(["admin", "coach"]),
    courseController.deleteCourse,
)

const CourseRouter = router;

export default CourseRouter;