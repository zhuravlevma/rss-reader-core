import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LinkModel } from './link.enitity';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @OneToMany(() => LinkModel, (link) => link.user)
  links: LinkModel[];
}
