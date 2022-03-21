import {
  Connection,
  ConnectionOptions,
  createConnection,
  Repository,
} from 'typeorm';
import { UserModel } from './model/user.model';
import { ConfigService } from '@nestjs/config';
import { databaseConfig } from './database.config';
import { LinkModel } from './model/link.model';
import { ContentModel } from './model/content.model';

export class DatabaseService {
  private readonly connectionOptions: ConnectionOptions;
  constructor(private readonly config: ConfigService) {
    this.connectionOptions = {
      type: 'postgres',
      host: config.get('database.host'),
      port: config.get('database.port'),
      username: config.get('database.username'),
      password: '',
      database: 'rss',
      entities: [LinkModel, UserModel, ContentModel],
      synchronize: true,
      logging: false,
    };
  }
  async getUserRepository(): Promise<Repository<UserModel>> {
    const connection = await createConnection(this.connectionOptions);
    return connection.getRepository(UserModel);
  }

  async getLinkRepository(): Promise<Repository<LinkModel>> {
    const connection = await createConnection(this.connectionOptions);
    return connection.getRepository(LinkModel);
  }

  async getContentRepository(): Promise<Repository<ContentModel>> {
    const connection = await createConnection(this.connectionOptions);
    return connection.getRepository(ContentModel);
  }
}
