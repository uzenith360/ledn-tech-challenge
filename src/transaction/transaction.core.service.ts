import { HydratedDocument, ClientSession } from 'mongoose';

import Transaction from './interfaces/transaction';
import TransactionDocument from './models/transaction.document';
import TransactionModel from "./models/transaction.model";

export default class TransactionCoreService {
    static async findOne(userEmail: string): Promise<Transaction> {
        return TransactionModel.findOne({ userEmail }).populate('accountOwner').lean(false);
    }

    static async create(transaction: Transaction, session?: ClientSession): Promise<TransactionDocument> {
        return (new TransactionModel(transaction)).save({ session });
    }
}
