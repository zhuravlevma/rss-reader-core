import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { LinkModel } from './link.model';

@Entity({ name: 'user' })
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ length: 255, type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ length: 255, type: 'varchar', nullable: false })
  password: string;

  @ManyToMany(() => LinkModel)
  @JoinTable({
    name: 'user_to_link',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'link_id',
      referencedColumnName: 'link_id',
    },
  })
  links: LinkModel[];
}
