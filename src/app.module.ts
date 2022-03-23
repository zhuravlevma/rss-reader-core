import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinkModule } from './modules/link/link.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    UserModule,
    LinkModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      ignoreEnvFile: false,
      ignoreEnvVars: false,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
