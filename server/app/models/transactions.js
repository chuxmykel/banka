const transactions = [
  {
    id: 1,
    createdOn: new Date(),
    type: 'credit',
    accountNumber: 3032548765,
    cashier: 2,
    amount: 30000.00,
    oldBalance: 3522.56,
    newBalance: 33522.56,
  },
  {
    id: 2,
    createdOn: new Date(),
    type: 'debit',
    accountNumber: 3032548765,
    cashier: 2,
    amount: 4000.00,
    oldBalance: 25300.33,
    newBalance: 21300.33,
  },
  {
    id: 3,
    createdOn: new Date(),
    type: 'credit',
    accountNumber: 7456321485,
    cashier: 2,
    amount: 300000.00,
    oldBalance: 255000.86,
    newBalance: 33522.56,
  },
];

export default transactions;
