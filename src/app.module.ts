import { Module } from '@nestjs/common';
import { DescuentoModule } from './descuento/descuento.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Descuento } from './descuento/entity/descuento.entity';
import { Categoria } from './categoria/entity/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: "root",
      password: "clave123",
      database: 'EJEMPLO_PEDIDOS',
      entities: [
        Descuento,
        Categoria
      ]
    }),
    DescuentoModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
