/**
 * Required External Modules
 */
import express, { Express } from "express";
import { Connection, Schema } from 'mongoose';
import { env } from 'process';
import cors from "cors";
// import morgan from "morgan";
import helmet from "helmet";
// import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import passport from 'passport';

// import techniciansRouter from "./controllers/technicians/technicians.router";
import errorHandler from "./common/middlewares/error.middleware";
import notFoundHandler from "./common/middlewares/not-found.middleware";
import defaultHandler from "./common/middlewares/default.middleware";
// import vinRouter from "./controllers/vin/vin.router";
// import notificationJobsRouter from "./controllers/notification-jobs/notification-jobs.router";
import getApiSecretMiddleware from "./common/middlewares/get-api-secret.middleware";
import transactionRouter from "./transaction/transaction.router";
import DBConnection from "./common/helpers/db-connection";
import dbSeeder from "./common/helpers/db-seeder";
import TransactionModel from "./transaction/models/transaction.model";
import AccountModel from "./account/models/account.model";
import Account from "./account/interfaces/account";
import Transaction from "./transaction/interfaces/transaction";

/**
* App Variables
*/
if (
    ![
        'PORT',
        'API_KEY',
        'MONGODB_CONNECTION_STRING',
    ].every((envVar: string) => !!env[envVar])
) {
    process.exit(1);
}

const PORT: number = parseInt(env.PORT as string, 10) || 8081;
const MONGO_URL: string = env.MONGODB_CONNECTION_STRING as string;

const init = async () => {
    const app: Express = express();

    /**
     *  App Configuration
     */
    app.use(helmet());
    app.use(cors());
    // app.use(morgan('combined'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(passport.initialize());

    // passport.use(
    //     new HeaderAPIKeyStrategy(
    //         {
    //             header: 'X-API-KEY',
    //             prefix: '',
    //         },
    //         false,
    //         getApiSecretMiddleware,
    //     ),
    // );

    app.use("/api/transaction", transactionRouter);
    // app.use("/api/vin", vinRouter);
    // app.use("/api/notification_job", notificationJobsRouter);

    app.use("/", defaultHandler);

    app.use(errorHandler);
    app.use(notFoundHandler);

    /**
     * Mongoose default connection
     */
    try {
        await DBConnection.getInstance(MONGO_URL).getConnection();

        console.log('DB connected, seeding ...');

        /// seed database 
        // await Promise.all(
        //     [
        //         // transaction model
        //         dbSeeder<Transaction<Schema.Types.Decimal128>>(
        //             TransactionModel,
        //             './instructions/transactions-api.json',
        //         ),
        //         // account model
        //         dbSeeder<Account<Schema.Types.Decimal128>>(
        //             AccountModel,
        //             './instructions/accounts-api.json',
        //         ),
        //     ],
        // );
    } catch (e) {
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
}

init();

process.on(
    'beforeExit',
    async () => {
        const connection: Connection | undefined
            = await DBConnection.getInstance(MONGO_URL).getConnection();

        connection?.close();

        process.exit(0);
    },
);
