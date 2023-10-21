import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, IsNull, Like, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { CategoriaDto } from './dto/categoria.dto';
import { DescuentoDto } from 'src/descuento/dto/descuento.dto';
import { DescuentoService } from 'src/descuento/descuento.service';
import { CategoriaMapper } from './mapper/categoria.mapper';
import { Categoria } from 'src/categoria/entity/categoria.entity';

@Injectable()
export class CategoriaService {

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private descuentoService: DescuentoService,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<CategoriaDto> {
    // BUSCAMOS SI EXISTE EL ID
    const categoriaEncontrado = await this.findOne(createCategoriaDto.nombre);
    if (categoriaEncontrado) {
      // SI EXISTE ENVIAMOS UN ERROR
      throw Error(`El nombre = ${createCategoriaDto.nombre} ya existe`);
    }

    const descuentoEncontrado = await this.descuentoService.findOne(createCategoriaDto.idDescuento);
    if (!descuentoEncontrado) {
      // SI NO EXISTE ENVIAMOS UN ERROR
      throw Error(`El idDescuento = ${createCategoriaDto.idDescuento} no existe`);
    }

    // SI NO EXISTE LO CREAMOS
    let sql: string = `INSERT INTO CATEGORIAS(nombre, idDescuento) VALUES('${createCategoriaDto.nombre}', ${createCategoriaDto.idDescuento})`;
    const resultado = await this.dataSource.query(sql);
    return resultado;
  }

  async findAll(): Promise<CategoriaDto[]> {
    const resultado = await this.categoriaRepository.find({
      select: {
        nombre: true
      },
      relations: {
        descuento: true
      }
    });
    console.log(resultado);
    // let sql: string = "SELECT * FROM CATEGORIAS c INNER JOIN DESCUENTOS d ON c.idDescuento = d.id;";
    // const resultado = await this.dataSource.query(sql);
    return CategoriaMapper.toDtoList(resultado);
  }

  async findPage(cantidad: number, numeroPagina: number): Promise<CategoriaDto[]> {
    const resultado = await this.categoriaRepository.find({
      select: {
        nombre: true
      },
      relations: {
        descuento: true
      },
      order: {
        nombre: "ASC",
      },
      skip: (numeroPagina - 1) * cantidad,
      take: cantidad
    });
    return CategoriaMapper.toDtoList(resultado);
  }


  async findOne(nombre: string): Promise<CategoriaDto> {
    let sql: string = `SELECT * FROM CATEGORIAS c INNER JOIN DESCUENTOS d ON c.idDescuento = d.id WHERE nombre = '${nombre}';`;
    const resultado = await this.dataSource.query(sql);
    if (resultado.length === 0) {
      return null;
    }
    return CategoriaMapper.toDto(resultado[0]);
  }

  async findCategoriasByDescuento(idDescuento: number): Promise<CategoriaDto[]> {
    const resultado = await this.categoriaRepository.findBy({
      idDescuento: idDescuento
    });
    return CategoriaMapper.toDtoList(resultado);
  }

  async findCategoriasConMas50Descuento(): Promise<CategoriaDto[]> {
    const resultado = await this.categoriaRepository.find({
      where:[{
        descuento: {
          porcentaje: In([ 50, 60,  10 ])
        },
        nombre: Like("%Categoria%")
      },{
        idDescuento: IsNull()
      }],
      relations: {
        descuento: true
      }
    });
    return CategoriaMapper.toDtoList(resultado);
  }

  async update(nombre: string, updateCategoriaDto: UpdateCategoriaDto): Promise<CategoriaDto>  {
    // BUSCAMOS SI EXISTE EL ID
    const categoriaEncontrada = await this.findOne(nombre);
    if (!categoriaEncontrada) {
      // SI NO EXISTE ENVIAMOS ERROR
      throw Error(`El nombre = ${nombre} no existe`);
    }
    const descuentoEncontrado = await this.descuentoService.findOne(updateCategoriaDto.idDescuento);
    if (!descuentoEncontrado) {
      // SI NO EXISTE ENVIAMOS UN ERROR
      throw Error(`El idDescuento = ${updateCategoriaDto.idDescuento} no existe`);
    }
    // SI EXISTE ACTUALIZAMOS
    let sql: string = `UPDATE CATEGORIAS SET idDescuento = ${updateCategoriaDto.idDescuento} WHERE nombre = '${nombre}';`;
    console.log(sql);
    const resultado = await this.dataSource.query(sql);
    const actualizado = await this.findOne(nombre);
    return actualizado;
  }

  async remove(nombre: string): Promise<CategoriaDto> {
    // BUSCAMOS SI EXISTE EL ID
    const categoriaEncontrada = await this.findOne(nombre);
    if (!categoriaEncontrada) {
      // SI NO EXISTE ENVIAMOS ERROR
      throw Error(`El nombre = ${nombre} no existe`);
    }
    // SI EXISTE ELIMINAMOS
    let sql: string = `DELETE FROM CATEGORIAS WHERE nombre = '${nombre}';`;
    const resultado = await this.dataSource.query(sql);
    return categoriaEncontrada;
  }
}
