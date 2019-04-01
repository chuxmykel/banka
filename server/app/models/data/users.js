import Auth from '../../auth/auth';

const users = [
  {
    id: 1,
    firstName: 'Chukwudi',
    lastName: 'Michael',
    email: 'chukwudi.m@gmail.com',
    password: Auth.hashPassword('password'),
    type: 'staff',
    isAdmin: true,
  },
  {
    id: 2,
    firstName: 'Kenneth',
    lastName: 'Godwin',
    email: 'kenny_g@gmail.com',
    password: Auth.hashPassword('password'),
    type: 'staff',
    isAdmin: false,
  },
  {
    id: 3,
    firstName: 'Kelechi',
    lastName: 'Ngwobia',
    email: 'kcmykairl@gmail.com',
    password: Auth.hashPassword('password'),
    type: 'client',
  },
];

export default users;
