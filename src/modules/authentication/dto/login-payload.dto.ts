import { TokenPayloadDto } from './token-payload.dto';
import {
  ClassField,
  StringField,
} from 'src/@common/decorators/field.decorators';

// Temporal para pruebas
class UserDto {
  @StringField({ swagger: true })
  userId: string;
}

export class LoginPayloadDto {
  @ClassField(() => UserDto)
  user: UserDto;

  @ClassField(() => TokenPayloadDto)
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
