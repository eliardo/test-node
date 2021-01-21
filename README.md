
## Project setup and run

```

docker-compose up --build

```

O serviço irá criar o database postgress e estará disponível na porta 3000

### Descrição
Serviço responsável por gcriar e atualizar usuários, salvando usuários em banco de dados PostgreSQL. A atualização de usuários é protegida por Authorization Bearer token, a obtenção do token JWT é feita atráves da API login.

Senhas de usuários são salvos criptografadas usando bcrypt na geração do hash.

**Funcionalidades**
* Realiza a criação de uma usuário;<br />
* Realiza login;<br />
* Realiza update de dados do usuário;<br />


## Usuários

Tabela Users

    | Campos       | Tipo     | 
    | ---          | ---      | 
    | id           | Numérico | 
    | user         | String   | 
    | name         | String   | 
    | status       | String   | 
    | password     | String   | 



### Criar usuário
```
POST /api/v1/users

{
    "user": "eliardo",
    "status": "active",
    "name": "name",
    "password": "minhasenha"
}


```

**Response**
```
{
    "id": 1,
    "user": "eliardo",
    "name": "name",
    "status": "active",
    "password": "minhasenha"
}
```

### Login - obtençao de token
```

GET /api/v1/login?user=eliardo&pwd=minhasenha

```


**Response**
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImVsaWFyZG8iLCJuYW1lIjoibmFtZSIsImlhdCI6MTYxMTExMjU1NSwiZXhwIjoxNjExMTE2MTU1fQ.La8eRMx2NmCH3yaxHxqXjxzoyOwZQ5jMRlldwYgvZag"
}
```

### Alterar usuário
```

PATH /api/v1/users/{userId}
Authorization Bearer token

Body:
{
    "user": "eliardo_001",
    "status": "bloqueado"
}

```
Token da auhorization obtido em /login

**Response**
```
{
    "id": 1,
    "user": "eliardo_001",
    "name": "name",
    "status": "bloqueado",
    "password": "minhasenha"
}
```

