import transactionType from "../../../domain/transaction/enums/transaction-type.enum";

export default interface Transaction<T = number> {
    userEmail: string;
    amount: T;
    type: transactionType,
    createdAt?: Date;
}
