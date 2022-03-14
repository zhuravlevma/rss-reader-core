import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkModel } from '../../database/model/link.model';
import { UserModel } from '../../database/model/user.model';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkModel)
    private linkRepository: Repository<LinkModel>,
    @InjectRepository(UserModel)
    private usersRepository: Repository<LinkModel>,
  ) {}

  create(createLinkDto: CreateLinkDto, user_id: string) {
    const user = new UserModel();
    user.user_id = user_id;
    const link = this.linkRepository.create({
      ...createLinkDto,
      user: [user],
    });
    return this.linkRepository.save(link);
  }

  async findAllForJob() {
    const data = await this.linkRepository.find();
    return data;
  }

  findAll(user_id: string) {
    return this.linkRepository
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.user', 'user')
      .select(['link.link_id', 'link.name', 'link.link', 'link.description'])
      .where('user.user_id = :user_id', { user_id })
      .getMany();
  }

  findAllByUserId(user_id: string) {
    return this.linkRepository
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.user', 'user')
      .select(['link.link_id', 'link.name', 'link.link', 'link.description'])
      .where('user.user_id = :user_id', { user_id })
      .getMany();
  }

  findOne(id: string) {
    return this.linkRepository.findOne(id);
  }

  update(id: string, updateLinkDto: UpdateLinkDto) {
    return this.linkRepository.update(id, updateLinkDto);
  }

  remove(id: string) {
    return this.linkRepository.delete(id);
  }
}
