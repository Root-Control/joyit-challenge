import { TokenType } from 'src/app.constants';

interface IJwtPayload {
  userId: string;
  type: TokenType;
}

export { IJwtPayload };
