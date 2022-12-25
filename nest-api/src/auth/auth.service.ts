import { Injectable } from '@nestjs/common';

@Injectable()

export class AuthService {
    
    signIn () {
        return "user Sign In to the website"
    }
    
    signUp () {
        return "user Sign Up to the website"
    }
}
