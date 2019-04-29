import express from 'express';
import TransactionController from '../controllers/transactionController';
import InputValidator from '../middlewares/inputValidator';
import AuthenticateUser from '../middlewares/authenticateUser';
import ParamValidator from '../middlewares/paramValidator';

const transactionRoutes = express.Router();

transactionRoutes.post('/:accountNumber/credit',
  ParamValidator.validateAccNumber,
  InputValidator.validateAmount,
  AuthenticateUser.verifyCashier,
  TransactionController.creditAccount);

transactionRoutes.post('/:accountNumber/debit',
  ParamValidator.validateAccNumber,
  InputValidator.validateAmount,
  AuthenticateUser.verifyCashier,
  TransactionController.debitAccount);

transactionRoutes.get('/:id',
  ParamValidator.validateIdParams,
  AuthenticateUser.verifyUser,
  TransactionController.getOne);

export default transactionRoutes;
