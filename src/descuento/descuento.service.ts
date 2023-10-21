import { BadRequestException, ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { DescuentoDto } from './dto/descuento.dto';
import { DescuentoMapper } from './mapper/descuento.mapper';
import { Descuento } from './entity/descuento.entity';

@Injectable()
export class DescuentoService {

  em : EntityManager;

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(Descuento)
    private descuentoRepository: Repository<Descuento>
  ) {
    this.em = dataSource.manager;
  }

  async create(createDescuentoDto: CreateDescuentoDto): Promise<DescuentoDto> {
    // BUSCAMOS SI EXISTE EL ID
    const descuentoEncontrado = await this.descuentoRepository.exist({
      where: {
        id: createDescuentoDto.id
      }
    });
    if (descuentoEncontrado) {
      // SI EXISTE ENVIAMOS UN ERROR
      throw Error(`El id = ${createDescuentoDto.id} ya existe`);
    }
    // SI NO EXISTE LO CREAMOS
    const descuento: Descuento = DescuentoMapper.toEntity(createDescuentoDto);
    const resultado: Descuento = await this.descuentoRepository.save(descuento);
    return DescuentoMapper.toDto(resultado);
  }

  async findAll(): Promise<DescuentoDto[]> {
    const resultado: Descuento[] = await this.descuentoRepository.find({
      select: {
        id: true,
        porcentaje: true
      },
      relations: {
        categorias: true
      },
      order: {
        porcentaje: "ASC",
        id: "DESC",
      }
    });
    console.log(resultado);
    return DescuentoMapper.toDtoList(resultado);
  }

  async count(): Promise<number> {
    const resultado: number = await this.descuentoRepository.countBy({
      id: 5
    });
    return resultado;
  }

  async findOne(id: number): Promise<DescuentoDto> {
    const resultado: Descuento = await this.descuentoRepository.findOneOrFail({
      relations: {
        categorias: true
      },
      where: {
        id: id
      },
    })
    console.log(resultado);
    return DescuentoMapper.toDto(resultado);
  }

  async update(id: number, updateDescuentoDto: UpdateDescuentoDto): Promise<DescuentoDto> {
    // BUSCAMOS SI EXISTE EL ID
    const descuentoEncontrado = await this.descuentoRepository.exist({
      where: {
        id: id
      }
    });
    if (!descuentoEncontrado) {
      // SI NO EXISTE ENVIAMOS ERROR
      throw Error(`El id = ${id} no existe`);
    }

    // ACTUALIZACION CON SAVE
    //*//
    const entidadExistente: Descuento = await this.descuentoRepository.findOneBy({
      id: id
    });
    entidadExistente.porcentaje = updateDescuentoDto.porcentaje;
    const resultado: Descuento = await this.descuentoRepository.save(entidadExistente);
    return DescuentoMapper.toDto(resultado);
    /*/

    // ACTUALIZACION CON UPDATE
    const resultado = await this.descuentoRepository.update(id, {
      porcentaje: updateDescuentoDto.porcentaje
    });

    const actualizado: Descuento = await this.descuentoRepository.findOneBy({
      id: id
    });
    return DescuentoMapper.toDto(actualizado);
    //*/
  }

  async remove(id: number): Promise<DescuentoDto> {
    // BUSCAMOS SI EXISTE EL ID
    const descuentoEncontrado = await this.descuentoRepository.exist({
      where: {
        id: id
      }
    });
    if (!descuentoEncontrado) {
      // SI NO EXISTE ENVIAMOS ERROR
      throw Error(`El id = ${id} no existe`);
    }
    const entidadExistente: Descuento = await this.descuentoRepository.findOne({
      where: {
        id: id
      },
      relations: {
        categorias: true
      }
    });
    // ELIMINAR CON DEPENDENCIAS
    try {
      await this.em.transaction(async (transactionEM) => {
        await transactionEM.remove(entidadExistente.categorias);
        await transactionEM.remove(entidadExistente);
      });
    } catch (e) {
      console.log(e);
      throw Error("ERROR DE LA TRANSACCION");
    }
    return DescuentoMapper.toDto(entidadExistente);


    /* PARA LOS ELIMINAR DE ABAJO
    if (entidadExistente.categorias.length > 0) {
      throw Error(`El id = ${id} tiene categorias asociadas`);
    }
    */
    // ELIMINAR CON DELETE
    /*/
    const resultado = await this.descuentoRepository.delete(id);
    return DescuentoMapper.toDto(entidadExistente);
    /*/
    // ELIMINAR CON REMOVE
    const resultado: Descuento = await this.descuentoRepository.remove(entidadExistente);
    return DescuentoMapper.toDto(resultado);
    //*/

  }
}
