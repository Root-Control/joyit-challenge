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

    /**
     * Building key  Pairs
     */
    const currencyPairKey = `${destinationCurrency}_${currencyOrigin}`;
    const inverseCurrencyPairKey = `${currencyOrigin}_${destinationCurrency}`;

    try {
      /**
       * Applying exchange , if not, take the inverted one
       */
      const exchangeRate = await this.redisService.get<number>(currencyPairKey);
      const invertedExchangeRate = await this.redisService.get<number>(
        inverseCurrencyPairKey,
      );

      /**
       * Intentional throw if exchange Pairs doesn't exist
       */
      if (!exchangeRate && !invertedExchangeRate) {
        throw new Error('Currency pairs not supported');
      }

      /**
       * Regular and inverted calculation depending of the ase
       */
      const amountAfterExchange = exchangeRate
        ? amount / exchangeRate
        : invertedExchangeRate * amount;

      /**
       * Dto build
       */
      const exchangeDto = {
        ...requestExchangeDto,
        exchangeRate: exchangeRate || invertedExchangeRate,
        amountAfterExchange,
      };

      /**
       * Dto transformation, to validate exposures
       */
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
