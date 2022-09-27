import { Types, Document } from "mongoose";
import Transaction from "../interfaces/transaction";

type TransactionDocument = Document<Types.ObjectId, any, Transaction>;

export default TransactionDocument;
