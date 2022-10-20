import { Schema, model } from "mongoose";
import schemaGetAmount from "../../common/helpers/schema-get-amount";
import AccountDocument from "../interfaces/account-document.inteface";
import AccountModel from "../interfaces/account-model.interface";

const AccountSchema: Schema<AccountDocument, AccountModel>
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

export default model<AccountDocument, AccountModel>("Account", AccountSchema);
