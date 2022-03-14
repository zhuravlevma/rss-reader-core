import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as convert from 'xml-js';
import { LinkService } from './link.service';
import { FindAllContentDto } from './dto/find-all-content.dto';
import { FindOneContentDto } from './dto/find-one-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ContentModel } from '../../database/model/content.model';
import { LinkModel } from '../../database/model/link.model';

@Injectable()
export class ContentService {
  constructor(
    private readonly linkService: LinkService,
    @InjectRepository(ContentModel)
    private contentRepository: Repository<ContentModel>,
    @InjectRepository(LinkModel)
    private linkRepository: Repository<LinkModel>,
  ) {}

  async findAll(findAllContentDto: FindAllContentDto, user_id: string) {
    const ids = await this.linkRepository
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.user', 'user')
      .select(['link.link_id'])
      .where('user.user_id = :user_id', { user_id })
      .getMany();
    console.log(ids);
    return this.contentRepository.find({
      where: {
        link_id: In(ids.map((el) => el.link_id)),
      },
      order: {
        date: 'DESC',
      },
    });
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
        let image;
        for (const item of el.elements) {
          const infoItem = {};
          if (item.name === 'image') {
            for (const elem of item.elements) {
              if (elem.name === 'url') {
                if (elem.elements[0].text) {
                  image = elem.elements[0].text;
                } else if (elem.elements[0].cdata) {
                  image = elem.elements[0].cdata;
                }
              }
            }
          }
          if (item.name !== 'item') continue;
          // console.log(item.elements);
          for (const info of item.elements) {
            if (info.name === 'title') {
              if (info.elements[0].cdata) {
                infoItem['title'] = info.elements[0].cdata;
              }
              if (info.elements[0].text) {
                infoItem['title'] = info.elements[0].text;
              }
            }
            if (info.name === 'guid') {
              if (info.elements[0].text) {
                infoItem['link'] = info.elements[0].text;
              }
              if (info.elements[0].cdata) {
                infoItem['link'] = info.elements[0].cdata;
              }
            }
            if (info.name === 'pubDate') {
              infoItem['date'] = new Date(info.elements[0].text);
            }
            if (info.name === 'description') {
              if (info.elements[0].text) {
                infoItem['description'] = info.elements[0].text;
              }
              if (info.elements[0].cdata) {
                infoItem['description'] = info.elements[0].cdata;
              }
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
              logo_url: image,
            }),
          );
        }
      }
      i += 1;
    }
    await this.contentRepository.upsert(items, ['link_url']);
  }
}
