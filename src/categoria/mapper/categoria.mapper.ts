import { DescuentoMapper } from "src/descuento/mapper/descuento.mapper";
import { CategoriaDto } from "../dto/categoria.dto";
import { Categoria } from "../entity/categoria.entity";

export class CategoriaMapper {

  static toDto(entidad: Categoria): CategoriaDto {
    const dto =  new CategoriaDto();
    dto.nombre = entidad.nombre;
    dto.descuento = DescuentoMapper.toDto(entidad.descuento);
    return dto;
  }

  static toDtoList(entidades: Categoria[]): CategoriaDto[] {
    return entidades.map(entidad => this.toDto(entidad));
  }

}