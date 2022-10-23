import { Schema, model } from "mongoose";
import AccountDocument from "../../../../interfaces/account/mongoose/account-document.inteface";
import AccountModelInterface from "../../../../interfaces/account/mongoose/account-model.interface";
import schemaGetAmount from "../../schema-get-amount";

const AccountSchema: Schema<AccountDocument, AccountModelInterface>
    = new Schema(
        {
            userEmail: {
                type: String,
                required: true,
                maxLength: 100,
                unique: true,
                lowercase: true,
            },
            balance: {
                type: Schema.Types.Decimal128,
                required: true,
                default: 0.0,
                min: 0,
                get: schemaGetAmount,
            },
        },
        {
            id: false,
            timestamps: true,
            toJSON: { getters: true },
        },
    );

const AccountModel: AccountModelInterface
    = model<AccountDocument, AccountModelInterface>("Account", AccountSchema);

export default AccountModel;
