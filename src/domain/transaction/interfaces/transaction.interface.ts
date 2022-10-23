import TransactionInterface from "../../../data/interfaces/transaction/transaction.interface";

export default interface Transaction extends TransactionInterface {
    _id?: string;
}
