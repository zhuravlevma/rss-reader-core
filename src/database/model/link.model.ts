import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ContentModel } from './content.model';
import { UserModel } from './user.model';

@Entity({ name: 'link' })
export class LinkModel {
  @PrimaryGeneratedColumn('uuid')
  link_id: string;

  @Column({ length: 255, type: 'varchar', nullable: false, unique: true })
  link: string;

  @OneToMany(() => ContentModel, (content) => content.link, {
    cascade: true,
  })
  content: ContentModel[];

  @ManyToMany(() => UserModel)
  @JoinTable({
    name: 'user_to_link',
    joinColumn: {
      name: 'link_id',
      referencedColumnName: 'link_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
  })
  user: UserModel[];
}
