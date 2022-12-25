import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth/')

export class AuthController {

    authService: AuthService;
    constructor (authService: AuthService) {
        this.authService = authService;
    } // shortcode constructor (private authService: Authservice) {}

    @Post('signin')
    signIn (@Req() req: Request) {
        return this.authService.signIn(req);
    }

    @Post('signup')
    signUp (@Req() req: Request):string {

        return this.authService.signUp(req);
    }

}
