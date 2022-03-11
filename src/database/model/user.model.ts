import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LinkModel } from './link.model';

@Entity({ name: 'user' })
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ length: 255, type: 'varchar', nullable: false })
  username: string;

  @Column({ length: 255, type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => LinkModel, (link) => link.user)
  links: LinkModel[];
}
