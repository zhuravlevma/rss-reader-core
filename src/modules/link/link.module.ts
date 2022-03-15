import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { LinkModel } from '../../database/model/link.model';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { AuthModule } from '../auth/auth.module';
import { ContentModel } from '../../database/model/content.model';
import { databaseConfig } from '../../database/database.config';
import { createConnection } from 'typeorm';

@Module({
  imports: [AuthModule],
  controllers: [LinkController, ContentController],
  providers: [
    {
      provide: 'LinkRepository',
      useFactory: async () => {
        const connection = await createConnection(databaseConfig);
        return connection.getRepository(LinkModel);
      },
    },
    {
      provide: 'ContentRepository',
      useFactory: async () => {
        const connection = await createConnection(databaseConfig);
        return connection.getRepository(ContentModel);
      },
    },
    {
      provide: LinkService,
      useFactory: async (linkRepository) => {
        return new LinkService(linkRepository);
      },
      inject: ['LinkRepository'],
    },
    {
      provide: ContentService,
      useFactory: async (
        linkService: LinkService,
        contentRepository,
        linkRepository,
      ) => {
        return new ContentService(
          linkService,
          contentRepository,
          linkRepository,
        );
      },
      inject: [LinkService, 'ContentRepository', 'LinkRepository'],
    },
  ],
})
export class LinkModule {}
