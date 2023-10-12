import { Injectable } from '@nestjs/common';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';

@Injectable()
export class DescuentoService {
  create(createDescuentoDto: CreateDescuentoDto) {
    return 'This action adds a new descuento';
  }

  findAll() {
    return `This action returns all descuento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} descuento`;
  }

  update(id: number, updateDescuentoDto: UpdateDescuentoDto) {
    return `This action updates a #${id} descuento`;
  }

  remove(id: number) {
    return `This action removes a #${id} descuento`;
  }
}
