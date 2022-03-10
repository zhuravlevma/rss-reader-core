import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserModel } from './user.model';

@Entity({ name: 'link' })
export class LinkModel {
  @PrimaryGeneratedColumn()
  link_id: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  link: string;

  @ManyToOne(() => UserModel, (user) => user.links)
  user: UserModel;
}
