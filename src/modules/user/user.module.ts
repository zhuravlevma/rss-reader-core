import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from '../../database/model/user.model';
import { createConnection } from 'typeorm';
import { databaseConfig } from '../../database/database.config';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useFactory: async () => {
        const connection = await createConnection(databaseConfig);
        return connection.getRepository(UserModel);
      },
    },
    {
      provide: UserService,
      useFactory: async (userRepository) => {
        return new UserService(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
