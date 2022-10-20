import HttpException from "../common/classes/http-exception";
import httpStatusCode from "../common/enums/http-status-code.enum";
import AccountCoreService from "./account.core.service";
import AccountDocument from "./interfaces/account-document.inteface";

export default class AccountService {
    static async getAccountByEmail(userEmail: string): Promise<AccountDocument> {
        const account: AccountDocument | null = await AccountCoreService.get({ userEmail });

        if (!account) {
            throw new HttpException(
                httpStatusCode.notFound,
                `Account with email ${userEmail} doesnt exist`,
            );
        }

        return account;
    }
}
