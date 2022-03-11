import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';
import { FindAllContentDto } from './dto/find-all-content.dto';
import { FindOneContentDto } from './dto/find-one-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly linkService: ContentService) {}

  @Get(':user_id')
  findAll(@Param() findAllContentDto: FindAllContentDto) {
    return this.linkService.findAll(findAllContentDto);
  }

  @Get(':user_id/:link_id')
  findOne(@Param() findOneContentDto: FindOneContentDto) {
    return this.linkService.findOne(findOneContentDto);
  }
}
