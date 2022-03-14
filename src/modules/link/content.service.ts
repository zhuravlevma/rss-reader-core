import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as convert from 'xml-js';
import { LinkService } from './link.service';
import { FindAllContentDto } from './dto/find-all-content.dto';
import { FindOneContentDto } from './dto/find-one-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentModel } from '../../database/model/content.model';

@Injectable()
export class ContentService {
  constructor(
    private readonly linkService: LinkService,
    @InjectRepository(ContentModel)
    private contentRepository: Repository<ContentModel>,
  ) {}

  async findAll(findAllContentDto: FindAllContentDto, user_id: string) {
    const links = await this.linkService.findAllByUserId(user_id);
    const linkUrls = links.map((link) => link.link);
    const xmlData = await Promise.all(linkUrls.map((url) => axios.get(url)));
    const data = xmlData.map(({ data }, idx) => ({
      link: linkUrls[idx],
      data: convert.xml2js(data),
    }));
    return data;
  }

  async findOne(findOneContentDto: FindOneContentDto) {
    const link = await this.linkService.findOne(findOneContentDto.link_id);
    const url = link.link;
    const { data } = await axios.get(url);
    return convert.xml2js(data);
  }

  async findAllForJob() {
    const links = await this.linkService.findAllForJob();
    const linkUrls = links.map((link) => link.link);
    const linkIds = links.map((link) => link.link_id);
    const xmlData = await Promise.all(linkUrls.map((url) => axios.get(url)));
    const items = [];
    let i = 0;
    for (const { data } of xmlData) {
      const xmlJson = convert.xml2js(data);
      for (const el of xmlJson.elements[0].elements) {
        for (const item of el.elements) {
          const infoItem = {};
          if (item.name !== 'item') continue;
          for (const info of item.elements) {
            if (info.name === 'title') {
              infoItem['title'] = info.elements[0].cdata;
            }
            if (info.name === 'guid') {
              infoItem['link'] = info.elements[0].text;
            }
            if (info.name === 'pubDate') {
              infoItem['date'] = new Date(info.elements[0].text);
            }
            if (info.name === 'description') {
              infoItem['description'] = info.elements[0].cdata;
            }
            infoItem['link_id'] = linkIds[i];
          }
          items.push(
            this.contentRepository.create({
              link_url: infoItem['link'],
              date: infoItem['date'],
              link_id: infoItem['link_id'],
              title: infoItem['title'],
              description: infoItem['description'],
            }),
          );
        }
      }
      i += 1;
    }
    await this.contentRepository.upsert(items, ['link_url']);
  }
}
