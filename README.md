# Ponto Ilumeo API
Esse case/teste faz parte do processo de recrutamento da empresa Ilumeo.

<p>
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg">
</p>

<br>

## Requerimentos

- [Node.js v16](https://nodejs.org/en/)
- [Docker v23](https://www.docker.com/)

## Instalação Ambiente Dev

ATENÇÃO! RENOMEAR ARQUIVO .env.example PARA .env'

```bash
# docker postgres
$ npm run docker:db

#ATENÇÃO! RENOMEAR ARQUIVO .env.example PARA .env'

# prisma orm
$ npx prisma migrate dev

# instalação
$ npm install
```

## Testes

```bash
$ npm test
```

## Execução Ambiente Dev

```bash
$ npm run dev
```

## Produção

```bash
# build e deploy
$ npm run deploy

# start
$ npm start
```

## :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.

---

Feito por Renan Lisboa :wave:
