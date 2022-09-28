import { Schema, model, Model } from 'mongoose';
import transactionType from '../enums/transaction-type.enum';
import schemaGetAmount from '../../common/helpers/schema-get-amount';
import Transaction from '../interfaces/transaction';

const TransactionSchema: Schema<Transaction<Schema.Types.Decimal128>>
    = new Schema(
        {
            userEmail: {
                type: String,
                required: true,
                maxLength: 100,
                index: true,
            },
            amount: {
                type: Schema.Types.Decimal128,
                required: true,
                default: 0.0,
                get: schemaGetAmount,
            },
            type: {
                type: String,
                required: true,
                enum: [transactionType.receive, transactionType.send],
                default: transactionType.receive,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        },
        {
            id: false,
            toJSON: { getters: true },
        },
    );

const TransactionModel: Model<Transaction<Schema.Types.Decimal128>>
    = model<Transaction<Schema.Types.Decimal128>>('Transaction', TransactionSchema);

export default TransactionModel;
