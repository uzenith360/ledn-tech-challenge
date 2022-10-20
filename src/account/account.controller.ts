import { Request, Response } from 'express';
import HttpException from '../common/classes/http-exception';
import httpStatusCode from '../common/enums/http-status-code.enum';
import AccountService from './account.service';
import AccountDocument from './interfaces/account-document.inteface';
import GetAccountData from './types/get-account-data.type';

export const getAccount = async (req: Request, res: Response) => {
    const {
        userEmail
    } = req.query as GetAccountData;

    try {
        const account: AccountDocument = await AccountService.getAccountByEmail(userEmail);

        res.send({ success: true, data: account });
    } catch (err) {
        if (err instanceof HttpException) {
            res.status(err.statusCode)
                .send({ success: false, message: err.message });
        } else {
            res.status(httpStatusCode.fail)
                .send({ success: false, message: 'Internal server error' });
        }
    }
};
