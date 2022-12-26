import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto } from 'src/dto';
import { AuthService } from './auth.service';

@Controller('api/auth/')

export class AuthController {

    authService: AuthService;
    constructor (authService: AuthService) {
        this.authService = authService;
    } // shortcode constructor (private authService: Authservice) {}

    @Post('signin')
    signIn (@Body() data: AuthDto): Promise<User> {
        return this.authService.signIn(data);
    }

    @Post('signup')
    signUp (@Body() data: AuthDto): Promise<User> {

        return this.authService.signUp(data);
    }

}
