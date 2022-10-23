import Account from "../../account/interfaces/account.interface";
import Transaction from "./transaction.interface";

export default interface TransactionWithAccount extends Transaction {
    accountOwner: Account;
}
