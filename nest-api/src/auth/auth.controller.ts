import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth/')

export class AuthController {

    authService: AuthService;
    constructor (authService: AuthService) {
        this.authService = authService;
    } // shortcode constructor (private authService: Authservice) {}

    @Post('signin')
    signIn ():string {
        return this.authService.signIn();
    }

    @Post('signup')
    signUp ():string {
        return this.authService.signUp();
    }

}
