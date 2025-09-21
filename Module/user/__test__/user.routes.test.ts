import { authedSuperTest } from "@/tests/helpers/supertest.helper";


describe("user routes endpoint", () => {
    
    it("GET /api/v1/users should return array of users if user is authenticated", async () => {
        const res = await authedSuperTest.get("/api/v1/users");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            success: true,
            data: expect.any(Array),
            statusCode: 200,
            message: "Users retrieved successfully",
        })
    });

    it("POST /api/v1/users should create a new user if user is authenticated", async () => {
        const res = await authedSuperTest
        .post("/api/v1/users/coach").send({
            name: "Test User",
            email: "test@example.com",
            password: "password123",
        })


        expect(res.statusCode).toBe(201);

        expect(res.body).toEqual({
            success: true,
            data: expect.any(Object),
            statusCode: 201,
            message: "Coach created successfully",
        })
        console.log(res.body)
    })
})