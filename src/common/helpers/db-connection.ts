import { Connection, connect } from "mongoose";

export default class DBConnection {
    private static _instance: DBConnection;

    private readonly mongoUrl: string;
    private connection: Connection | undefined;

    private constructor(mongoUrl: string) {
        this.mongoUrl = mongoUrl;
    }

    public async getConnection(): Promise<Connection> {
        if (!this.connection) {
            this.connection = await this.connect();
        }

        return this.connection;
    }

    public async closeConnection(): Promise<void> {
        return this.connection?.close();
    }

    private async connect(): Promise<Connection> {
        const { connection } = await connect(
            this.mongoUrl,
            {
                autoCreate: true,
                autoIndex: true,
            },
        );

        connection.on(
            "error",
            console.error.bind(
                console,
                "MongoDB connection error:",
            ),
        );

        return connection;
    }


    public static getInstance(mongoUrl: string): DBConnection {
        if (!DBConnection._instance) {
            DBConnection._instance = new DBConnection(mongoUrl);
        }

        return DBConnection._instance;
    }
}
