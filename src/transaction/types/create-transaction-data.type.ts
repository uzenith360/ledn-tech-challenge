import Transaction from "../interfaces/transaction";

type CreateTransactionData = Pick<Transaction, 'amount' | 'userEmail'>;

export default CreateTransactionData;
