import { Module } from '@nestjs/common';
import { DescuentoService } from './descuento.service';
import { DescuentoController } from './descuento.controller';

@Module({
  controllers: [DescuentoController],
  providers: [DescuentoService],
})
export class DescuentoModule {}
