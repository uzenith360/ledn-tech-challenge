import HttpException from "../classes/http-exception";
import { Request, Response, NextFunction } from "express";

export default (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;

  response.status(status).send(error);
};
