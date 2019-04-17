import moment from 'moment';

const transactions = [
  {
    id: 1,
    createdOn: moment().format(),
    type: 'credit',
    accountNumber: 3032548765,
    cashier: 2,
    amount: 30000.00,
    oldBalance: 3522.56,
    newBalance: 33522.56,
  },
  {
    id: 2,
    createdOn: moment().format(),
    type: 'debit',
    accountNumber: 3032548765,
    cashier: 2,
    amount: 4000.00,
    oldBalance: 33522.56,
    newBalance: 37522.56,
  },
  {
    id: 3,
    createdOn: moment().format(),
    type: 'credit',
    accountNumber: 7456321485,
    cashier: 2,
    amount: 300000.00,
    oldBalance: 255000.86,
    newBalance: 555000.86,
  },
];

export default transactions;
