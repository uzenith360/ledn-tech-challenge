import express, { Router } from 'express';
import reqValidationMiddleware from '../common/middlewares/req-validation.middleware';
import sendTransactionSchema from './schemas/send-transaction.schema';

// Require controller modules.
import * as transactionController from './transaction.controller';

const transactionRouter: Router = express.Router();

/// TRANSACTION ROUTES ///

// POST create send transaction.
transactionRouter.post(
    '/send',
    // passport.authenticate('headerapikey', { session: false/*, failureRedirect: '/api/unauthorized'*/ }),
    reqValidationMiddleware(sendTransactionSchema),
    transactionController.createSendTransaction,
);

// POST create receive transaction.
transactionRouter.post(
    '/receive',
    // passport.authenticate('headerapikey', { session: false/*, failureRedirect: '/api/unauthorized'*/ }),
    reqValidationMiddleware(sendTransactionSchema),
    transactionController.createReceiveTransaction,
);

export default transactionRouter;
