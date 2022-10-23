import express, { Router, Request, Response } from 'express';
import passport from 'passport';
import sendTransactionSchema from '../../data/datasources/mongoose/transaction/schemas/send-transaction.schema';
import reqValidationMiddleware from '../../common/middlewares/req-validation.middleware';

// Require controller modules.
import TransactionController from './transaction.controller';

export default <T>(transactionController: TransactionController<T>): Router => {
    const transactionRouter: Router = express.Router();

    /// TRANSACTION ROUTES ///

    // POST create send transaction.
    transactionRouter.post(
        '/send',
        passport.authenticate('headerapikey', { session: false }),
        reqValidationMiddleware(sendTransactionSchema),
        (req: Request, res: Response) => transactionController.createSendTransaction(req, res),
    );

    // POST create receive transaction.
    transactionRouter.post(
        '/receive',
        passport.authenticate('headerapikey', { session: false }),
        reqValidationMiddleware(sendTransactionSchema),
        (req: Request, res: Response) => transactionController.createReceiveTransaction(req, res),
    );

    return transactionRouter;
}
