import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DescuentoDto } from './dto/descuento.dto';

@Injectable()
export class DescuentoService {

  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  async create(createDescuentoDto: CreateDescuentoDto): Promise<DescuentoDto> {
    const descuentoEncontrado = await this.findOne(createDescuentoDto.id);
    if (descuentoEncontrado) {
      throw Error(`El id = ${createDescuentoDto.id} ya existe`);
    }
    let sql: string = `INSERT INTO DESCUENTOS(id, porcentaje) VALUES(${createDescuentoDto.id}, ${createDescuentoDto.descuento})`;
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
    return resultado[0];
  }

  update(id: number, updateDescuentoDto: UpdateDescuentoDto) {
    return `This action updates a #${id} descuento`;
  }

  async remove(id: number): Promise<DescuentoDto> {
    const descuentoEncontrado = await this.findOne(id);
    if (!descuentoEncontrado) {
      throw Error(`El id = ${id} no existe`);
    }
    let sql: string = `DELETE FROM DESCUENTOS WHERE id = ${id};`;
    const resultado = await this.dataSource.query(sql);
    return descuentoEncontrado;
  }
}
