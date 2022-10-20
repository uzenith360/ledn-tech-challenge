import transactionType from "../enums/transaction-type.enum";
// import { Types } from "mongoose";
import Account from "../../account/interfaces/account.interface";

export default interface Transaction<T = number> {
    userEmail: string;
    amount: T;
    type: transactionType,
    createdAt?: Date;
}
