import { ClientSession } from 'mongoose';
import AccountCoreService from '../../account/account.core.service';
import Account from '../../account/interfaces/account';
import HttpException from '../../common/classes/http-exception';
import httpStatusCode from '../../common/enums/http-status-code.enum';
import runInTransaction from '../../common/helpers/run-in-transaction';
import transactionType from '../enums/transaction-type.enum';
import Transaction from "../interfaces/transaction";
import TransactionDocument from '../models/transaction.document';
import TransactionCoreService from '../transaction.core.service';
import TransactionCreateData from '../types/transaction-create-data.type';

export default async (transactionCreateData: TransactionCreateData, type: transactionType)
    : Promise<void> => new Promise(
        (resolve, reject) => runInTransaction(
            async (session: ClientSession) => {
                const account: Account | null
                    = await AccountCoreService.get(
                        {
                            userEmail: transactionCreateData.userEmail,
                        },
                    );

                if (!account) {
                    throw new HttpException(
                        httpStatusCode.notFound,
                        `Account with email ${transactionCreateData.userEmail} doesnt exist`,
                    );
                }

                await TransactionCoreService.create(
                    {
                        type,
                        amount: transactionCreateData.amount,
                        userEmail: transactionCreateData.userEmail,
                    },
                    session,
                );

                const amount: number
                    = transactionCreateData.amount
                    * (
                        type == transactionType.receive
                            ? 1
                            : -1
                    );

                const isUpdated = await AccountCoreService.updateOne(
                    { _id: account._id },
                    { $inc: { balance: amount } },
                    session,
                );

                if (!isUpdated) {
                    throw new HttpException(
                        httpStatusCode.fail,
                        'Account balance not updated',
                    );
                }

                resolve();
            }
        ).catch((e) => reject(e))
    );
