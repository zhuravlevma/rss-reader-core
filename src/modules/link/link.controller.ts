import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createLinkDto: CreateLinkDto) {
    const user = req.user;
    return this.linkService.create(createLinkDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const user = req.user;
    return this.linkService.findAll(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return this.linkService.update(id, updateLinkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.linkService.remove(id);
  }
}
