# 📚 Larn API em TypeScript

API RESTful desenvolvida em **TypeScript** com o framework **Express**, com foco em aprendizado de conceitos modernos de back-end como arquitetura em camadas, autenticação com JWT, variáveis de ambiente, e organização de código em rotas, controllers e services.


## 🚀 Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)


## 🧱 Estrutura de Pastas
    
    ├── src
    │   ├── controllers
    │   ├── middlewares
    │   ├── routes
    │   ├── services
    │   ├── utils
    │   └── server.ts
    ├── .env
    ├── package.json
    ├── tsconfig.json
    └── README.md


## ⚙️ Instalação e Execução
1. Clone o repositório:
    ```
    git clone https://github.com/Arielson13/larn-api-in-typescript.git
    cd larn-api-in-typescript

2. Instale as dependências:
    ```
    npm install

3. Crie um arquivo `.env` com o seguinte conteúdo:
    ```
    JWT_SECRET=suachavesecreta
    JWT_EXPIRES=3600

4. Execute a aplicação:
    ```
    npm run dev

## 🔐 Autenticação
A API utiliza JWT para autenticação. Após o login com um usuário válido, um token é gerado e deve ser enviado no header das requisições protegidas:

    Authorization: Bearer <seu_token>


## 📌 Endpoints Principais
|Método |	Rota  |	Descrição|
|-------|---------|----------|
|POST	|/login	  |Autentica usuário e retorna token|
|GET	|/usuarios|	Lista usuários (exemplo)|
|POST	|/usuarios|	Cria novo usuário|


## ✅ Objetivo do Projeto
Este projeto tem fins educacionais e foi criado para praticar os conceitos fundamentais do desenvolvimento de APIs com TypeScript, Express e JWT.

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/Arielson13/larn-api-in-typescript/blob/main/LICENSE) para mais detalhes.

## 👨‍💻 Autor
Desenvolvido por *Arielson Sousa Duarte*
