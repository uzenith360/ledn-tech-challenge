import HttpException from "../../common/classes/http-exception";
import httpStatusCode from "../../common/enums/http-status-code.enum";
import AccountDatasource from "../../data/interfaces/account/account.datasource.interface";
import Account from "./interfaces/account.interface";

export default class AccountService {
    constructor(private readonly accountDatasource: AccountDatasource) { }

    async getAccountByEmail(userEmail: string): Promise<Account> {
        const account: Account | null = await this.accountDatasource.get({ userEmail });

        if (!account) {
            throw new HttpException(
                httpStatusCode.notFound,
                `Account with email ${userEmail} doesnt exist`,
            );
        }

        return account;
    }
}
