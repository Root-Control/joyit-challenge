import { IsDifferentCurrency } from '@decorators/different-currency.decorator';
import { NumberField, CurrencyField } from '@decorators/field.decorators';
import { ToUpperCase } from '@decorators/transform.decorators';
import { Validate } from 'class-validator';

export class RequestExchangeDto {
  @ToUpperCase()
  @CurrencyField({ swagger: true })
  currencyOrigin: string;

  @ToUpperCase()
  @CurrencyField({ swagger: true })
  @Validate(IsDifferentCurrency, ['currencyOrigin'], {
    message: 'No puedes elegir el mismo currency para el exchange',
  })
  destinationCurrency: string;

  @NumberField({ swagger: true })
  amount: number;
}
