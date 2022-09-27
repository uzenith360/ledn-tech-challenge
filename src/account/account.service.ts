import HttpException from "../common/classes/http-exception";
import httpStatusCode from "../common/enums/http-status-code.enum";
import AccountCoreService from "./account.core.service";
import Account from "./interfaces/account";

export default class AccountService {
    static async getAccountByEmail(userEmail: string): Promise<Account> {
        const account: Account | null = await AccountCoreService.get({ userEmail });

        if (!account) {
            throw new HttpException(
                httpStatusCode.notFound,
                `Account with email ${userEmail} is not found`,
            );
        }

        return account;
    }
}
