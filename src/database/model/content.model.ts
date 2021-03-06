import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LinkModel } from './link.model';

@Entity({ name: 'content' })
export class ContentModel {
  @PrimaryGeneratedColumn('uuid')
  content_id: string;

  @Column({ length: 255, type: 'varchar', nullable: false, unique: true })
  link_url: string;

  @Column({ length: 255, type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'timestamptz', nullable: false })
  date: Date;

  @Column({ name: 'link_id', nullable: false })
  link_id: string;

  @ManyToOne(() => LinkModel, (link) => link.content)
  @JoinColumn({ name: 'link_id' })
  link: LinkModel;
}
