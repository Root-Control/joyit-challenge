import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestExchangeDto } from './dto/request-exchange.dto';
import { RedisService } from '../@redis/redis.service';
import { ExchangeDto, UpdateExchangeDto } from './dto/exchange.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ExchangesService {
  constructor(private readonly redisService: RedisService) {}

  /**
   *
   * @param requestExchangeDto
   * @returns
   */
  async applyExchangeRate(requestExchangeDto: RequestExchangeDto) {
    const { currencyOrigin, destinationCurrency, amount } = requestExchangeDto;

    // Construye las claves para buscar las tasas de cambio en Redis.
    const currencyPairKey = `${destinationCurrency}_${currencyOrigin}`;
    const inverseCurrencyPairKey = `${currencyOrigin}_${destinationCurrency}`;

    try {
      // Intenta obtener la tasa de cambio directa e inversa.
      const exchangeRate = await this.redisService.get<number>(currencyPairKey);
      const invertedExchangeRate = await this.redisService.get<number>(
        inverseCurrencyPairKey,
      );

      if (!exchangeRate && !invertedExchangeRate) {
        throw new Error('Currency pairs not supported');
      }
      const amountAfterExchange = exchangeRate
        ? amount / exchangeRate
        : invertedExchangeRate * amount;

      const exchangeDto = {
        ...requestExchangeDto,
        exchangeRate: exchangeRate || invertedExchangeRate,
        amountAfterExchange,
      };

      return plainToClass(ExchangeDto, exchangeDto);
    } catch (ex) {
      throw new HttpException(ex.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updateExchangeRate(updateExchangeDto: UpdateExchangeDto) {
    const { currencyOrigin, destinationCurrency } = updateExchangeDto;

    const currencyPairKey = `${currencyOrigin}_${destinationCurrency}`;
    await this.redisService.set(
      currencyPairKey,
      updateExchangeDto.exchangeRate,
    );
    return updateExchangeDto;
  }
}
