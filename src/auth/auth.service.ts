import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

import { JWT } from './models/auth.models';
import { IUserPayload } from './interfaces/auth.interface';


@Injectable()
export class AuthService {

    constructor(private readonly JwtService: JwtService) {}


    async validateToken(token: JWT['token']): Promise<IUserPayload> {
        const jwtPayload = await this.JwtService.verify(token);
        return jwtPayload;
    }

    async createToken(data: IUserPayload ): Promise<JWT> {
        const expiresIn: string = process.env.EXPIRES_TOKEN;
        const token: string = this.JwtService.sign(data, { expiresIn: `${expiresIn} days` });

        const result: any = { expiredAt: moment().add(expiresIn, 'days').valueOf(), token };
        return result;
    }
}