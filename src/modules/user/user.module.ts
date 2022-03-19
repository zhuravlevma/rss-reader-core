import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/database/constant';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseService } from '../../database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useFactory: (databaseService) => databaseService.getUserRepository(),
      inject: [DatabaseService],
    },
    {
      provide: UserService,
      useFactory: async (userRepository) => {
        return new UserService(userRepository);
      },
      inject: [UserRepository],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
