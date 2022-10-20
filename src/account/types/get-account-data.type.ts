import Account from "../interfaces/account.interface";

type GetAccountData = Pick<Account, 'userEmail'>;

export default GetAccountData;
