# Desafio NodeJS

## Sobre
API desenvolvida como desafio de código com NodeJS. A API foi construida utilizando o micro framework express, com arquitetura baseada/similar a DDD.

### Pré-requisitos

```
  NodeJS >= 14.x.x
  yarn
  Postgres
```
### Instalação

Clone o projeto no diretório onde o mesmo será executado, instale as dependencias utilizando o yarn e rode as migrations.

#### Exemplo
```
git clone https://github.com/gtkpad/projeto-node.git
cd projeto-node
yarn
yarn typeorm migration:run
```
### banco de dados

#### Credenciais

| Usuário     | Senha    |
| ----------  |--------  |
| email       | project  |
| password    | project  |

#### Extra:
Caso queira rodar o banco de dados em um container usando docker segue o comando com as credenciais definidas

```
docker run -d --name project-postgresql -e POSTGRESQL_PASSWORD=project -e POSTGRESQL_USERNAME=postgres -e POSTGRES_DATABASE=project -p 5432:5432 bitnami/postgresql:latest
```

### Execução

```
yarn dev
```

### Rotas

As rotas foram documentadas usando swagger, para acessar a documentação basta rotar o projeto e acessar no browser <http://localhost:3333/api-docs>.
##### URL Base: http://localhost:3333

---

### [GET] /users
 Retorna todos usuários cadastrados
####  Resposta Array<User>

#### User

| Chave       | Tipo    |
| ----------  |-------- |
| id          | string  |
| email       | string  |
| created_at  | string  |
| updates_at  | string  |
---
### [POST] /users
 Cadastra um novo usuário, os dados devem ser passados no corpo da requisição

#### Corpo da Requisição
| Chave       | Tipo    |
| ----------  |-------- |
| email       | string  |
| password    | string  |

#### Status Code:

| Status Code       | Significado         |
| ----------------- | ------------------- |
| 201         | Usuário Criado            |
| 400         | Email informado já existe |


---

### [GET] /users/{id}/email
 Exibe email de um usuário buscando pelo id, o id deve ser informado no parâmetro da URL

#### Parâmetros da URL
| Chave       | Tipo    |
| ----------  |-------- |
| id          | string  |

#### Status Code:

| Status Code       | Significado      |
| ----------------- | ---------------- |
| 200         | OK                     |
| 404         | Usuário não encontrado |

#### Corpo da Resposta
| Chave       | Tipo    |
| ----------  |-------- |
| email       | string  |
---
### [PATCH] /users/{id}/password
 Altera a senha de um determinado usuário pelo id, o id deve ser informado como parâmetro na url. a senha atual e a nova senha devem ser informadas no corpo da requisição


#### Parâmetros da URL
| Chave       | Tipo    |
| ----------  |-------- |
| id          | string  |

#### Corpo da requisição
| Chave       | Tipo    |
| ----------  |-------- |
| password    | string  |
| newPassword | string  |

#### Status Code:

| Status Code       | Significado  |
| ----------------- | ------------ |
| 204    | Senha Alterada          |
| 400    | Usuário não encontrado  |
| 401    | Senha incorreta         |

### [POST] /users/authenticate
 Verifica as credenciais de um usuário, as credenciais devem ser passadas no corpo da requisição

#### Corpo da requisição
| Chave       | Tipo    |
| ----------  |-------- |
| email       | string  |
| password    | string  |

#### Status Code:

| Status Code       | Significado  |
| ----------------- | ------------ |
| 200    | Credenciais corretas    |
| 401    | Credenciais incorretas  |

---
---
