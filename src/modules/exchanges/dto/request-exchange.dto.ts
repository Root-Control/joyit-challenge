import { IsSameAt } from '@decorators/same-currency.decorator';
import { NumberField, CurrencyField } from '@decorators/field.decorators';

export class RequestExchangeDto {
  @CurrencyField({ swagger: true, toUpperCase: true })
  currencyOrigin: string;

  @CurrencyField({ swagger: true, toUpperCase: true })
  @IsSameAt('currencyOrigin', {
    message: 'Los currency no deben ser iguales',
  })
  destinationCurrency: string;

  @NumberField({ swagger: true })
  amount: number;
}
