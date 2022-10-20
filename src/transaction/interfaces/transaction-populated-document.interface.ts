import Account from "../../account/interfaces/account.interface";
import TransactionBaseDocument from "./transaction-base-document.interface";

export default interface TransactionPopulatedDocument extends TransactionBaseDocument {
    accountOwner: Account;
}
