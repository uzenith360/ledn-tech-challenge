import { ClientSession } from 'mongoose';
import HttpException from '../../../common/classes/http-exception';
import httpStatusCode from '../../../common/enums/http-status-code.enum';
import AccountDatasource from '../../../data/interfaces/account/account.datasource.interface';
import RunInTransaction from '../../../data/interfaces/run-in-transaction.interface';
import TransactionDatasource from '../../../data/interfaces/transaction/transaction.datasource.interface';
import Account from '../../account/interfaces/account.interface';
import transactionType from '../enums/transaction-type.enum';
import TransactionCreateData from '../types/create-transaction-data.type';

export default async <T>(
    runInTransaction: RunInTransaction<T>,
    transactionDatasource: TransactionDatasource,
    accountDatasource: AccountDatasource,
    transactionCreateData: TransactionCreateData, 
    type: transactionType
    )
    : Promise<void> => new Promise(
        (resolve, reject) => runInTransaction.execute(
            async (session: ClientSession) => {
                const {
                    amount,
                    userEmail,
                } = transactionCreateData;
                const account: Account | null
                    = await accountDatasource.get(
                        {
                            userEmail,
                        },
                    );

                if (!account) {
                    throw new HttpException(
                        httpStatusCode.notFound,
                        `Account with email ${userEmail} doesnt exist`,
                    );
                }

                await transactionDatasource.create(
                    {
                        type,
                        amount,
                        userEmail,
                    },
                    session,
                );

                const incrementAmount: number
                    = amount
                    * (
                        type == transactionType.receive
                            ? 1
                            : -1
                    );

                const { balance = null } = await accountDatasource.incrementBalance(
                    { _id: account._id },
                    incrementAmount,
                    session,
                    true,
                ) as Account;

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
