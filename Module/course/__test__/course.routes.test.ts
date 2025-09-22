import { adminSuperTest, studentSuperTest, unAuthedSuperTest } from "@/tests/helpers/supertest.helper";
import { createFakeCourse } from "@/seeds/course.seed";
import courseService from "../course.service";

describe("course routes endpoint", () => {
    it("POST /api/v1/courses should return 401 because the user is student", async () => {
        const testCourse = createFakeCourse();
        const res = await studentSuperTest
            .post('/api/v1/courses')
            .send({
                ...testCourse
            });
        expect(res.status).toBe(403);
        expect(res.body.message).toEqual("You do not have sufficient permissions to access this route!");
    })

    it("POST /api/v1/courses should return 201 because the user is admin", async () => {
        const testCourse = createFakeCourse();

        const res = await adminSuperTest
            .post('/api/v1/courses')
            .send({
                ...testCourse
            });

        expect(res.status).toBe(201);

        expect(res.body).toEqual({
            success: true,
            message: "Course created successfully",
            statusCode: 201,
            data: expect.any(Object),
        });

    })

    it("POST /api/v1/courses should return 400 because the inputs are not valid", async () => {

        const res = await adminSuperTest
            .post('/api/v1/courses')
            .send({
                title: "Test title"
            });

        expect(res.status).toBe(400);

        expect(res.body).toEqual({
            success: false,
            message: expect.any(String),
            statusCode: 400,
        });

    })
    
    it("GET /api/v1/courses should return 200 because it is ش public route", async () => {

        const res = await studentSuperTest.get("/api/v1/courses");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            success: true,
            message: "Courses retrieved successfully",
            statusCode: 200,
            data: expect.any(Array),
        });
    })

    it("GET /api/v1/courses/:id should return 200 if because the course exists", async () => {
        const res = await studentSuperTest.get("/api/v1/courses/c1");
        expect(res.status).toBe(200);

        expect(res.body).toEqual({
            success: true,
            message: "Course retrieved successfully",
            statusCode: 200,
            data: expect.any(Object),
        });
        
    })

    it("GET /api/v1/courses/:id should return 404 because the course does not exist", async () => {
        const res = await studentSuperTest.get("/api/v1/courses/xy");
        expect(res.status).toBe(404);

        expect(res.body).toEqual({
            success: false,
            message: "Course not found",
            statusCode: 404,
        });
    })

    it("PUT /api/v1/courses/:id should return 200 because the user has the permissions", async () => {
        const testCourse = createFakeCourse();
        const res = await adminSuperTest
            .put(`/api/v1/courses/c1`)
            .send({
                ...testCourse,
            });
        expect(res.status).toBe(200);

        expect(res.body).toEqual({
            success: true,
            message: "Course updated successfully",
            statusCode: 200,
            data: expect.any(Object),
        });

        const updatedCourse = courseService.getCourse("c1")!;

        expect(updatedCourse.title).toEqual(testCourse.title);
        expect(updatedCourse.description).toEqual(testCourse.description);
    })

    it("PUT /api/v1/courses/:id should return 403 because the user does not have the permissions", async () => {
        const testCourse = createFakeCourse();
        const res = await studentSuperTest
            .put(`/api/v1/courses/c1`)
            .send({
                ...testCourse,
            });
        expect(res.status).toBe(403);

        expect(res.body).toEqual({
            success: false,
            message: "You do not have sufficient permissions to access this route!",
            statusCode: 403,
        });

    })


    // The owner of the course test i will add it after adding the DB to the project.


    it("DELETE /api/v1/courses/:id should return 200 because the user has the permissions", async () => {
        const res = await adminSuperTest
            .delete(`/api/v1/courses/c1`);
            
        expect(res.status).toBe(200);

        expect(res.body).toEqual({
            success: true,
            message: "Course deleted",
            data: {
                id: "c1",
            },
            statusCode: 200,
        });

        const course = courseService.getCourse("c1");
        expect(course).toBe(undefined);
        
    })

    it("DELETE /api/v1/courses/:id should return 403 because the user does not the permissions", async () => {
        const res = await studentSuperTest
            .delete(`/api/v1/courses/c1`);
            
        expect(res.status).toBe(403);

        expect(res.body).toEqual({
            success: false,
            message: "You do not have sufficient permissions to access this route!",
            statusCode: 403,
        });

    });

    // The owner of the course test i will add it after adding the DB to the project.
})
