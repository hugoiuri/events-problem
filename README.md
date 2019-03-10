# Events problem

Este projeto tem como finalidade resolver problemas relacionados a registro e consumo de eventos de navegação dos usuários em um site.


## API

### API Coletora

O objetivo desta API é registrar as informações de eventos de navegação dos usuários de um site.

#### Uso da API de criação de requests

```sh
POST /events HTTP/1.1
Content-Type: application/json
```

```json
{
  "evemt": "string",
  "timestamp": "date-time"
}
```

#### Retorno da API de criação de requests

- 201   Created

```json
{
  "evemt": "string",
  "timestamp": "date-time",
  "_id": "string"
}
```

- 400   Bad Request

### API de autocomplete

Esta API tem como objetivo fornecer um mecanismo para a construção de um autocomplete baseado nas informações dos nomes dos eventos registrados no banco de dados.

#### Uso da API de consulta de requests

```sh
GET /event-names?text=:text HTTP/1.1
Content-Type: application/json
```

```
text=co
```

#### Retorno de consulta de requests

- 200

```json
[
  {
    "name": "comprou"
  },
  {
    "name": "comprou-produto"
  }
]
```



## Configurações

> Lista com todas as configurações possíveis e seus defaults caso existam

- **PORT**: Porta na qual o servidor web ficará disponível (default: 8339);
- **LOG_HEALTH_STATUS**: Informa se deve ou não registrar logs de requisições ao health-status (default: false);
- **LOG_ALL_REQUESTS**: Informa se deve logar todas as requisições ou somente erros (default: false - "somente errors");
- **LOG_LEVEL**: Informa o level de registro de logs [ emerg, alert, crit, error, warning, notice, info, debug ] (default: info);
- **DATABASE_NAME**: Nome do banco de dados;
- **DATABASE_URI**: URI para conexão com o mongodb;

## Stack

Para a criação deste projeto utilizamos as seguintes tecnologias e frameworks:

- [Node.js] - Plataforma de desenvolvimento
- [Express] - Web framework minimalista desenvolvido em node.js
- [Mongodb] - Banco de dados No SQL

## Instalação e execução da aplicação

### Testes

Para executar a stack de testes basta executar o seguinte comando:

```sh
npm i
npm test
```

Para executar somente os testes automatizados deve ser executado:

```sh
npm i
npx mocha
```

> Caso exista algum outro script npm relevante no projeto pode ser adicionado aqui

### Executando local

Para executar o projeto localmente basta executar o seguinte comando:

```sh
npm i
npm start
```

  [Node.js]: <https://nodejs.org>
  [express]: <http://expressjs.com>
  [Mongodb]: <https://www.mongodb.com/>