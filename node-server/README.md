## Requirements

NodeJS 22.12.0

## Setup

Install dependencies

- `npm i`

Run the seed file to populate an organization with journal entries

- `npx ts-node prisma/seed.ts`

## Running the app

- `npm run dev`

## About

Backend for an example accounting application.

Technology:

- Express: standard web application framework for NodeJS
- TS Rest: strongly typed REST API compatible with OpenAPI and React Query
- Prisma: database ORM for defining a DB schema, running migrations, and querying data
- Sqlite: light-weight relational database

## TODOs

- Dev server w/ reload + production build
- Prettier + lint + TS check scripts
- Test DB
- Semantic id prefix
