import { ClientSession } from 'mongoose';
import TransactionDocument from './interfaces/transaction-document.interface';
import TransactionPopulatedDocument from './interfaces/transaction-populated-document.interface';

import Transaction from './interfaces/transaction.interface';
import TransactionModel from "./models/transaction.model";

export default class TransactionCoreService {
    static async findOne(userEmail: string): Promise<TransactionPopulatedDocument | null> {
        return TransactionModel
            .findOne({ userEmail })
            // if you use select() be sure to include the foreign key field !
            .populate('accountOwner');
    }

    static async create(transaction: Transaction, session?: ClientSession)
        : Promise<TransactionDocument | null> {
        return (new TransactionModel(transaction)).save({ session });
    }
}
