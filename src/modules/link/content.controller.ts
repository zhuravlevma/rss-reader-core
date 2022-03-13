import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { FindAllContentDto } from './dto/find-all-content.dto';
import { FindOneContentDto } from './dto/find-one-content.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly linkService: ContentService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':user_id')
  findAll(@Request() req, @Param() findAllContentDto: FindAllContentDto) {
    const user = req.user;
    return this.linkService.findAll(findAllContentDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':user_id/:link_id')
  findOne(@Param() findOneContentDto: FindOneContentDto) {
    return this.linkService.findOne(findOneContentDto);
  }
}
