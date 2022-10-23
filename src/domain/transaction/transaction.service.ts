import AccountDatasource from '../../data/interfaces/account/account.datasource.interface';
import RunInTransaction from '../../data/interfaces/run-in-transaction.interface';
import TransactionDatasource from '../../data/interfaces/transaction/transaction.datasource.interface';
import transactionType from './enums/transaction-type.enum';
import createTransaction from './helpers/create-transaction';
import CreateTransactionData from './types/create-transaction-data.type';

export default class TransactionService<T> {
    constructor(
        private readonly runInTransaction: RunInTransaction<T>,
        private readonly transactionDatasource: TransactionDatasource,
        private readonly accountDatasource: AccountDatasource,
    ) { }

    async createSendTransaction(transaction: CreateTransactionData): Promise<void> {
        return createTransaction(
            this.runInTransaction,
            this.transactionDatasource,
            this.accountDatasource,
            transaction,
            transactionType.send,
        );
    }

    async createReceiveTransaction(transaction: CreateTransactionData): Promise<void> {
        return createTransaction(
            this.runInTransaction,
            this.transactionDatasource,
            this.accountDatasource,
            transaction,
            transactionType.receive,
        );
    }
}
