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
import TransactionCreateData from '../types/create-transaction-data.type';

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

                const { balance = null } = await AccountCoreService.incrementBalance(
                    { _id: account._id },
                    amount,
                    session,
                    true,
                );

                if (balance === account.balance) {
                    throw new HttpException(
                        httpStatusCode.bad,
                        'Insufficient balance 🤦‍♂️',
                    );
                }

                resolve();
            }
        ).catch((e) => reject(e))
    );
