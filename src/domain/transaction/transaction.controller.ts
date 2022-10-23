import { Request, Response } from 'express';
import HttpException from '../../common/classes/http-exception';
import httpStatusCode from '../../common/enums/http-status-code.enum';
import TransactionService from './transaction.service';
import CreateTransactionData from './types/create-transaction-data.type';

export default class TransactionController<T> {
    constructor(private readonly transactionService: TransactionService<T>) { }

    async createSendTransaction(req: Request, res: Response): Promise<void> {
        const {
            amount,
            userEmail
        } = req.body as CreateTransactionData;

        try {
            await this.transactionService.createSendTransaction(
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
    }

    async createReceiveTransaction(req: Request, res: Response): Promise<void> {
        const {
            amount,
            userEmail
        } = req.body as CreateTransactionData;

        try {
            await this.transactionService.createReceiveTransaction(
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
    }
}
