import Transaction from "../interfaces/transaction.interface";

type CreateTransactionData = Pick<Transaction, 'amount' | 'userEmail'>;

export default CreateTransactionData;
