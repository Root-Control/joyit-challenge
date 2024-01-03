import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenPayloadDto } from './dto/token-payload.dto';
import { TokenType } from 'src/app.constants';

@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(data: { userId: string }): Promise<TokenPayloadDto> {
    return {
      expiresIn: 60000,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
      }),
    };
  }
}
