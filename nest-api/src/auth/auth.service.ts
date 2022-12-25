import { Injectable, Req } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()

export class AuthService {
    
    constructor (private prismaService: PrismaService) {}

    signIn (data: AuthDto): any {
        console.log(data)
        return {
            msg: 'user Sign In to the website',
            info: data
        }
    }
    
    signUp (data: AuthDto): any {
        console.log(data)
        return {
            msg: 'user Sign Up to the website',
            info: data
        }
    }
}
