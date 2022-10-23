import { Schema, Types, Document } from "mongoose";
import Account from "../account.interface";

export default interface AccountBaseDocument extends Account<Schema.Types.Decimal128>, Document<Types.ObjectId> {
}
