import express, { Router } from 'express';
import passport from 'passport';
import reqValidationMiddleware from '../common/middlewares/req-validation.middleware';
import getAccountSchema from './schemas/get-account.schema';

// Require controller modules.
import * as accountController from './account.controller';

const accountRouter: Router = express.Router();

/// ACCOUNT ROUTES ///

// GET fetch account.
accountRouter.get(
    '/',
    passport.authenticate('headerapikey', { session: false }),
    reqValidationMiddleware(getAccountSchema),
    accountController.getAccount,
);

export default accountRouter;
