import Account from "../../account/account.interface";
import TransactionBaseDocument from "./transaction-base-document.interface";

export default interface TransactionWithAccountDocument extends TransactionBaseDocument {
    accountOwner: Account;
}
