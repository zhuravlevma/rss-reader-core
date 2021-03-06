import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { FindAllContentDto } from '../dto/find-all-content.dto';
import { FindOneContentDto } from '../dto/find-one-content.dto';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query() findAllContentDto: FindAllContentDto) {
    const user = req.user;
    return this.contentService.findAll(findAllContentDto, user.userId);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async findAllJob() {
    return this.contentService.findAllForJob();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':user_id/:link_id')
  findOne(@Param() findOneContentDto: FindOneContentDto) {
    return this.contentService.findOne(findOneContentDto);
  }
}
