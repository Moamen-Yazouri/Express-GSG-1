# Express API – Auth, Users, Courses

A clean Express.js API organized into **feature modules**: **Auth**, **User**, and **Course**.

This README documents how to run the project and the available routes that were detected from the uploaded `*.route.ts` files.

## Quick Start

```bash
# 1) Install dependencies
npm i

# 2) Start dev server (with hot reload if configured)
npm run dev

# 3) Run tests
npm run test
```

## Tech Stack (assumed)
- **Node.js + Express**
- **TypeScript**
- **Jest + Supertest** for testing

> If your stack differs, adjust this section accordingly.

## Project Structure (high level)

```
.
├─ Module/
│  ├─ auth/
│  │  └─ auth.route.ts
│  ├─ user/
│  │  └─ user.route.ts
│  └─ course/
│     └─ courses.route.ts
├─ tests/              # Jest tests (assumed)
├─ package.json
└─ tsconfig.json
```

## API Endpoints

### Auth

| Method | Path |
|---|---|
| POST | `/sign-in` |
| POST | `/sign-up` |

### User

| Method | Path |
|---|---|
| GET | `/` |
| DELETE | `/:id` |
| GET | `/:id` |
| POST | `/coach` |
| GET | `/me` |
| PUT | `/me` |

### Courses

| Method | Path |
|---|---|
| GET | `/` |
| POST | `/` |
| DELETE | `/:id` |
| GET | `/:id` |
| PUT | `/:id` |

> **Note:** The tables list paths **exactly** as defined in the route files. 
If these routers are mounted behind a prefix (e.g. `app.use('/api/v1/auth', authRouter)`), prepend that prefix to the paths above.

## Environment Variables
Create a `.env` file at the project root. Common variables (adjust to your project):
```
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=...

# Auth
JWT_SECRET=...
JWT_EXPIRES_IN=1d
```

## NPM Scripts
- `npm run dev` – start the development server
- `npm run test` – run the test suite
- (Optional) add: `npm run build` and `npm start` for production

Example:
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "test": "jest",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

## Testing
Typical test stack:
- **Jest** as the test runner
- **Supertest** to hit your Express routes

Example (pseudo):
```ts
import request from 'supertest';
import { app } from '@/app';

describe('GET /health', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });
});
```

## Conventions
- Keep each **module** self-contained (routes, controllers, services, validations).
- Validate inputs (e.g., with Zod/Joi) before hitting controllers.
- Use consistent response format:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "OK",
  "data": { }
}
```

## License
MIT
