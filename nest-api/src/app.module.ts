import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [
        AuthModule,
        UserModule,
        PrismaModule,
        ConfigModule.forRoot({
        isGlobal: true,  }),
        
      ],
  controllers: [],
  providers: [PrismaService],
})

export class AppModule {
  
}
