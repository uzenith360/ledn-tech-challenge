import Account from "../../../../domain/account/interfaces/account.interface";
import TransactionBaseDocument from "./transaction-base-document.interface";

export default interface TransactionDocument extends TransactionBaseDocument {
    accountOwner: Account['userEmail'];
}
