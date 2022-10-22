export default interface AccountCoreService {
    get(filter?: any): any;
    create(account: any): any;
    updateOne(
        filter: any,
        update: any,
        session?: any
    ): any;
    findOneAndUpdate(
        filter: any,
        update: any,
        session?: any,
        returnUpdatedDocument?: any
    ): any;
    incrementBalance(
        filter: any,
        increment: any,
        session?: any,
        returnUpdatedDocument?: any
    ): any
}