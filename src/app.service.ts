import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from './modules/@redis/redis.service';
import exchanges from './mock-data/exchanges';
@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly redisService: RedisService) {}

  /**
   * INICIALIZANDO VALORES EN REDIS POR DEFAULT, podríamos usar esto
   * https://fastforex.readme.io/reference/get_currencies
   * y busar un api de currencies, probablemente fastForex o Bloomberg
   */
  onModuleInit(): void {
    const exchangeItems = exchanges.map((exchange) => {
      const { base, exchanges } = exchange;
      return Object.keys(exchanges).map((key) => {
        return { key: `${base}_${key}`, value: exchange.exchanges[key] };
      });
    });
    const flatItems = exchangeItems.flat();
    this.redisService.setMultiple(flatItems);
  }
}
