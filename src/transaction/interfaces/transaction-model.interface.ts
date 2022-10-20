import { Model } from "mongoose";
import TransactionDocument from "./transaction-document.interface";

export default interface TransactionModel extends Model<TransactionDocument> {
};