import { Inject, Injectable } from '@nestjs/common';
import { RedisClientIds } from './redis.const';
import { isJsonString } from '../../@common/utils';
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

  set(key: string, value: string) {
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

  /**
   *
   * @param key Deletion by string or pattern
   * @param isPattern
   */
  async delete(key: string) {
    this.redis.del(key);
  }
}
