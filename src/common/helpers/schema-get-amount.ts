import { Types } from "mongoose";

export default (value?: Types.Decimal128): number => {
    if (!!value) {
        return parseFloat(value.toString());
    }

    return 0;
};
