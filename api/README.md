# Realtime Text API

## Installation

Install dependencies with NPM:
```bash
npm install
```

You'll also want a MongoDB server running. You can start one with the
docker-compose-file provided in the parent directory of the API:
```bash
cd ..
docker-compose up -d
```

## Start the API

The API can be started using the `dev` script:
```bash
npm run dev
```

## Route structure

The routes are structured in a fashion similar to REST. Authentication and
documents are split into separate base paths, followed by the action and an
optional ID. Documents are not prefixed with the user path to simplify route
structure and since e.g. the user ID is not actually required to retrieve a
document.

```
POST /auth/register - Create a new user
POST /auth/login    - Sign in and set an authentication cookie
POST /auth/logout   - Sign out and remove the authentication cookie
GET /auth/me        - Retrieve the currently authenticated user

GET /documents        - Retrieve all documents belonging to the authenticated user
GET /documents/:id    - Retrieve a document belonging to the authenticated user
POST /documents       - Create a document belonging to the authenticated user
PATCH /documents/:id  - Update a document belonging to the authenticated user
DELETE /documents/:id - Delete a document belonging to the authenticated user
```
