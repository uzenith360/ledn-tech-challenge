import { FilterQuery, UpdateQuery, UpdateWithAggregationPipeline, ClientSession } from 'mongoose';
import AccountCoreService from './interfaces/account.core.service.interface';
import AccountDocument from './interfaces/account-document.inteface';
import Account from './interfaces/account.interface';
import AccountModel from "./models/account.model";
import AccountMongodbCoreService from './account-mongodb.core.service';

export default class AccountCoreServiceImpl implements AccountCoreService {
    

    constructor(private accountCoreServiceImpl: AccountCoreService){


this.accountCoreServiceImpl.updateOne();
    }

     async get(filter?: FilterQuery<Account>): Promise<AccountDocument | null> {
        return AccountModel.findOne(filter);
    }

     async create(account: Account): Promise<AccountDocument> {
        return (new AccountModel(account)).save();
    }

     async updateOne(
        filter: FilterQuery<Account>,
        update: UpdateQuery<Account> | UpdateWithAggregationPipeline,
        session?: ClientSession
    ): Promise<boolean> {
        return !!(await AccountModel.updateOne(filter, update, { session })).modifiedCount;
    }

     async findOneAndUpdate(
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

     incrementBalance(
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
