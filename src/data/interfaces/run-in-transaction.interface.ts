import TransactionCallback from "../../common/types/transaction-callback.type";

export default interface RunInTransaction<T> {
    execute(callback: TransactionCallback, connection?: T): Promise<void>
}