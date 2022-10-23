import { Schema, Document, Types } from "mongoose";
import Transaction from "../transaction.interface";

export default interface TransactionBaseDocument extends Transaction<Schema.Types.Decimal128>, Document<Types.ObjectId> {
}
