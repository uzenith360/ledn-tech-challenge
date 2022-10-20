export default interface Account<T = number> {
    userEmail: string;
    balance: T;
    createdAt: Date;
    updatedAt?: Date;
}
