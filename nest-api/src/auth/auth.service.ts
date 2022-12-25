import { Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()

export class AuthService {
    
    constructor (private prismaService: PrismaService) {}

    signIn (req: Request) {
        return "user Sign In to the website"
    }
    
    signUp (req: Request) {
        return "user Sign Up to the website"
    }
}
