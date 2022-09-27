import { Types } from "mongoose";

export default interface Account<T = number> {
    _id: Types.ObjectId;
    userEmail: string;
    balance: T;
    createdAt: Date;
    updatedAt?: Date;
}
