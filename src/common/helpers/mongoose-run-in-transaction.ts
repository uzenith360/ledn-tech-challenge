import mongoose, { ClientSession, Connection } from 'mongoose';
import TransactionCallback from '../types/transaction-callback.type';

export default async (callback: TransactionCallback, connection: Connection = mongoose.connection)
    : Promise<void> => {
    const session: ClientSession = await connection.startSession();

    session.startTransaction();

    try {
        await callback(session);

        // Commit the changes
        await session.commitTransaction();
    } catch (error) {
        // Rollback any changes made in the database
        await session.abortTransaction();

        // logging the error
        console.error(error);

        // Rethrow the error
        throw error;
    } finally {
        // Ending the session
        session.endSession();
    }
}
