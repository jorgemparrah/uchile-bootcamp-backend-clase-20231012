import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { DescuentoModule } from 'src/descuento/descuento.module';

@Module({
  imports: [ DescuentoModule ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}
