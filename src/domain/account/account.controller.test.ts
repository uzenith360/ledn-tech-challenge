import request from "supertest";
import { FilterQuery } from "mongoose";
import AccountDatasourceImpl from "../../data/datasources/mongoose/account/account-impl.datasource";
import AccountDatasource from "../../data/interfaces/account/account.datasource.interface";
import server from "../../server";
import AccountController from "./account.controller";
import accountRouter from "./account.router";
import AccountService from "./account.service";
import Account from "./interfaces/account.interface";
import { env } from "process";

describe(
    'GET account/',
    () => {
        const API_KEY: string = env.API_KEY as string;

        let mongooseAccountDatasource: AccountDatasource;
        let accountService: AccountService;
        let accountController: AccountController;

        beforeAll(
            () => {
                mongooseAccountDatasource = new AccountDatasourceImpl();
                accountService = new AccountService(mongooseAccountDatasource);
                accountController = new AccountController(accountService);

                server.use(
                    "/api/account",
                    accountRouter(accountController),
                );
            },
        );

        beforeEach(
            () => {
                jest.clearAllMocks();
            },
        );

        test(
            'should return 200 with data',
            async () => {
                const expectedData: Account
                    = {
                    userEmail: 'beanie@thepink.com',
                    balance: 2300,
                    createdAt: new Date(),
                };

                jest.spyOn(mongooseAccountDatasource, "get")
                    .mockImplementation(
                        (filter: FilterQuery<Account> | undefined) => Promise.resolve(expectedData),
                    );

                const response = await request(server)
                    .get("/api/account")
                    .query({ userEmail: expectedData.userEmail })
                    .set({ "X-API-KEY": API_KEY });

                expect(response.status).toBe(200);
                expect(mongooseAccountDatasource.get).toBeCalledTimes(1);
                expect(response.body.data).toStrictEqual(
                    {
                        ...expectedData,
                        createdAt: expectedData.createdAt.toISOString(),
                    },
                );
            },
        );

        test(
            'should returns 500 on use case error',
            async () => {
                const expectedData: Account
                    = {
                    userEmail: 'beanie@thepink.com',
                    balance: 2300,
                    createdAt: new Date(),
                };

                jest.spyOn(mongooseAccountDatasource, "get")
                    .mockImplementation(
                        (filter: FilterQuery<Account> | undefined) => Promise.reject(),
                    );

                const response = await request(server)
                    .get("/api/account")
                    .query({ userEmail: expectedData.userEmail })
                    .set({ "X-API-KEY": API_KEY });

                expect(response.status).toBe(500);
            },
        );

        // TODO: test for 400 data email issue
    },
);
