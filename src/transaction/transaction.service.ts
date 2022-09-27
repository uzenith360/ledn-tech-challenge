import transactionType from './enums/transaction-type.enum';
import createTransaction from './helpers/create-transaction';
import Transaction from "./interfaces/transaction";
import CreateTransaction from './types/transaction-create-data.type';

export default class TransactionService {
    static async createSendTransaction(transaction: CreateTransaction): Promise<void> {
        return createTransaction(transaction, transactionType.send);
    }

    static async createReceiveTransaction(transaction: CreateTransaction): Promise<void> {
        return createTransaction(transaction, transactionType.receive);
    }
}
