/**
 * Required External Modules
 */
import express, { Express } from "express";
import { env } from 'process';
import cors from "cors";
import helmet from "helmet";
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import passport from 'passport';

import errorHandler from "./common/middlewares/error.middleware";
import notFoundHandler from "./common/middlewares/not-found.middleware";
import defaultHandler from "./common/middlewares/default.middleware";
import getApiSecretMiddleware from "./common/middlewares/get-api-secret.middleware";
import transactionRouter from "./transaction/transaction.router";
import MongooseDBConnection from "./common/helpers/mongoose-db-connection";
import dbSeeder from "./common/helpers/db-seeder";
import TransactionModel from "./transaction/models/transaction.model";
import AccountModel from "./account/models/account.model";
import Account from "./account/interfaces/account.interface";
import Transaction from "./transaction/interfaces/transaction.interface";
import accountRouter from "./account/account.router";
import trimAndLowercase from "./common/helpers/trim-and-lowercase";
import TransactionDocument from "./transaction/interfaces/transaction-document.interface";
import AccountDocument from "./account/interfaces/account-document.inteface";

/**
* App Variables
*/
if (
    ![
        'PORT',
        'API_KEY',
        'SEED_DATABASE',
        'MONGODB_CONNECTION_STRING',
    ].every((envVar: string) => !!env[envVar])
) {
    console.error('Env configuration not found, be sure you renamed and used the .env-example file');

    process.exit(1);
}

const SEED_DATABASE: boolean = env.SEED_DATABASE === 'true';
const PORT: number = parseInt(env.PORT as string, 10) || 8081;
const MONGO_URL: string = env.MONGODB_CONNECTION_STRING as string;

(async () => {
    const app: Express = express();

    /**
     *  App Configuration
     */
    app.use(helmet());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(passport.initialize());

    /**
     * Basic API KEY auth, pass an X-API-KEY header, API_KEY is in .env-example
     */
    passport.use(
        new HeaderAPIKeyStrategy(
            {
                header: 'X-API-KEY',
                prefix: '',
            },
            false,
            getApiSecretMiddleware,
        ),
    );

    app.use("/api/transaction", transactionRouter);
    app.use("/api/account", accountRouter);

    app.use("/", defaultHandler);

    app.use(errorHandler);
    app.use(notFoundHandler);

    try {
        // We're using MongoDB
        /**
         * Mongoose connection
         */
        await MongooseDBConnection.getInstance(MONGO_URL).getConnection();

        console.log('DB connected');

        if (SEED_DATABASE) {
            console.log('Seeding database...');
            console.log(`You can turn this off via the 'SEED_DATABASE' env variable`);

            /// seed database 
            await Promise.allSettled(
                [
                    // Pass database dependency into this fn
                    // transaction model
                    dbSeeder<TransactionDocument, Transaction>(
                        TransactionModel,
                        './instructions/transactions-api.json',
                        (transaction: Transaction) => ({ ...transaction, userEmail: trimAndLowercase(transaction.userEmail) }),
                    ),
                    // account model
                    dbSeeder<AccountDocument, Account>(
                        AccountModel,
                        './instructions/accounts-api.json',
                        (account: Account) => ({ ...account, userEmail: trimAndLowercase(account.userEmail) }),
                    ),
                ],
            );
        }
    } catch (e) {
        console.error('DB connection failed');

        process.exit(1);
    }

    /**
     * Server Activation
    **/
    app.listen(
        PORT,
        () => {
            console.log(`Listening on port ${PORT}`);
        },
    );
})();

process.on(
    'beforeExit',
    async () => {
        await MongooseDBConnection.getInstance(MONGO_URL).closeConnection();

        process.exit(0);
    },
);
