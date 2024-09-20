# TEST BRAIN AGRICULTURE - ANDERSON GIMINO

## Prerequisites

To run the application locally, you must have the following tools installed:

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/) (Recommended version: 16 or higher)
- [npm](https://www.npmjs.com/) (Node.js package manager)

## Steps to run the project

### 1. Initialize the Database

At the root of the project, run the command below to initialize the database via Docker:

```bash
docker compose up -d

## Configure Environment Variables

Copy the .env.example file to create the .env file:

$ cp .env.example .env


## Project setup

$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
