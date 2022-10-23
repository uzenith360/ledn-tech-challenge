// import { ClientSession } from 'mongoose';
// import HttpException from '../../../../../common/classes/http-exception';
// import httpStatusCode from '../../../../../common/enums/http-status-code.enum';
// import MongooseRunInTransaction from '../../../../../common/helpers/mongoose-run-in-transaction';
// import transactionType from '../../../../../domain/transaction/enums/transaction-type.enum';
// import TransactionCreateData from '../../../../../domain/transaction/types/create-transaction-data.type';
// import TransactionDatasource from '../../../../interfaces/transaction/transaction.datasource.interface';

// export default async (
//     transactionDatasource: TransactionDatasource,
//     transactionCreateData: TransactionCreateData,
//     type: transactionType,
// ): Promise<void> => new Promise(
//         (resolve, reject) => MongooseRunInTransaction(
//             async (session: ClientSession) => {
//                 const {
//                     amount,
//                     userEmail,
//                 } = transactionCreateData;
//                 const account: AccountDocument | null
//                     = await AccountCoreService.get(
//                         {
//                             userEmail,
//                         },
//                     );

//                 if (!account) {
//                     throw new HttpException(
//                         httpStatusCode.notFound,
//                         `Account with email ${userEmail} doesnt exist`,
//                     );
//                 }

//                 await transactionDatasource.create(
//                     {
//                         type,
//                         amount,
//                         userEmail,
//                     },
//                     session,
//                 );

//                 const incrementAmount: number
//                     = amount
//                     * (
//                         type == transactionType.receive
//                             ? 1
//                             : -1
//                     );

//                 const { balance = null } = await AccountCoreService.incrementBalance(
//                     { _id: account._id },
//                     incrementAmount,
//                     session,
//                     true,
//                 ) as AccountDocument;

//                 if (balance === account.balance) {
//                     throw new HttpException(
//                         httpStatusCode.bad,
//                         'Insufficient balance 🤦‍♂️',
//                     );
//                 }

//                 resolve();
//             }
//         ).catch((e) => reject(e))
//     );
