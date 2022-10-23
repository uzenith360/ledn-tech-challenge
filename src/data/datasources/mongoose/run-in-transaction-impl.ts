import mongoose, { ClientSession, Connection } from 'mongoose';
import TransactionCallback from '../../../common/types/transaction-callback.type';
import RunInTransaction from '../../interfaces/run-in-transaction.interface';

export default class RunInTransactionImpl implements RunInTransaction<Connection> {
    async execute(callback: TransactionCallback, connection: Connection = mongoose.connection)
    : Promise<void> {
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
    
}

