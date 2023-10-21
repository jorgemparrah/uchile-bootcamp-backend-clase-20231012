import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { DescuentoModule } from 'src/descuento/descuento.module';
import { Categoria } from './entity/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ DescuentoModule, TypeOrmModule.forFeature([ Categoria ]) ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}
