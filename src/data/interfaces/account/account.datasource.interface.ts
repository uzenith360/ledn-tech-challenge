import { FilterQuery, UpdateQuery, UpdateWithAggregationPipeline, ClientSession } from "mongoose";
import Account from "../../../domain/account/interfaces/account.interface";

export default interface AccountDatasource {
    get(filter?: FilterQuery<Account>): Promise<Account | null>;
    updateOne(
        filter: FilterQuery<Account>,
        update: UpdateQuery<Account> | UpdateWithAggregationPipeline,
        session?: ClientSession
    ): Promise<boolean>;
    findOneAndUpdate(
        filter: FilterQuery<Account>,
        update: UpdateQuery<Account> | UpdateWithAggregationPipeline,
        session?: ClientSession,
        returnUpdatedDocument?: boolean
    ): Promise<Account | null>;
    incrementBalance(
        filter: FilterQuery<Account>,
        increment: number,
        session?: ClientSession,
        returnUpdatedDocument?: boolean
    ): Promise<Account | null>;
}
