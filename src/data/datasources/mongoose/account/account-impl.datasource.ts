import { FilterQuery, UpdateQuery, UpdateWithAggregationPipeline, ClientSession } from 'mongoose';
import AccountDatasource from '../../../interfaces/account/account.datasource.interface';
import Account from '../../../../domain/account/interfaces/account.interface';
import AccountModel from './models/account.model';

export default class AccountDatasourceImpl implements AccountDatasource {
    async get(filter?: FilterQuery<Account>): Promise<Account | null> {
        return AccountModel.findOne(filter).lean({getters: true});
    }

    async create(account: Account): Promise<Account> {
        return (await (new AccountModel(account)).save()).toObject({getters: true});
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
    ): Promise<Account | null> {
        return AccountModel.findOneAndUpdate(
            filter,
            update,
            {
                session,
                new: returnUpdatedDocument,
            }
        ).lean({getters: true});
    }

    incrementBalance(
        filter: FilterQuery<Account>,
        increment: number,
        session?: ClientSession,
        returnUpdatedDocument?: boolean
    ): Promise<Account | null> {
        return this.findOneAndUpdate(
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
