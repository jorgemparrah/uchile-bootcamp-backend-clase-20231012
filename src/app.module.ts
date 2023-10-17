import { Module } from '@nestjs/common';
import { DescuentoModule } from './descuento/descuento.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: "root",
      password: "clave123",
      database: 'EJEMPLO_PEDIDOS'
    }),
    DescuentoModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
