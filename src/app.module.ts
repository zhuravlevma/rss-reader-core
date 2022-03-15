import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinkModule } from './modules/link/link.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AuthModule, UserModule, LinkModule, ScheduleModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
