import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserModel } from './user.model';

@Entity({ name: 'link' })
export class LinkModel {
  @PrimaryGeneratedColumn('uuid')
  link_id: string;

  @Column({ length: 255, type: 'varchar', nullable: false })
  name: string;

  @Column({ length: 255, type: 'varchar', nullable: false })
  link: string;

  @Column({ name: 'user_id', nullable: false })
  user_id: string;

  @ManyToOne(() => UserModel, (user) => user.links, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}
