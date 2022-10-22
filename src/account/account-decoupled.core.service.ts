import AccountCoreService from "./interfaces/account.core.service.interface";

export class AccountUpdateOneService {
    constructor(private accountModel: AccountCoreService) { }

    execute(
        filter: any,
        update: any,
        session?: any
    ): any {
        this.accountModel.updateOne(
            filter,
            update,
            session,
        );
    }
}