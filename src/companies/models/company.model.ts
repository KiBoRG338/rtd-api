import { Document } from 'mongoose';

export interface Company extends Document {
    readonly _id: string;
    readonly email: string;
    readonly name: string;
    readonly ownerId: string;
    readonly website: string;
    readonly roleId: number;
    readonly type: string;
    readonly memberIds: [string];
}