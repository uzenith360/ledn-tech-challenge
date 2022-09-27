import { Model } from 'mongoose';
import fileRead from './file-read';

export default async <T>(model: Model<T>, seedingFilePath: string): Promise<void> => {
    await model.deleteMany({});

    let seedData: unknown[] = JSON.parse(await fileRead(seedingFilePath));

    do {
        /**
         * This would hang if data being fed in doesnt match the schema
         * Look at for things like required fields that arent in seed data
         */
        await model.insertMany(seedData.slice(0, 10));

        seedData = seedData.slice(10);
    } while (!!seedData?.length)
}
