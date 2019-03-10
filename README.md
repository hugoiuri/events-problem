# Events problem

Este projeto tem como finalidade resolver problemas relacionados a registro e consumo de eventos de navegação dos usuários em um site.


## API

### API Coletora

O objetivo desta API é registrar as informações de eventos de navegação dos usuários de um site.

#### Uso da API Coletora

```sh
POST /events HTTP/1.1
Content-Type: application/json
```

```json
{
  "evemt": "buy",
  "timestamp": "2016-09-22T13:57:31.2311892-04:00"
}
```

#### Retorno da API Coletora

- 201   Created

```json
{
  "evemt": "buy",
  "timestamp": "2016-09-22T13:57:31.2311892-04:00",
  "_id": "5c8581f76486797cecdd030e"
}
```

- 400   Bad Request

### API de autocomplete

Esta API tem como objetivo fornecer um mecanismo para a construção de um autocomplete baseado nas informações dos nomes dos eventos registrados no banco de dados.

#### Uso da API de autocomplete

```sh
GET /event-names?text=:text HTTP/1.1
Content-Type: application/json
```

#### Retorno de autocomplete

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

### API timeline

Esta API tem como objetivo fornecer um mecanismo de compilação dos eventos em uma linha do tempo ordenada, agrupando as compras e os itens comprados

#### Uso da API timeline

```sh
GET /timeline HTTP/1.1
Content-Type: application/json
```

#### Retorno timeline

- 200

```json
{
  "timeline": [
    {
      "timestamp": "2016-10-02T11:37:31.2300892-03:00",
      "revenue": 120.0,
      "transaction_id": "3409340",
      "store_name": "BH Shopping",
      "products": [
        {
          "name": "Tenis Preto",
          "price": 120
        }
      ]
    }
  ]
}
```

- 500

## Configurações

- **PORT**: Porta na qual o servidor web ficará disponível (default: 8339);
- **LOG_HEALTH_STATUS**: Informa se deve ou não registrar logs de requisições ao health-status (default: false);
- **LOG_ALL_REQUESTS**: Informa se deve logar todas as requisições ou somente erros (default: false - "somente errors");
- **LOG_LEVEL**: Informa o level de registro de logs [ emerg, alert, crit, error, warning, notice, info, debug ] (default: info);
- **DATABASE_NAME**: Nome do banco de dados;
- **DATABASE_URI**: URI para conexão com o mongodb;
- **EXTERNAL_API_BASE_URL**: Url base para a api externa de eventos;
- **EXTERNAL_API_EVENTS_PATH**: Caminho para o recurso de eventos da API.

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

Para executar o projeto localmente basta ajustar as configurações no arquivo /config.config.js e executar o seguinte comando:

```sh
npm i
npm start
```

  [Node.js]: <https://nodejs.org>
  [express]: <http://expressjs.com>
  [Mongodb]: <https://www.mongodb.com/>