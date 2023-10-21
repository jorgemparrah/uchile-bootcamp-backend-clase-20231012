import { CreateDescuentoDto } from "../dto/create-descuento.dto";
import { DescuentoDto } from "../dto/descuento.dto";
import { Descuento } from "../entity/descuento.entity";

export class DescuentoMapper {

  static toDto(entity: Descuento): DescuentoDto {
    if (!entity) {
      return null;
    }
    const dto =  new DescuentoDto();
    dto.id = entity.id;
    dto.porcentaje = entity.porcentaje;
    return dto;
  }

  static toDtoList(entities: Descuento[]): DescuentoDto[] {
    return entities.map(entity => this.toDto(entity));
  }

  static toEntity(dto: CreateDescuentoDto): Descuento {
    if (!dto) {
      return null;
    }
    const entity =  new Descuento();
    entity.id = dto.id;
    entity.porcentaje = dto.porcentaje;
    return entity;
  }

}