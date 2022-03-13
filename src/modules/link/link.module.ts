import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModel } from '../../database/model/link.model';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([LinkModel]), AuthModule],
  controllers: [LinkController, ContentController],
  providers: [LinkService, ContentService],
})
export class LinkModule {}
