import Redis from 'ioredis';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModuleAsyncOptions } from './redis.interface';

@Global()
@Module({})
export class RedisModule {
  static forRoot(params: {
    identifier: string;
    host: string | undefined;
    port: number;
  }) {
    const redis = new Redis({
      host: params.host,
      port: params.port,
    });
    redis.on('connect', () =>
      console.log(`Redis with id=${params.identifier} is now connected`),
    );
    redis.on('error', (err) =>
      console.error(`Redis Client Error (${params.identifier})`, err),
    );

    const redisProvider = {
      provide: params.identifier,
      useValue: redis,
    };

    return {
      module: RedisModule,
      providers: [redisProvider, RedisService],
      exports: [redisProvider, RedisService],
      global: true,
    };
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: options.providerId,
          useFactory: async (configService: ConfigService) => {
            const { host, port } = await options.useFactory(configService);
            const redis = new Redis({ host, port });

            redis.on('connect', () =>
              console.log(`Redis is now connected from async`),
            );
            redis.on('error', (err) =>
              console.error(`Redis Client Error`, err),
            );

            return redis;
          },
          inject: options.inject || [],
        },
        RedisService,
      ],
      exports: [options.providerId, RedisService],
    };
  }
}
