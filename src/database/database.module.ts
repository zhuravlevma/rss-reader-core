import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModel } from './model/link.model';
import { UserModel } from './model/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'zhuravlevma',
      password: '',
      database: 'rss',
      entities: [LinkModel, UserModel],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
