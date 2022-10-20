import { Schema, model } from 'mongoose';
import transactionType from '../enums/transaction-type.enum';
import schemaGetAmount from '../../common/helpers/schema-get-amount';
import TransactionModel from '../interfaces/transaction-model.interface';
import TransactionDocument from '../interfaces/transaction-document.interface';

const TransactionSchema: Schema<TransactionDocument, TransactionModel>
    = new Schema(
        {
            userEmail: {
                type: String,
                required: true,
                maxLength: 100,
                index: true,
                lowercase: true,
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
            toJSON: { getters: true, virtuals: true },
            toObject: { virtuals: true },
        },
    );

// Foreign keys definitions
TransactionSchema.virtual(
    'accountOwner',
    {
        ref: 'Account',
        localField: 'userEmail',
        foreignField: 'userEmail',
        justOne: true // for many-to-1 relationships
    },
);

export default model<TransactionDocument, TransactionModel>('Transaction', TransactionSchema);
