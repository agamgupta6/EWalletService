import { IUser } from 'app/core/user/user.model';
import { ITransaction } from 'app/shared/model//transaction.model';

export interface IFile {
    id?: number;
    repositoryId?: string;
    user?: IUser;
    transaction?: ITransaction;
}

export class File implements IFile {
    constructor(public id?: number, public repositoryId?: string, public user?: IUser, public transaction?: ITransaction) {}
}
