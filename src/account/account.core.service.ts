import { HydratedDocument, FilterQuery, UpdateQuery, UpdateWithAggregationPipeline, ClientSession } from 'mongoose';
import Account from './interfaces/account';
import AccountDocument from './models/account.document';
import AccountModel from "./models/account.model";

export default class AccountCoreService {
    static async get(filter?: FilterQuery<Account>): Promise<Account | null> {
        return AccountModel.findOne(filter).lean();
    }

    static async create(account: Account): Promise<AccountDocument> {
        return (new AccountModel(account)).save();
    }

    static async updateOne(
        filter: FilterQuery<Account>,
        update: UpdateQuery<Account> | UpdateWithAggregationPipeline,
        session?: ClientSession
    ): Promise<boolean> {
        return !!(await AccountModel.updateOne(filter, update, { session })).modifiedCount;
    }
}
