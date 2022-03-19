import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  imports: [ConfigService],
  providers: [
    ConfigService,
    {
      provide: DatabaseService,
      useFactory: async (configService) => {
        return new DatabaseService(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
