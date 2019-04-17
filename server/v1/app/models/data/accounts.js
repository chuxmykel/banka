import moment from 'moment';

const accounts = [
  {
    id: 1,
    accountNumber: 3032548765,
    createdOn: moment().format(),
    owner: 3,
    type: 'savings',
    status: 'active',
    balance: 25675.56,
  },
  {
    id: 2,
    accountNumber: 5823642528,
    createdOn: moment().format(),
    owner: 1,
    type: 'current',
    status: 'active',
    balance: 785722.35,
  },
  {
    id: 3,
    accountNumber: 7456321485,
    createdOn: moment().format(),
    owner: 2,
    type: 'savings',
    status: 'active',
    balance: 3522.28,
  },
  {
    id: 4,
    accountNumber: 6124785432,
    createdOn: moment().format(),
    owner: 4,
    type: 'savings',
    status: 'active',
    balance: 253687.45,
  },
];

export default accounts;
