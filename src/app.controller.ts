import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './modules/authentication/authentication.service';
import { LoginPayloadDto } from './modules/authentication/dto/login-payload.dto';
import { v4 } from 'uuid';
@Controller()
export class AppController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('get-token')
  async getJwtToken() {
    const userId = v4();
    const token = await this.authenticationService.createAccessToken({
      userId,
    });
    return new LoginPayloadDto({ userId }, token);
  }
}
