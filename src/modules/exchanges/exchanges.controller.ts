import { Controller, Post, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExchangeDto, UpdateExchangeDto } from './dto/exchange.dto';
import { RequestExchangeDto } from './dto/request-exchange.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Exchanges')
@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @ApiOperation({ summary: 'Create an exchange' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Exchange successfully created.',
    type: ExchangeDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  @Post()
  create(@Body() requestExchangeDto: RequestExchangeDto): Promise<ExchangeDto> {
    return this.exchangesService.applyExchangeRate(requestExchangeDto);
  }

  @ApiOperation({ summary: 'Update exchange Rate' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exchange successfully created.',
    type: ExchangeDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  @Post('update-exchange-rate')
  updateExchangePair(
    @Body() updateExchangeDto: UpdateExchangeDto,
  ): Promise<any> {
    return this.exchangesService.updateExchangeRate(updateExchangeDto);
  }
}
