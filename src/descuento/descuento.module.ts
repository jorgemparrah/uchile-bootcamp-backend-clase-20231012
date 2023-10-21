import { Module } from '@nestjs/common';
import { DescuentoService } from './descuento.service';
import { DescuentoController } from './descuento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descuento } from './entity/descuento.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Descuento ]) ],
  controllers: [DescuentoController],
  providers: [DescuentoService],
  exports: [DescuentoService]
})
export class DescuentoModule {}
