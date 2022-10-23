import { Schema, model } from 'mongoose';
import transactionType from '../../../../../domain/transaction/enums/transaction-type.enum';
import TransactionDocument from '../../../../interfaces/transaction/mongoose/transaction-document.interface';
import TransactionModelInterface from '../../../../interfaces/transaction/mongoose/transaction-model.interface';
import schemaGetAmount from '../../schema-get-amount';

const TransactionSchema: Schema<TransactionDocument, TransactionModelInterface>
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

const TransactionModel: TransactionModelInterface
    = model<TransactionDocument, TransactionModelInterface>('Transaction', TransactionSchema);

export default TransactionModel;
