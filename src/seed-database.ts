// import AccountModel from "./data/datasources/mongoose/account/models/account.model";
// import TransactionModel from "./data/datasources/mongoose/transaction/models/transaction.model";
// import Account from "./domain/account/interfaces/account.interface";
// import AccountDocument from "./domain/account/interfaces/account-document.inteface";
// import dbSeeder from "./common/helpers/db-seeder";
// import trimAndLowercase from "./common/helpers/trim-and-lowercase";
// import TransactionDocument from "./domain/transaction/interfaces/transaction-document.interface";
// import Transaction from "./domain/transaction/interfaces/transaction.interface";

// export default () => Promise.allSettled(
//     [
//         // transaction model
//         dbSeeder<TransactionDocument, Transaction>(
//             TransactionModel,
//             './instructions/transactions-api.json',
//             (transaction: Transaction) => ({ ...transaction, userEmail: trimAndLowercase(transaction.userEmail) }),
//         ),
//         // account model
//         dbSeeder<AccountDocument, Account>(
//             AccountModel,
//             './instructions/accounts-api.json',
//             (account: Account) => ({ ...account, userEmail: trimAndLowercase(account.userEmail) }),
//         ),
//     ],
// );
