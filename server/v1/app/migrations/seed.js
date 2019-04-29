import moment from 'moment';
import query from './index';
import Auth from '../auth/auth';

const queryString = `
  INSERT INTO users ("firstName", "lastName", email, password, type, "isAdmin") 
  VALUES ('Chukwudi', 'Ngwobia', 'ngwobiachukwudi@gmail.com', '${Auth.hashPassword('password')}', 'staff', true),
         ('Kenneth', 'Godwin', 'kenny_g@gmail.com', '${Auth.hashPassword('password')}', 'staff', false);
         
  INSERT INTO users ("firstName", "lastName", email, password) 
  VALUES ('Kenneth', 'Godwin', 'tedykeny@gmail.com', '${Auth.hashPassword('password')}'),
         ('Ikechukwu', 'Ngwobia', 'doniyke44@gmail.com', '${Auth.hashPassword('password')}'),
         ('Kelechi', 'Ngwobia', 'kcmykairl@gmail.com', '${Auth.hashPassword('password')}'),
         ('Chisom', 'Peperenpe', 'peperenpe@gmail.com', '${Auth.hashPassword('password')}'),
         ('Victor', 'Godwin', 'vog@gmail.com', '${Auth.hashPassword('password')}');
         
  INSERT INTO accounts("accountNumber", "createdOn", owner, type, status, balance) 
  VALUES(1758964523, '${moment(new Date())}', 3, 'savings', 'active', 800000.58),
        (7596841530, '${moment(new Date())}', 7, 'current', 'active', 50000.56),
        (3254125869, '${moment(new Date())}', 5, 'current', 'dormant', 25000.25),
        (5428745632, '${moment(new Date())}', 3, 'savings', 'dormant', 27852.09),
        (8745521633, '${moment(new Date())}', 6, 'current', 'active', 5387.74),
        (5823642528, '${moment(new Date())}', 4, 'savings', 'active', 320087.98);
        
  INSERT INTO transactions("createdOn", type, "accountNumber", cashier, amount, "oldBalance", "newBalance")
  VALUES('${moment(new Date())}', 'credit', 8745521633, 2, 25000.00, 800000.58, 825000.4),
        ('${moment(new Date())}', 'credit', 1758964523, 2, 300000.00, 258750.22, 558750.22),
        ('${moment(new Date())}', 'credit', 5823642528, 2, 0.50, 25080.58, 25081.08),
        ('${moment(new Date())}', 'credit', 8745521633, 2, 33000.00, 1000.18, 34000.18),
        ('${moment(new Date())}', 'debit', 5428745632, 2, 2500.00, 400000.35, 397500.35),
        ('${moment(new Date())}', 'debit', 7596841530, 2, 35200.00, 100000.02, 64800.02),
        ('${moment(new Date())}', 'credit', 3254125869, 2, 48500.00, 20000.75, 68500.75),
        ('${moment(new Date())}', 'credit', 5823642528, 2, 32300.00, 260358.32, 292658.32),
        ('${moment(new Date())}', 'debit', 5428745632, 2, 78900.00, 300000.88, 221100.88),
        ('${moment(new Date())}', 'credit', 1758964523, 2, 23600.00, 97350.00, 120950.00),
        ('${moment(new Date())}', 'debit', 3254125869, 2, 38700.00, 80032.33, 41332.33),
        ('${moment(new Date())}', 'credit', 7596841530, 2, 99850.00, 1200000.58, 1299850.58);
`;

query(queryString);
