import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { GaurdService } from 'src/auth/guards';

@Controller('api/users/')

export class UserController {

    @UseGuards(GaurdService)
    @Get('me')
    getMe(@User() user) {
        return user;
    }

}
