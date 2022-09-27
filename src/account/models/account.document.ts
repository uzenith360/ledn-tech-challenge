import { Types, Document } from "mongoose";
import Account from "../interfaces/account";

type AccountDocument = Document<Types.ObjectId, any, Account>;

export default AccountDocument;
