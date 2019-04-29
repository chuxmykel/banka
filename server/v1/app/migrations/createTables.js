import query from './index';

const queryString = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(130) UNIQUE NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL,
    type VARCHAR(6) DEFAULT 'client',
    "isAdmin" BOOLEAN DEFAULT NULL
  );

  CREATE TABLE IF NOT EXISTS accounts(
    id SERIAL PRIMARY KEY,
    "accountNumber" BIGINT UNIQUE NOT NULL,
    "createdOn" TIMESTAMP NOT NULL,
    owner INTEGER REFERENCES users(id),
    type VARCHAR(7) NOT NULL,
    status VARCHAR(7) DEFAULT 'draft',
    balance NUMERIC(200, 2) DEFAULT 0.00 CONSTRAINT positive_balance CHECK (balance > -1)
  );

  CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    "createdOn" TIMESTAMP NOT NULL,
    type VARCHAR(6) NOT NULL,
    "accountNumber" BIGINT REFERENCES accounts("accountNumber") ON DELETE CASCADE,
    cashier INTEGER REFERENCES users(id),
    amount NUMERIC(200, 2) NOT NULL,
    "oldBalance" NUMERIC(200, 2) NOT NULL,
    "newBalance" NUMERIC(200, 2) NOT NULL CHECK ("newBalance" > -1)
  );  
`;

query(queryString);
