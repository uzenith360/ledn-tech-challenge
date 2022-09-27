import { Request, Response } from "express";
import { checkSchema, Schema } from "express-validator";
import { ResultWithContext } from "express-validator/src/chain";

export default (schema: Schema) => {
    return async (req: Request, res: Response, next: () => void) => {
        try {
            const checkSchemaResultList: ResultWithContext[] = (await checkSchema(schema).run(req)) as ResultWithContext[];
            const isSchemaError: boolean = checkSchemaResultList.some((checkSchemaResult: ResultWithContext) => {
                if (!!checkSchemaResult.context.errors.length) {
                    res.status(400).send(checkSchemaResult.context.errors);
                    
                    return true;
                }
            });

            if (!isSchemaError) {
                next();
            }
        } catch (e) {
            res.status(500).send('An error occured, please try again');
        }
    };
}