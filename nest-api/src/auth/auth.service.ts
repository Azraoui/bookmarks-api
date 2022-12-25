import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()

export class AuthService {
    
    constructor (private prismaService: PrismaService) {}

    signIn () {
        return "user Sign In to the website"
    }
    
    signUp () {
        return "user Sign Up to the website"
    }
}
