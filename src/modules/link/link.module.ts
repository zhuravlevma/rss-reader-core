import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { ContentService } from './content/content.service';
import { ContentController } from './content/content.controller';
import { AuthModule } from '../auth/auth.module';
import { ContentRepository, LinkRepository } from '../../database/constant';
import { XmlService } from '../xml/xml.service';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseService } from '../../database/database.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LinkController, ContentController],
  providers: [
    XmlService,
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
      provide: LinkService,
      useFactory: async (linkRepository) => {
        return new LinkService(linkRepository);
      },
      inject: [LinkRepository],
    },
    {
      provide: ContentService,
      useFactory: async (
        linkService: LinkService,
        contentRepository,
        linkRepository,
        xmlService,
      ) => {
        return new ContentService(
          linkService,
          contentRepository,
          linkRepository,
          xmlService,
        );
      },
      inject: [LinkService, ContentRepository, LinkRepository, XmlService],
    },
  ],
})
export class LinkModule {}
