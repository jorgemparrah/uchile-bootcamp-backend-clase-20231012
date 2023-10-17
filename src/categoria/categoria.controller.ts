import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaDto } from './dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<CategoriaDto> {
    try {
      const resultado = await this.categoriaService.create(createCategoriaDto);
      return resultado;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(): Promise<CategoriaDto[]> {
    const resultado: CategoriaDto[] = await this.categoriaService.findAll();
    return resultado;
  }

  @Get(':nombre')
  async findOne(@Param('nombre') nombre: string): Promise<CategoriaDto>  {
    const resultado: CategoriaDto = await this.categoriaService.findOne(nombre);
    if (resultado) {
      return resultado;
    }
    throw new NotFoundException(`nombre = ${nombre} no encontrado`)
  }

  @Patch(':nombre')
  async update(@Param('nombre') nombre: string, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaDto> {
    try {
      const resultado = await this.categoriaService.update(nombre, updateCategoriaDto);
      return resultado;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Delete(':nombre')
  async remove(@Param('nombre') nombre: string): Promise<CategoriaDto>  {
    try {
      const resultado = await this.categoriaService.remove(nombre);
    return resultado;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
