import transactionType from './enums/transaction-type.enum';
import createTransaction from './helpers/create-transaction';
import CreateTransactionData from './types/create-transaction-data.type';

export default class TransactionService {
    static async createSendTransaction(transaction: CreateTransactionData): Promise<void> {
        return createTransaction(transaction, transactionType.send);
    }

    static async createReceiveTransaction(transaction: CreateTransactionData): Promise<void> {
        return createTransaction(transaction, transactionType.receive);
    }
}
