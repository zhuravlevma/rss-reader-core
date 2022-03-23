import axios from 'axios';
import { LinkService } from '../link.service';
import { FindAllContentDto } from '../dto/find-all-content.dto';
import { FindOneContentDto } from '../dto/find-one-content.dto';
import { In, Repository } from 'typeorm';
import { ContentModel } from '../../../database/model/content.model';
import { LinkModel } from '../../../database/model/link.model';
import { XmlService } from '../../xml/xml.service';
import * as fs from 'fs';

export class ContentService {
  constructor(
    private readonly linkService: LinkService,
    private readonly contentRepository: Repository<ContentModel>,
    private readonly linkRepository: Repository<LinkModel>,
    private readonly xmlService: XmlService,
  ) {}

  async findAll(findAllContentDto: FindAllContentDto, user_id: string) {
    const ids = await this.linkRepository
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.user', 'user')
      .select(['link.link_id'])
      .where('user.user_id = :user_id', { user_id })
      .getMany();
    return this.contentRepository.find({
      where: {
        link_id: In(ids.map((el) => el.link_id)),
      },
      order: {
        date: 'DESC',
      },
      take: +findAllContentDto.take,
      skip: +findAllContentDto.start,
    });
  }

  async findOne(findOneContentDto: FindOneContentDto) {
    const link = await this.linkService.findOne(findOneContentDto.link_id);
    const url = link.link;
    try {
      const { data } = await axios.get(url);
      return this.xmlService.convertFromXml(data);
    } catch (err) {
      console.error(err);
    }
  }

  async findAllForJob() {
    const links = await this.linkService.findAllForJob();
    const linkUrls = links.map((link) => link.link);
    const linkIds = links.map((link) => link.link_id);
    const xmlData = await Promise.all(linkUrls.map((url) => axios.get(url)));
    const items = [];
    const infoSet = new Set(['title', 'link', 'pubDate', 'description']);
    let i = 0;
    for (const { data } of xmlData) {
      const xmlJson = this.xmlService.convertFromXml(data);
      for (const el of this.xmlService.getChannelElement(xmlJson)) {
        for (const item of this.xmlService.getItems(el)) {
          const infoItem = {};
          if (item.name !== 'item') continue;
          for (const info of item.elements) {
            if (infoSet.has(info.name)) {
              infoItem[info.name] = this.xmlService.getXmlTextFromColumn(info);
            }
            infoItem['link_id'] = linkIds[i];
          }
          items.push(
            this.contentRepository.create({
              link_url: infoItem['link'],
              date: infoItem['pubDate'],
              link_id: infoItem['link_id'],
              title: infoItem['title'],
              description: infoItem['description'],
            }),
          );
        }
      }
      i += 1;
    }
    // comment
    await this.contentRepository.upsert(items, ['link_url']);
  }
}
