import { Types } from "mongoose";
import { env } from "process";
import transactionType from "../../../../domain/transaction/enums/transaction-type.enum";
import TransactionDatasource from "../../../interfaces/transaction/transaction.datasource.interface";
import Transaction from "../../../interfaces/transaction/transaction.interface";
import AccountModel from "../account/models/account.model";
import MongooseDBConnection from "../mongoose-db-connection";
import TransactionDatasourceImpl from "./transaction-impl.datasource";

describe(
    "Create Datasource method",
    () => {
        const transactionData: Transaction = {
            amount: 920,
            type: transactionType.receive,
            userEmail: 'beanie@thepink.com',
        };
        let transactionDatasource: TransactionDatasource;
        let transactionId: string;

        const MONGO_URL: string = env.MONGODB_CONNECTION_STRING as string;
        const mongooseDBConnection: MongooseDBConnection
            = MongooseDBConnection.getInstance(MONGO_URL);

        beforeAll(
            async () => {
                await mongooseDBConnection.getConnection();

                // Just to register account model, 
                // Cos the transaction model has a join with the account model
                new AccountModel();

                // await (await mongooseDBConnection.getConnection())
                // .collection('transactions')
                // .deleteMany({createdAt: {$ne:null}})
            }
        );

        afterAll(
            async () => {
                await (
                    (await mongooseDBConnection.getConnection())
                        .collection('transactions')
                        .deleteOne({ _id: new Types.ObjectId(transactionId) })
                );

                await mongooseDBConnection.closeConnection();
            }
        );

        beforeEach(
            () => {
                // jest.clearAllMocks();
                transactionDatasource = new TransactionDatasourceImpl();
            },
        );

        test(
            "Should create data successfully",
            async () => {
                const result = await transactionDatasource.create(transactionData);

                transactionId = result?._id?.toString() as string;

                expect(result).toMatchObject(transactionData);
            },
        );

        test(
            "Should fetch data successfully",
            async () => {
                const result = await transactionDatasource.findOne(transactionData.userEmail);

                expect(result).toMatchObject(transactionData);
            },
        );
    }
);