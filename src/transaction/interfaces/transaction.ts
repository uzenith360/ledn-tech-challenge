import transactionType from "../enums/transaction-type.enum";
import { Types } from "mongoose";
import Account from "../../account/interfaces/account";

export default interface Transaction<T = number> {
    _id?: Types.ObjectId;
    userEmail: string;
    amount: T;
    account?: Account;
    type: transactionType,
    createdAt?: Date;
}
