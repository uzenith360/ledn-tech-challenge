export default class HttpException extends Error {
  readonly statusCode: number;
  readonly message: string;
  readonly stack?: string;
  readonly name: string;
  readonly error: string | null;

  status?: number;

  constructor(statusCode: number, message: string, error?: string) {
    super(message);

    // Set the prototype explicitly, if not it'll still be type Error
    Object.setPrototypeOf(this, HttpException.prototype);

    this.stack = (new Error()).stack;
    this.name = "HttpException";
    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}
