import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { RedisModule } from './modules/@redis/redis.module';
import { RedisClientIds } from './modules/@redis/redis.const';
import { IRedis } from './config/configuration.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    RedisModule.forRootAsync({
      providerId: RedisClientIds.main,
      useFactory: async (configService: ConfigService) => {
        const { host, port } = configService.get<IRedis>('redis');
        return { host, port };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
