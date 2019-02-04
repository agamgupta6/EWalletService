import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export const enum TransactionType {
    WALLET_TO_WALLET = 'WALLET_TO_WALLET',
    WALLET_TO_ACCOUNT = 'WALLET_TO_ACCOUNT',
    ACCOUNT_TO_WALLET = 'ACCOUNT_TO_WALLET'
}

export interface ITransaction {
    id?: number;
    categoty?: string;
    amount?: number;
    type?: TransactionType;
    date?: Moment;
    user?: IUser;
}

export class Transaction implements ITransaction {
    constructor(
        public id?: number,
        public categoty?: string,
        public amount?: number,
        public type?: TransactionType,
        public date?: Moment,
        public user?: IUser
    ) {}
}
