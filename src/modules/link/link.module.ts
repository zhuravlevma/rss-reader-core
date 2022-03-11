import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModel } from '../../database/model/link.model';

@Module({
  imports: [TypeOrmModule.forFeature([LinkModel])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
