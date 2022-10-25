import { Types } from "mongoose";
import schemaGetAmount from "./schema-get-amount";

describe(
    'Scheme get amount',
    () => {
        test(
            "It returns zero when no paramater is passed",
            () => {
                const result = schemaGetAmount();

                expect(result).toBe(0);
            }
        );

        test(
            "It converts the passed Decimal128 to a float point number",
            () => {
                const result = schemaGetAmount(Types.Decimal128.fromString("250.2"));

                expect(result).toBe(250.2);
            },
        );
    },
);

