import { Request, Response } from 'express';
import HttpException from '../common/classes/http-exception';
import httpStatusCode from '../common/enums/http-status-code.enum';
import TransactionService from './transaction.service';
import CreateTransactionData from './types/create-transaction-data.type';

export const createSendTransaction = async (req: Request, res: Response) => {
    const {
        amount,
        userEmail
    } = req.body as CreateTransactionData;

    try {
        await TransactionService.createSendTransaction(
            {
                amount,
                userEmail,
            }
        );

        res.send({ success: true });
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

export const createReceiveTransaction = async (req: Request, res: Response) => {
    const {
        amount,
        userEmail
    } = req.body as CreateTransactionData;

    try {
        await TransactionService.createReceiveTransaction(
            {
                amount,
                userEmail,
            }
        );

        res.send({ success: true });
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
