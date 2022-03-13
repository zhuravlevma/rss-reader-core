import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as convert from 'xml-js';
import { LinkService } from './link.service';
import { FindAllContentDto } from './dto/find-all-content.dto';
import { FindOneContentDto } from './dto/find-one-content.dto';

@Injectable()
export class ContentService {
  constructor(private readonly linkService: LinkService) {}

  async findAll(findAllContentDto: FindAllContentDto, user_id: string) {
    const links = await this.linkService.findAllByUserId(user_id);
    const linkUrls = links.map((link) => link.link);
    const xmlData = await Promise.all(linkUrls.map((url) => axios.get(url)));
    return xmlData.map(({ data }, idx) => ({
      link: linkUrls[idx],
      data: convert.xml2js(data),
    }));
  }

  async findOne(findOneContentDto: FindOneContentDto) {
    const link = await this.linkService.findOne(findOneContentDto.link_id);
    const url = link.link;
    const { data } = await axios.get(url);
    return convert.xml2js(data);
  }
}
