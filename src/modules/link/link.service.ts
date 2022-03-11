import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkModel } from '../../database/model/link.model';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkModel)
    private linkRepository: Repository<LinkModel>,
  ) {}

  create(createLinkDto: CreateLinkDto) {
    const link = this.linkRepository.create(createLinkDto);
    return this.linkRepository.save(link);
  }

  findAll() {
    return this.linkRepository.find();
  }

  findAllByUserId(user_id: string) {
    return this.linkRepository.find({ user_id: user_id });
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
