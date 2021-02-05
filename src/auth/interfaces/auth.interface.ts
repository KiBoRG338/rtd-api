import { UserModel } from 'src/users/models/user.model';

export class IUserPayload {
    readonly userId: UserModel['_id']; 
    readonly roleId: UserModel['roleId'];
    readonly type: UserModel['type'];
    readonly companyId: UserModel['companyId']; 
}