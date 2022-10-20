import { FilterQuery, UpdateQuery, UpdateWithAggregationPipeline, ClientSession } from 'mongoose';
import AccountDocument from './interfaces/account-document.inteface';
import Account from './interfaces/account.interface';
import AccountModel from "./models/account.model";

export default class AccountCoreService {
    static async get(filter?: FilterQuery<Account>): Promise<AccountDocument | null> {
        return AccountModel.findOne(filter);
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

    static async findOneAndUpdate(
        filter: FilterQuery<Account>,
        update: UpdateQuery<Account> | UpdateWithAggregationPipeline,
        session?: ClientSession,
        returnUpdatedDocument?: boolean
    ): Promise<AccountDocument | null> {
        return AccountModel.findOneAndUpdate(
            filter,
            update,
            {
                session,
                new: returnUpdatedDocument,
            }
        );
    }

    static incrementBalance(
        filter: FilterQuery<Account>,
        increment: number,
        session?: ClientSession,
        returnUpdatedDocument?: boolean
    ): Promise<AccountDocument | null> {
        return AccountCoreService.findOneAndUpdate(
            filter,
            [
                {
                    $set: {
                        balance: {
                            $cond: [
                                { $lte: ['$balance', -increment] }, // balance + increment <= 0
                                '$balance',
                                { $add: ['$balance', increment] },
                            ]
                        }
                    },
                },
            ],
            session,
            returnUpdatedDocument,
        );
    }
}
