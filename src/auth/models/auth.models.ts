import { Document } from 'mongoose';

export interface JWT extends Document {
    readonly expiresIn: string;
    readonly token: string;
}