import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export const enum WalletStatus {
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED',
    PROCESSING = 'PROCESSING'
}

export interface IWallet {
    id?: number;
    number?: string;
    date?: Moment;
    identification?: string;
    mobile?: string;
    email?: string;
    money?: number;
    account?: string;
    status?: WalletStatus;
    user?: IUser;
}

export class Wallet implements IWallet {
    constructor(
        public id?: number,
        public number?: string,
        public date?: Moment,
        public identification?: string,
        public mobile?: string,
        public email?: string,
        public money?: number,
        public account?: string,
        public status?: WalletStatus,
        public user?: IUser
    ) {}
}
