import { Module } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';

@Module({
  imports: [],
  controllers: [ExchangesController],
  providers: [ExchangesService],
})
export class ExchangesModule {}
