import { Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface RedisModuleAsyncOptions {
  providerId: string;
  useFactory: (configService: ConfigService) => Promise<{
    host: string;
    port: number;
  }>;
  inject: Type<any>[];
}

export { RedisModuleAsyncOptions };
