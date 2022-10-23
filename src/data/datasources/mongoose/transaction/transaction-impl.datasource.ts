import { ClientSession } from "mongoose";
import TransactionWithAccount from "../../../../domain/transaction/interfaces/transaction-with-account.interface";
import TransactionDatasource from "../../../interfaces/transaction/transaction.datasource.interface";
import Transaction from "../../../../domain/transaction/interfaces/transaction.interface";
import TransactionModel from "./models/transaction.model";
import HttpException from "../../../../common/classes/http-exception";
import httpStatusCode from "../../../../common/enums/http-status-code.enum";
import transactionType from "../../../../domain/transaction/enums/transaction-type.enum";
import AccountDocument from "../../../interfaces/account/mongoose/account-document.inteface";
import TransactionDocument from "../../../interfaces/transaction/mongoose/transaction-document.interface";

export default class TransactionDatasourceImpl implements TransactionDatasource {
    async findOne(userEmail: string): Promise<TransactionWithAccount | null> {
        return TransactionModel
            .findOne({ userEmail })
            // if you use select() be sure to include the foreign key field !
            .populate('accountOwner')
            .lean(false);
    }

    private async _create(transaction: Transaction, session?: ClientSession)
    : Promise<TransactionDocument | null> {
    return (new TransactionModel(transaction)).save({ session });
}

    async create(transaction: Transaction): Promise<Transaction | null> {
        return (await (new TransactionModel(transaction)).save()).toObject();
    }

    // async createTransaction (transaction: Transaction): Promise<void> {
    //     return new Promise(
    //         (resolve, reject) => MongooseRunInTransaction(
    //             async (session: ClientSession) => {
    //                 const {
    //                     amount,
    //                     userEmail,
    //                 } = transaction;
    //                 const account: AccountDocument | null
    //                     = await AccountCoreService.get(
    //                         {
    //                             userEmail,
    //                         },
    //                     );
    
    //                 if (!account) {
    //                     throw new HttpException(
    //                         httpStatusCode.notFound,
    //                         `Account with email ${userEmail} doesnt exist`,
    //                     );
    //                 }
    
    //                 await this._create(
    //                     {
    //                         type,
    //                         amount,
    //                         userEmail,
    //                     },
    //                     session,
    //                 );
    
    //                 const incrementAmount: number
    //                     = amount
    //                     * (
    //                         type == transactionType.receive
    //                             ? 1
    //                             : -1
    //                     );
    
    //                 const { balance = null } = await AccountCoreService.incrementBalance(
    //                     { _id: account._id },
    //                     incrementAmount,
    //                     session,
    //                     true,
    //                 ) as AccountDocument;
    
    //                 if (balance === account.balance) {
    //                     throw new HttpException(
    //                         httpStatusCode.bad,
    //                         'Insufficient balance 🤦‍♂️',
    //                     );
    //                 }
    
    //                 resolve();
    //             }
    //         ).catch((e) => reject(e))
    //     );    
    // }
}


