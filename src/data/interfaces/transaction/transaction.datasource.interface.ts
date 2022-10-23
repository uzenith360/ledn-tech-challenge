import { ClientSession } from "mongoose";
import TransactionWithAccount from "../../../domain/transaction/interfaces/transaction-with-account.interface";
import Transaction from "../../../domain/transaction/interfaces/transaction.interface";

export default interface TransactionDatasource {
    findOne(userEmail: string): Promise<TransactionWithAccount | null>;
    create(transaction: Transaction, session?: ClientSession)
        : Promise<Transaction | null>;
    // createTransaction(transaction: Transaction): Promise<void>;
}
