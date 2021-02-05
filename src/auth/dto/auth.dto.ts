import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserModel } from '../../users/models/user.model';


export class AuthDTO {
    @IsNotEmpty()
    @IsEmail()
    email: UserModel['email'];
    
    @IsNotEmpty() 
    password: UserModel['password'];
};