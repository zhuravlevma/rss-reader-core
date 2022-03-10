import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LinkModel } from './link.model';

@Entity({ name: 'user' })
export class UserModel {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column({ length: 255, type: 'varchar' })
  username: string;

  @Column({ length: 255, type: 'varchar' })
  password: string;

  @OneToMany(() => LinkModel, (link) => link.user)
  links: LinkModel[];
}
