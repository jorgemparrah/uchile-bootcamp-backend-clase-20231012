import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DescuentoDto } from './dto/descuento.dto';
import { DescuentoMapper } from './mapper/descuento.mapper';

@Injectable()
export class DescuentoService {

  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  async create(createDescuentoDto: CreateDescuentoDto): Promise<DescuentoDto> {
    // BUSCAMOS SI EXISTE EL ID
    const descuentoEncontrado = await this.findOne(createDescuentoDto.id);
    if (descuentoEncontrado) {
      // SI EXISTE ENVIAMOS UN ERROR
      throw Error(`El id = ${createDescuentoDto.id} ya existe`);
    }
    // SI NO EXISTE LO CREAMOS
    let sql: string = `INSERT INTO DESCUENTOS(id, porcentaje) VALUES(${createDescuentoDto.id}, ${createDescuentoDto.porcentaje})`;
    const resultado = await this.dataSource.query(sql);
    return resultado;
  }

  async findAll(): Promise<DescuentoDto[]> {
    let sql: string = "SELECT * FROM DESCUENTOS";
    const resultado = await this.dataSource.query(sql);
    return resultado;
  }

  async findOne(id: number): Promise<DescuentoDto> {
    let sql: string = `SELECT * FROM DESCUENTOS WHERE id = ${id};`;
    const resultado = await this.dataSource.query(sql);
    if (resultado.length === 0) {
      return null;
    }
    return DescuentoMapper.toDto(resultado[0]);
  }

  async update(id: number, updateDescuentoDto: UpdateDescuentoDto): Promise<DescuentoDto> {
    // BUSCAMOS SI EXISTE EL ID
    const descuentoEncontrado = await this.findOne(id);
    if (!descuentoEncontrado) {
      // SI NO EXISTE ENVIAMOS ERROR
      throw Error(`El id = ${id} no existe`);
    }
    // SI EXISTE ACTUALIZAMOS
    let sql: string = `UPDATE DESCUENTOS SET porcentaje = ${updateDescuentoDto.porcentaje} WHERE id = ${id};`;
    console.log(sql);
    const resultado = await this.dataSource.query(sql);
    const actualizado = await this.findOne(id);
    return actualizado;
  }

  async remove(id: number): Promise<DescuentoDto> {
    // BUSCAMOS SI EXISTE EL ID
    const descuentoEncontrado = await this.findOne(id);
    if (!descuentoEncontrado) {
      // SI NO EXISTE ENVIAMOS ERROR
      throw Error(`El id = ${id} no existe`);
    }
    // SI EXISTE ELIMINAMOS
    let sql: string = `DELETE FROM DESCUENTOS WHERE id = ${id};`;
    const resultado = await this.dataSource.query(sql);
    return descuentoEncontrado;
  }
}
