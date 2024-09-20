# TEST BRAIN AGRICULTURE - ANDERSON GIMINO

## Pré-requisitos

Para rodar a aplicação localmente, é necessário ter as seguintes ferramentas instaladas:

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/) (versão recomendada: 16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

## Passos para rodar o projeto

### 1. Inicializar o Banco de Dados

Na raiz do projeto, rode o comando abaixo para inicializar o banco de dados via Docker:

```bash
docker compose up -d

## Configurar Variáveis de Ambiente

Copie o arquivo .env.example para criar o arquivo .env:

$ cp .env.example .env


## Project setup

```bash
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
