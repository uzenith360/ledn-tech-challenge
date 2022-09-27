import Transaction from "../interfaces/transaction";

type TransactionCreateData = Pick<Transaction, 'amount' | 'userEmail'>;

export default TransactionCreateData;
