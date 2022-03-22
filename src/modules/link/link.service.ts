import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Repository } from 'typeorm';
import { LinkModel } from '../../database/model/link.model';
import { UserModel } from '../../database/model/user.model';

export class LinkService {
  constructor(private linkRepository: Repository<LinkModel>) {}

  async create(createLinkDto: CreateLinkDto, user_id: string) {
    const user = new UserModel();
    user.user_id = user_id;
    const searched = await this.linkRepository.findOne({
      relations: ['user'],
      where: {
        link: createLinkDto.link,
      },
    });
    if (searched) {
      searched.user = [...searched.user, user];
      await this.linkRepository.save(searched);
      return { link_id: searched.link_id, link: searched.link };
    }
    const link = this.linkRepository.create({
      ...createLinkDto,
      user: [user],
    });
    const saved = await this.linkRepository.save(link);
    return { link_id: saved.link_id, link: saved.link };
  }

  async findAllForJob() {
    return await this.linkRepository.find();
  }

  findAll(user_id: string) {
    return this.linkRepository
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.user', 'user')
      .select(['link.link_id', 'link.link'])
      .where('user.user_id = :user_id', { user_id })
      .getMany();
  }

  findOne(id: string) {
    return this.linkRepository.findOne(id);
  }

  update(id: string, updateLinkDto: UpdateLinkDto) {
    return this.linkRepository.update(id, updateLinkDto);
  }

  async remove(id: string, userId: string) {
    const link = await this.linkRepository.findOne(id, {
      relations: ['user'],
    });
    link.user = link.user.filter((user) => {
      return user.user_id !== userId;
    });
    await this.linkRepository.save(link);
    return true;
  }
}
