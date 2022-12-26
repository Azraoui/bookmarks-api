import { ForbiddenException, Injectable, Req } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()

export class AuthService {
    
    constructor ( private prisma: PrismaService,
                  private jwt: JwtService, private config: ConfigService) {}

    async signUp (data: AuthDto) {
        
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
            return this.signToken(user.id, user.email);
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
    
    async signIn (data: AuthDto) {
        
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

        // send back the user
        return this.signToken(user.id, user.email);
    }

    // signToken with jwt
    async signToken (userId: number, email: string) {

        // seting payloud for jwt
        const payloud = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET');
        const expiredTime = this.config.get('JWT_EXPIRED_TIME');
        // return jwt signAsync promise
        const token = await this.jwt.signAsync(payloud, {
            expiresIn: '15m',
            secret: secret
        })
        return {
            access_token: token,
        }
    }
}
