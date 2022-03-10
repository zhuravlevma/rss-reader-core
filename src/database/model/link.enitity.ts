import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class LinkModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  link: string;

  @ManyToOne(() => UserModel, (user) => user.links)
  user: UserModel;
}
