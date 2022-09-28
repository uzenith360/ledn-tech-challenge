import { Schema, model, Model } from "mongoose";
import schemaGetAmount from "../../common/helpers/schema-get-amount";
import Account from "../interfaces/account";

const AccountSchema: Schema<Account<Schema.Types.Decimal128>>
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

const AccountModel: Model<Account<Schema.Types.Decimal128>> = model("Account", AccountSchema);

export default AccountModel;
