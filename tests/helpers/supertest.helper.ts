import { app } from "../../server";
import { USERS_DATA } from "../../Module/user/dummy";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { generateToken } from "../../utils/jwt.util";
const userForTest = USERS_DATA[0]!;

const token = generateToken({
    sub: userForTest.id,
    email: userForTest.email,
    name: userForTest.name,
    role: userForTest.role,
});

export const unAuthedSuperTest: TestAgent = supertest.agent(app);

export const authedSuperTest: TestAgent = supertest
    .agent(app)
    .set('Authorization', `Bearer ${token}`)
    .set("Accept", "application/json");