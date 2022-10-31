/**
 * Required External Modules
 */

import { env } from 'process';

import accountRouter from "./domain/account/account.router";
import server from './server';
// import seedDatabase from './seed-database';
import { Connection } from 'mongoose';
import MongooseDBConnection from './data/datasources/mongoose/mongoose-db-connection';
import defaultHandler from './common/middlewares/default.middleware';
import errorHandler from './common/middlewares/error.middleware';
import notFoundHandler from './common/middlewares/not-found.middleware';
import transactionRouter from './domain/transaction/transaction.router';
import AccountService from './domain/account/account.service';
import AccountDatasource from './data/interfaces/account/account.datasource.interface';
import AccountDatasourceImpl from './data/datasources/mongoose/account/account-impl.datasource';
import AccountController from './domain/account/account.controller';
import TransactionDatasourceImpl from './data/datasources/mongoose/transaction/transaction-impl.datasource';
import TransactionDatasource from './data/interfaces/transaction/transaction.datasource.interface';
import TransactionService from './domain/transaction/transaction.service';
import RunInTransaction from './data/interfaces/run-in-transaction.interface';
import RunInTransactionImpl from './data/datasources/mongoose/run-in-transaction-impl';
import TransactionController from './domain/transaction/transaction.controller';

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

// const SEED_DATABASE: boolean = env.SEED_DATABASE === 'true';
const PORT: number = parseInt(env.PORT as string, 10) || 8081;
const MONGO_URL: string = env.MONGODB_CONNECTION_STRING as string;

(async () => {
    try {
        /**
         * Mongoose connection
        **/
        const connection: Connection =
            await MongooseDBConnection.getInstance(MONGO_URL).getConnection();

        console.log('DB connected');

        const mongooseAccountDatasource: AccountDatasource = new AccountDatasourceImpl();
        const accountService: AccountService = new AccountService(mongooseAccountDatasource);
        const accountController: AccountController = new AccountController(accountService);

        server.use(
            "/api/account",
            accountRouter(accountController),
        );

        const mongooseTransactionDatasource: TransactionDatasource = new TransactionDatasourceImpl();
        const mongooseRunInTransaction: RunInTransaction<Connection> = new RunInTransactionImpl();
        const transactionService: TransactionService<Connection> = new TransactionService(
            mongooseRunInTransaction,
            mongooseTransactionDatasource,
            mongooseAccountDatasource,
        );
        const transactionController: TransactionController<Connection>
            = new TransactionController(transactionService);

        server.use(
            "/api/transaction",
            transactionRouter(transactionController),
        );

        // if (SEED_DATABASE) {
        //     console.log('Seeding database...');
        //     console.log(`You can turn this off via the 'SEED_DATABASE' env variable`);

        //     /// seed database 
        //     seedDatabase();
        // }
    } catch (e) {
        console.error('DB connection failed');

        process.exit(1);
    }

    server.use("/", defaultHandler);

    server.use(errorHandler);
    server.use(notFoundHandler);

    /**
     * Server Activation
    **/
    server.listen(
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
