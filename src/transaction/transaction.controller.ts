import { Request, Response } from 'express';
import HttpException from '../common/classes/http-exception';
import httpStatusCode from '../common/enums/http-status-code.enum';
import TransactionService from './transaction.service';
import CreateTransaction from './types/transaction-create-data.type';

export const createSendTransaction = async (req: Request, res: Response) => {
    const {
        amount,
        userEmail
    } = req.body as CreateTransaction;

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
    } = req.body as CreateTransaction;

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

// // Display list of all Genre.
// exports.genre_list = (req, res) => {
//   res.send("NOT IMPLEMENTED: Genre list");
// };

// // Display detail page for a specific Genre.
// exports.genre_detail = (req, res) => {
//   res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
// };

// // Display Genre create form on GET.
// exports.genre_create_get = (req, res) => {
//   res.send("NOT IMPLEMENTED: Genre create GET");
// };

// // Handle Genre create on POST.
// exports.genre_create_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: Genre create POST");
// };

// // Display Genre delete form on GET.
// exports.genre_delete_get = (req, res) => {
//   res.send("NOT IMPLEMENTED: Genre delete GET");
// };

// // Handle Genre delete on POST.
// exports.genre_delete_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: Genre delete POST");
// };

// // Display Genre update form on GET.
// exports.genre_update_get = (req, res) => {
//   res.send("NOT IMPLEMENTED: Genre update GET");
// };

// // Handle Genre update on POST.
// exports.genre_update_post = (req, res) => {
//   res.send("NOT IMPLEMENTED: Genre update POST");
// };
