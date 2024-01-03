import { Inject, Injectable } from '@nestjs/common';
import { RedisClientIds } from './redis.const';
import { isJsonString } from '@common/utilities/utils';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  redis: Redis;
  /**
   *
   */
  constructor(@Inject(RedisClientIds.main) _redis: Redis) {
    this.redis = _redis;
  }

  set(key: string, value: string | number) {
    this.redis.set(key, value);
  }

  get<T>(key: string): Promise<T> {
    return new Promise((resolve) => {
      this.redis.get(key, (err, data: string | null) => {
        if (data) {
          if (isJsonString(data)) resolve(JSON.parse(data));
        } else {
          resolve(data as T);
        }
      });
    });
  }

  async setMultiple(
    keyValuePairs: { key: string; value: string }[],
  ): Promise<void> {
    const pipeline = this.redis.pipeline();

    keyValuePairs.forEach(({ key, value }) => {
      pipeline.set(key, value);
    });

    await pipeline.exec();
  }

  /**
   *
   * @param key Deletion by string or pattern
   * @param isPattern
   */
  async delete(key: string) {
    this.redis.del(key);
  }
}
