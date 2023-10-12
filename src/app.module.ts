import { Module } from '@nestjs/common';
import { DescuentoModule } from './descuento/descuento.module';

@Module({
  imports: [DescuentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
