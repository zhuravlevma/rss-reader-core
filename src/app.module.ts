import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinkModule } from './modules/link/link.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, LinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
