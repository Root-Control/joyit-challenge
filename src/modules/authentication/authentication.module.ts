import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtConfig } from 'src/config/configuration.interface';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get<IJwtConfig>('jwt');
        return {
          privateKey: jwtConfig.privateKey,
          publicKey: jwtConfig.publicKey,
          signOptions: {
            algorithm: 'RS256',
          },
          verifyOptions: {
            algorithms: ['RS256'],
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
