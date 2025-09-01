import { ICourse } from "./course.entity";


export const COURSES_DATA: ICourse[] = [
  {
    id: "c1",
    title: "Introduction to TypeScript",
    description: "Learn the basics of TypeScript, types, and how it improves JavaScript development.",
    image: "/c1",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-02T10:00:00Z"),
  },
  {
    id: "c2",
    title: "Mastering Express.js",
    description: "Build scalable APIs with Express.js, covering middleware, routing, and authentication.",
    image: "/c2",
    createdAt: new Date("2025-01-05T10:00:00Z"),
    updatedAt: new Date("2025-01-06T10:00:00Z"),
  },
  {
    id: "c3",
    title: "Next.js for Beginners",
    description: "A practical guide to building modern React apps with Next.js, SSR, and API routes.",
    image: "/c3",
    createdAt: new Date("2025-01-10T10:00:00Z"),
    updatedAt: new Date("2025-01-11T10:00:00Z"),
  },
  {
    id: "c4",
    title: "MongoDB Fundamentals",
    description: "Understand NoSQL databases, data modeling, and CRUD operations using MongoDB.",
    image: "/c4",
    createdAt: new Date("2025-01-15T10:00:00Z"),
    updatedAt: new Date("2025-01-16T10:00:00Z"),
  }
];
