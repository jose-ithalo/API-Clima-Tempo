# API CLIMA TEMPO -<img src="https://nestjs.com/img/logo-small.svg" margin="90" width="50" alt="Nest Logo" />
> Esta API foi desenvolvida com NestJS, um framework usado para construir aplicações eficientes e escaláveis,   
> com o propósito de fornecer aos usuários do site Clima Tempo todos os dados necessários como também  
> para a realização de funções fundamentais como login, cadastros, exclusão e atualização de informações.

## Tecnologias usadas

<table>
  
  <tr align="center">
    <td><img height="30" width="40" src="https://nestjs.com/img/logo-small.svg" margin="90" width="50" alt="Nest Logo" /></td>
    <td><img height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="ExpressJS" /></td>
    <td><img height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" /></td>
    <td><img height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" /></td>  
  </tr>

  <tr>
      <td>NestJS</td>
      <td>ExpressJS</td>
      <td>TypeScript</td>
      <td>PostgreSQL</td>
  </tr>

  <tr>
    <td>v10.1.11</td>
    <td>v10.0.0</td>
    <td>v5.1.3</td>
    <td>v8.11.3</td>
  </tr>
</table>

## Controladores

### Users
#### `POST` `/users`
>Endpoint para o cadastro de novos usuários.

Recebe no corpo da requisição um objeto JSON com as seguintes informações: username, email e
password.  
Essas informações devem ser inseridas nos respectivos campos como no exemplo abaixo.

```json=
{
  "username": "Nome Usuário",
  "email": "user@email.com",
  "password": "teste"
}
```
+ O id do usuário é gerado automaticamente.
+ A senha deve possuir no mínimo 5 caracteres.
+ Todos os campos são obrigatórios

#### `GET` `/users`
>A função desse endpoint é a de listar todos os usuários cadastrados no sistema.

+ Não recebe informações no corpo da requisição.
  
#### `GET` `/users/user`
>Já neste, retorna os dados do usuário que está logado.

+ Não recebe informações no corpo da requisição.

#### `GET` `/users/cities`
>Endpoint utilizado para obter a lista de cidades escolhidas do usuário logado.

+ Não recebe informações no corpo da requisição.

#### `PATCH` `/users/cities`
>Com esse endpoint é possível adicionar novas cidades à lista do usuário.

Para adição de uma nova cidade o campo city deve ser preenchido com o nome dela e o próprio  
sistema adicionará esso novo dado na lista de cidades do respectivo usuário.

```json=
{
  "city": "São Paulo"
}
```

+ Não será aceito uma cidade que já exista na lista daquele usuário.

#### `PATCH` `/users/detach`
>Aqui o usuário poderá deixar como destaque uma cidade de sua lista na Dashboard do site.

Igualmente ao exemplo a cima, o campo city deve ser preenchido mas com uma das cidades já  
existentes na lista.

```json=
{
  "city": "Londrina"
}
```
#### `PATCH` `/users/reset`
>Aqui temos o endpoint para resetar a senha do usuário caso ele esqueça.

Recebe a chave (key) e a senha (password), que será a nova, através de um objeto JSON no corpo  
da requisição como no exemplo abaixo.

```json=
{
  "key": "a1a1a1",
  "password": "teste"
}
```

+ Ambos os campos são obrigatórios
+ O valor do campo key deve ser o mesmo da coluna reset_key do usuário
