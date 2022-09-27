import { Request, Response, NextFunction } from "express";

export default (
  request: Request,
  response: Response,
  next: NextFunction
) => response.status(200).send();
