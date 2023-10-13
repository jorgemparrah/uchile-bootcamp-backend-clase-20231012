import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { DescuentoService } from './descuento.service';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';
import { DescuentoDto } from './dto/descuento.dto';

@Controller('descuento')
export class DescuentoController {
  constructor(private readonly descuentoService: DescuentoService) {}

  @Post()
  async create(@Body() createDescuentoDto: CreateDescuentoDto): Promise<DescuentoDto> {
    try {
      const resultado = await this.descuentoService.create(createDescuentoDto);
      return resultado;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(): Promise<DescuentoDto[]> {
    const resultado: DescuentoDto[] = await this.descuentoService.findAll();
    return resultado;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DescuentoDto> {
    const resultado: DescuentoDto = await this.descuentoService.findOne(+id);
    if (resultado) {
      return resultado;
    }
    throw new NotFoundException(`id = ${id} no encontrado`)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDescuentoDto: UpdateDescuentoDto) {
    return this.descuentoService.update(+id, updateDescuentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DescuentoDto> {
    try {
      const resultado = await this.descuentoService.remove(+id);
    return resultado;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
