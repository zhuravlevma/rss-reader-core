import { ContentModel } from './model/content.model';
import { LinkModel } from './model/link.model';
import { UserModel } from './model/user.model';
import { ConnectionOptions } from 'typeorm';

export const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'zhuravlevma',
  password: '',
  database: 'rss',
  entities: [LinkModel, UserModel, ContentModel],
  synchronize: true,
  logging: false,
};
