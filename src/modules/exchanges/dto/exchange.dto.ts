import { NumberField, CurrencyField } from '@decorators/field.decorators';

export class ExchangeDto {
  @CurrencyField({ swagger: true })
  currencyOrigin: string;

  @CurrencyField({ swagger: true })
  destinationCurrency: string;

  @NumberField({ swagger: true })
  exchangeRate: number;

  @NumberField({ swagger: true })
  amount: number;

  @NumberField({ swagger: true })
  amountAfterExchange: number;
}

export class UpdateExchangeDto {
  @CurrencyField({ swagger: true })
  currencyOrigin: string;

  @CurrencyField({ swagger: true })
  destinationCurrency: string;

  @NumberField({ swagger: true })
  exchangeRate: number;
}
