import AccountCoreService from "./interfaces/account.core.service.interface";

export default class AccountMongodbCoreService implements AccountCoreService {
    get(filter?: any) {
        throw new Error("Method not implemented.");
    }
    create(account: any) {
        throw new Error("Method not implemented.");
    }
    updateOne(filter: any, update: any, session?: any) {
        throw new Error("Method not implemented.");
    }
    findOneAndUpdate(filter: any, update: any, session?: any, returnUpdatedDocument?: any) {
        throw new Error("Method not implemented.");
    }
    incrementBalance(filter: any, increment: any, session?: any, returnUpdatedDocument?: any) {
        throw new Error("Method not implemented.");
    }

}