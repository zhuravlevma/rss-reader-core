import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { ContentRepository, LinkRepository, UserRepository } from './constant';

@Module({
  providers: [
    ConfigService,
    {
      provide: DatabaseService,
      useFactory: async (configService) => {
        return new DatabaseService(configService);
      },
      inject: [ConfigService],
    },
    {
      provide: LinkRepository,
      useFactory: async (databaseService) =>
        databaseService.getLinkRepository(),
      inject: [DatabaseService],
    },
    {
      provide: ContentRepository,
      useFactory: async (databaseService) =>
        databaseService.getContentRepository(),
      inject: [DatabaseService],
    },
    {
      provide: UserRepository,
      useFactory: (databaseService) => databaseService.getUserRepository(),
      inject: [DatabaseService],
    },
  ],
  exports: [UserRepository, LinkRepository, ContentRepository],
})
export class DatabaseModule {}
