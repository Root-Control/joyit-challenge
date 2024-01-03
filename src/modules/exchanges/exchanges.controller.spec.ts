import { Test, TestingModule } from '@nestjs/testing';
import { ExchangesController } from './exchanges.controller';
import { ExchangesService } from './exchanges.service';
import { ExchangeDto } from './dto/exchange.dto';
import { RequestExchangeDto } from './dto/request-exchange.dto';

describe('ExchangesController', () => {
  let controller: ExchangesController;
  let service: ExchangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangesController],
      providers: [
        {
          provide: ExchangesService,
          useValue: {
            applyExchangeRate: jest.fn().mockImplementation(() => {
              const exchangeDto = new ExchangeDto();
              return Promise.resolve(exchangeDto);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ExchangesController>(ExchangesController);
    service = module.get<ExchangesService>(ExchangesService);
  });

  it('should request an exchange', async () => {
    const requestDto = new RequestExchangeDto();
    requestDto.amount = 100;
    requestDto.currencyOrigin = 'PEN';
    requestDto.destinationCurrency = 'USD';

    const result = await controller.create(requestDto);

    expect(result).toBeInstanceOf(ExchangeDto);
    expect(service.applyExchangeRate).toHaveBeenCalledWith(requestDto);
  });
});
