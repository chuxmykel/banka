![Banka Logo](https://i.ibb.co/zJ9ZntW/banka.png)

# Banka
> A light-weight core banking application.

[![Build Status](https://travis-ci.com/chuxmykel/banka.svg?branch=develop)](https://travis-ci.com/chuxmykel/banka)  [![Coverage Status](https://coveralls.io/repos/github/chuxmykel/banka/badge.svg?branch=develop)](https://coveralls.io/github/chuxmykel/banka?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/838e50eb0364e57aebf6/maintainability)](https://codeclimate.com/github/chuxmykel/banka/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/838e50eb0364e57aebf6/test_coverage)](https://codeclimate.com/github/chuxmykel/banka/test_coverage)

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..

* [Technologies](#technologies)
* [API Endpoints](#api-endpoints)
* [Features](#features)
* [Getting Started](#getting-started)
  * [Installation](#installing)
  * [Developing](#developing)
  * [Licensing](#licensing)


### Pivotal Tracker
Pivotal Tracker was used in managing this project and you can find all the stories by clicking the link below
[https://www.pivotaltracker.com/n/projects/2320369](https://www.pivotaltracker.com/n/projects/2320369)

### UI Template
UI templates is hosted at [https://chuxmykel.github.io/banka/UI/index.html](https://chuxmykel.github.io/banka/UI/index.html)

## Technologies
---
- [NodeJs](https://https://nodejs.org) - Runtime Environment
- [Express](https://expressjs.com) - Web Application Framework

### Supporting Packages
#### Linter
- [ESlint](https://eslint.org) - Linter Tool
#### Compiler
- [Babel](https://babeljs.io) - Compiler for Next Generation Javascript
#### Test Tools
- [Mocha](https://mochajs.org) - JavaScript Test Framework for+ API Tests
- [Chai](https://chaijs.com) - TDD/BDD Assertion Library


## API Endpoints   
#### Documentation
Visit [https://a-bank.herokuapp.com/api/v1/docs](https://a-bank.herokuapp.com/api/v1/docs) to view API Documentation

## Features

* [User (client) can sign up](https://a-bank.herokuapps.com/api/v1/auth/signup)
* [User (client) can login](https://a-bank.herokuapps.com/api/v1/auth/signin)
* [User (client) can create an account](https://a-bank.herokuapps.com/api/v1/accounts)
* [Staff (cashier) can debit user (client) account](https://a-bank.herokuapps.com/api/v1/transactions/1234567890/debit)
* [Staff (cashier) can credit user (client) account](https://a-bank.herokuapps.com/api/v1/transactions/1234567890/credit)
* [Admin/staff can activate or deactivate an account](https://a-bank.herokuapps.com/api/v1/accounts/1234567890)
* [Admin/staff can delete a specific user account](https://a-bank.herokuapps.com/api/v1/accounts/1234567890)
* [Integrate real time email notification upon credit/debit transaction on user account](https://a-bank.herokuapps.com/api/v1/transactions/1234567890/credit)

## Getting Started
---
### Installing

To run this application, you need to have Node.js, and git(to clone the repo) installed. Then follow the instructions to get
it up and running

- clone the repo using 
```shell
~> git clone https://github.com/chuxmykel/banka.git
```
- run ``` npm install --prod``` to install dependencies
- create a .env file from the .env.example file and fill in the necessary environment variables
- run ``` npm run build ``` to build the project and then run ``` npm start ``` to start the server
- now access the server on the localhost port 5000 i.e ``` localhost:5000 or 127.0.0.1:5000 ```

Now the server will go live and listen for requests

## Developing

To develop the app further, a few handy tools have been put in place such as nodemon and some other dev dependencies.
Access them by starting the server using ```npm run dev```. But before using the command, make sure to follow the steps below

```shell
git clone https://github.com/chuxmykel/banka.git
cd banka/
npm install
npm run dev
```

### Building

The app is written in ES6+ and wired to run ES5 transpiled code in production. To transpile any changes to ES5 run the script shown below

```shell
npm run build
```

Babel then transpiles your ES6+ files to ES5 for environment compatibility

## Licensing

Copyright &copy; 2019, Ngwobia, Chukwudi M.
The code in this project is licensed under [ISC LICENSE](https://github.com/chuxmykel/banka/blob/develop/LICENSE)
