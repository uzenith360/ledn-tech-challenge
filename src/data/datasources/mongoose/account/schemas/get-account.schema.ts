import { Schema } from "express-validator";

const getAccountSchema: Schema = {
  userEmail: {
    // The location of the field, can be one or more of body, cookies, headers, params or query.
    // If omitted, all request locations will be checked
    in: ['query'],
    exists: {
      errorMessage: 'email is required',
      options: [
        {
          checkFalsy: true,
          checkNull: true,
        }
      ]
    },
    ltrim: {
      options: [' '],
    },
    rtrim: {
      // Options as an array
      options: [' '],
    },
    isString: {
      errorMessage: 'email must be a string',
    },
    isLength: {
      errorMessage: 'email should be at least 3 chars long and no more than 100 chars long',
      // Multiple options would be expressed as an array
      options: {
        min: 3,
        max: 100,
      },
    },
    isEmail: {
      errorMessage: 'user email should be a valid email',
    },
    toLowerCase:{},
  },
}

export default getAccountSchema;
