import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';


@Injectable()

export class AuthService {
    
    constructor ( private prisma: PrismaService,
                  private jwt: JwtService, ) {}

    async signUp (data: AuthDto): Promise<User> {
        
        // Generate The Password hash
        try {
            const hash = await argon.hash(data.password);
    
            // save the new user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    hash
                }
            })
    
            // return the saved user
            delete user.hash
            return user
        }
        catch (error)
        {
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code === 'P2002'){
                    throw new ForbiddenException (
                        'Credentials taken'
                    );
                }
            }
            throw error
        }
    }
    
    async signIn (data: AuthDto): Promise<User> {
        
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        // if user does not exist throw exception
        if (!user){
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        }

        // compare password
        const pwMatches = await argon.verify(
            user.hash,
            data.password
        )
        // if password incorrect throw exception
        if (!pwMatches) {
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        }

        delete user.hash
        // send back the user
        return user
    }

    async signToken (userId: number, email: string) {
        
    }
}
