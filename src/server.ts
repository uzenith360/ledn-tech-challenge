import cors from "cors";
import helmet from "helmet";
import express, { Express } from "express";
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import passport from 'passport';
import getApiSecretMiddleware from "./common/middlewares/get-api-secret.middleware";

const server: Express = express();

/**
 *  App Configuration
 */
server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(passport.initialize());

/**
 * Basic API KEY auth, pass an X-API-KEY header, API_KEY is in .env-example
 */
passport.use(
    new HeaderAPIKeyStrategy(
        {
            header: 'X-API-KEY',
            prefix: '',
        },
        false,
        getApiSecretMiddleware,
    ),
);

export default server;
