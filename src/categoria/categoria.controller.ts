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

  @Get("descuento-mayor-50")
  async findByDescuentoMayorDe50(): Promise<CategoriaDto[]> {
    const resultado: CategoriaDto[] = await this.categoriaService.findCategoriasConMas50Descuento();
    return resultado;
  }

  @Get('page/:cantidad/:numeroPagina')
  async findPage(@Param('cantidad') cantidad: number, @Param('numeroPagina') numeroPagina: number): Promise<CategoriaDto[]> {
    const resultado: CategoriaDto[] = await this.categoriaService.findPage(cantidad, numeroPagina);
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

  @Get('descuento/:idDescuento')
  async findByDescuento(@Param('idDescuento') idDescuento: number): Promise<CategoriaDto[]>  {
    const resultado: CategoriaDto[] = await this.categoriaService.findCategoriasByDescuento(idDescuento);
    return resultado;
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
