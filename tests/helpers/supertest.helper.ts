import { app } from "../../server";
import { USERS_DATA } from "../../Module/user/dummy";
import supertest from "supertest";
import TestAgent from "supertest/lib/agent";
import { generateToken } from "../../utils/jwt.util";
const adminForTest = USERS_DATA[0]!;
const coachForTest = USERS_DATA[1]!;
const studentForTest = USERS_DATA[2]!;

const adminToken = generateToken({
    sub: adminForTest.id,
    email: adminForTest.email,
    name: adminForTest.name,
    role: adminForTest.role,
});


const coachToken = generateToken({
    sub: coachForTest.id,
    email: coachForTest.email,
    name: coachForTest.name,
    role: coachForTest.role,
});

const studentToken = generateToken({
    sub: studentForTest.id,
    email: studentForTest.email,
    name: studentForTest.name,
    role: studentForTest.role,
})

export const unAuthedSuperTest: TestAgent = supertest.agent(app);

export const adminSuperTest: TestAgent = supertest
    .agent(app)
    .set('Authorization', `Bearer ${adminToken}`)
    .set("Accept", "application/json");

export const coachSuperTest: TestAgent = supertest
    .agent(app)
    .set('Authorization', `Bearer ${coachToken}`)
    .set("Accept", "application/json");
    
export const studentSuperTest: TestAgent = supertest
    .agent(app)
    .set('Authorization', `Bearer ${studentToken}`)
    .set("Accept", "application/json");



