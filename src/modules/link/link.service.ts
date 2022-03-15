import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Repository } from 'typeorm';
import { LinkModel } from '../../database/model/link.model';
import { UserModel } from '../../database/model/user.model';

export class LinkService {
  constructor(private linkRepository: Repository<LinkModel>) {}

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
    return await this.linkRepository.find();
  }

  findAll(user_id: string) {
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
