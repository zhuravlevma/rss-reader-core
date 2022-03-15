import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Response,
} from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt.auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('accessToken', access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000 * 455),
      domain: false,
      // httpOnly: true,
    });
    return res.send({ access_token });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
