import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { GaurdService } from 'src/auth/guards';

@UseGuards(GaurdService)
@Controller('api/users/')

export class UserController {

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

}
