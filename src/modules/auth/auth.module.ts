import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1060s' },
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: AuthService,
      useFactory: async (userService, jwtService) => {
        return new AuthService(userService, jwtService);
      },
      inject: [UserService, JwtService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
