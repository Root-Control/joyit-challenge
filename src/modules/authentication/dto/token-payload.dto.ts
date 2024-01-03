import { NumberField, StringField } from '@decorators/field.decorators';

export class TokenPayloadDto {
  @NumberField({ swagger: true })
  expiresIn: number;

  @StringField({ swagger: true })
  accessToken: string;
}
