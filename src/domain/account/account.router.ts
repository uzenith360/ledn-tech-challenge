import express, { Router, Request, Response } from 'express';
import passport from 'passport';
import reqValidationMiddleware from '../../common/middlewares/req-validation.middleware';
import getAccountSchema from '../../data/datasources/mongoose/account/schemas/get-account.schema';

// Require controller modules.
import AccountController from './account.controller';

export default (accountController: AccountController): Router => {
    const accountRouter: Router = express.Router();

    /// ACCOUNT ROUTES ///

    // GET fetch account.
    accountRouter.get(
        '/',
        passport.authenticate('headerapikey', { session: false }),
        reqValidationMiddleware(getAccountSchema),
        (req: Request, res: Response) => accountController.getAccount(req, res),
    );

    return accountRouter;
}