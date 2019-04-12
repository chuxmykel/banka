![Banka Logo](https://i.ibb.co/zJ9ZntW/banka.png)

# Banka
> A light-weight core banking application.

[![Build Status](https://travis-ci.com/chuxmykel/banka.svg?branch=develop)](https://travis-ci.com/chuxmykel/banka)  [![Coverage Status](https://coveralls.io/repos/github/chuxmykel/banka/badge.svg?branch=develop)](https://coveralls.io/github/chuxmykel/banka?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/838e50eb0364e57aebf6/maintainability)](https://codeclimate.com/github/chuxmykel/banka/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/838e50eb0364e57aebf6/test_coverage)](https://codeclimate.com/github/chuxmykel/banka/test_coverage)

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..

## Installing / Getting started

To run this application, you need to have Node.js, and git(to clone the repo) installed. Then follow the instructions to
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


## Features

* User (client) can sign up.
* User (client) can login.
* User (client) can create an account.
* User (client) can view account transaction history.
* User (client) can view a specific account transaction.
* Staff (cashier) can debit user (client) account.
* Staff (cashier) can credit user (client) account.
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific user account.
* Admin can create staff and admin user accounts.
* User can reset password.
* Integrate real time email notification upon credit/debit transaction on user account.
* User can upload a photo to their profile.


## Licensing

Copyright &copy; 2019, Ngwobia, Chukwudi M.
The code in this project is licensed under [ISC LICENSE](https://github.com/chuxmykel/banka/blob/develop/LICENSE)
