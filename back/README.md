<div  align="center">
  <img src="../.github/image.png" width="50%" style="border-radius: 30px;"/>
</div>

<h1 align="center"> 🚀️Hybrium Challenge</h1>

<div  align="center">
  <img src="https://img.shields.io/badge/running-yes-green" />
</div>


<br/>

* [Sobre](#%EF%B8%8F-sobre)
* [Instalação](#%EF%B8%8F-instalação)
* [Como usar e rotas](#%EF%B8%8F-como-usar-e-rotas)
* [Pre Requisitos](#%EF%B8%8F-pre-requisitos)
* [Tecnologias](#%EF%B8%8F-tecnologias)
* [Status](#%EF%B8%8F-status)
* [Autor](#%EF%B8%8F-autor)

<br/>

## 🚀️ Sobre
  Aplicação back-end, front-end e mobile para marcar o horário de entrada e saída do colaborador, aplicação ultilizada na etapa da vaga de emprego para testar o conhecimento.

  <br/>

## 🚀️ Instalação
  
  [Click aqui]()

  <br/>

## 🚀️ Como usar e Rotas

  ```
    Instale as dependências
    yarn install
      ou
    npm install

    configure um banco Postgres, crie um arquivo .env e insira o codigo abaixo.
    
    DB_USER = usuario_do_banco
    DB_PASSWORD = senha_do_banco
    DB_HOST = host_do_banco
    DB_PORT = porta_do_banco
    DB_NAME = node_do_banco


    Rode as migrações
    yarn sequelize db:migrate
      ou
    npm run sequelize db:migrate

    Execute o server
    yarn start
      ou
    npm start
    
    Rotas

      Criar um novo colaborador
        http://localhost:3333/user
        METHOD: POST
        JSON: {
          name: STRING,
          cpf: NUMBER,
          email: STRING/EMAIL,
          number: NUMBER,
          ocupation: STRING,
          photo: OPCIONAL/BASE64,
          defaultTimeInExpedient: STRING/TIME, "00:00"
          defaultTimeInLunch: STRING/TIME, "00:00"
          defaultTimeOutExpedient: STRING/TIME, "00:00"
          defaultTimeOutLunch: STRING/TIME "00:00"
        }

      Listar os colaboradores ativos
        http://localhost:3333/user
        METHOD: GET
        JSON DE RETORNO: {
          id: STRING,
          photo: STRING || NULL,
          name: STRING
        }

      Mostrar detalhes de um colaborador
        http://localhost:3333/user/details?id=ID_DO_USUARIO
        METHOD: GET
        JSON DE RETORNO: {
          name: STRING,
          cpf: NUMBER,
          email: STRING/EMAIL,
          number: NUMBER,
          ocupation: STRING,
          photo: OPCIONAL/BASE64,
          defaultTimeInExpedient: STRING/TIME,
          defaultTimeInLunch: STRING/TIME,
          defaultTimeOutExpedient: STRING/TIME,
          defaultTimeOutLunch: STRING/TIME, 
          times: {
            id: NUMBER,
            day: DATE,
            timeInExpedient: STRING/TIME,
            timeOutExpedient: STRING/TIME || NULL,
            timeInLunch: STRING/TIME || NULL,
            timeOutLunch: STRING/TIME || NULL
          }
        }

      Fazer login (colaboradores)
        http://localhost:3333/login
        METHOD: GET
        Basic auth
        {
          username: EMAIL,
          password: PASSWORD
        }
        JSON DE RETORNO: {
          token: TOKEN,
          id: STRING
        }
        
      Criar um horário para um colaborador
        http://localhost:3333/times/create
        METHOD: POST
        BAERER TOKEN (Token recebido ao fazer login)
        JSON: {
          timeValue: STRING/TIME "00:00"
        }
        

      Inserir horários em um horário já criado*
        http://localhost:3333/times/update
        METHOD: POST
        BAERER TOKEN (Token recebido ao fazer login)
        JSON: {
          timeId: NUMBER
          timeValue: STRING/TIME "00:00"
        }

        *metodo de atualização é feito em cascata, inserindo em sequencia a entrada para almoço, saída para almoço e saída do expediente.

  ```

  <br/>

## 🚀️ Pre-requisitos

  * [NodeJs 14.15.4](https://nodejs.org/en)
  * [Yarn 1.22.10 (opcional)](https://yarnpkg.com/)
  * [Git 2.27](https://git-scm.com/)

  <br/>

## 🚀️ Tecnologias

  * [NodeJs](https://nodejs.org/en)
  * [Typescript](https://www.typescriptlang.org/)
  * [Sequelize](https://sequelize.org/master/)
  * [Jest](https://jestjs.io/)
  * [Cloudinary](https://cloudinary.com/)
  * [NodeMailer](https://nodemailer.com/about/)

  <br/>


## 🚀️ Status
  ✅️ Funcional ✅️

  <br/>

## 🚀️ Autor

Alisson Silva

<div style="display: flex">
  <div style="margin-right:10px">
  <a href="https://www.linkedin.com/in/alisson123123/"><img src="https://img.shields.io/twitter/url?label=Alisson%20Silva&logo=Linkedin&style=social&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Falisson123123%2F"/></a> 
  </div>
  <div style="margin-right:10px">
    <a href="https://www.instagram.com/4liss0n.s1lv4/">
      <img src="https://img.shields.io/twitter/url?label=Alisson%20Silva&logo=Instagram&style=social&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Falisson123123%2F"/>
    </a>
  </div>
  <div style="margin-right:10px">
    <a href="https://api.whatsapp.com/send/?phone=5575982768373">
      <img src="https://img.shields.io/twitter/url?label=Alisson%20Silva&logo=Whatsapp&style=social&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Falisson123123%2F"/>
    </a>
  </div>
</div>

<!-- 🚀️🚧️ -->