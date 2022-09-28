import transactionType from "../enums/transaction-type.enum";
import { Types } from "mongoose";

export default interface Transaction<T = number> {
    _id?: Types.ObjectId;
    userEmail: string;
    amount: T;
    type: transactionType,
    createdAt?: Date;
}
