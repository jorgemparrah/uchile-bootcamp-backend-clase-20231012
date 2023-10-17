import { DescuentoMapper } from "src/descuento/mapper/descuento.mapper";
import { CategoriaDto } from "../dto/categoria.dto";

export class CategoriaMapper {

  static toDto(registro: any): CategoriaDto {
    const dto =  new CategoriaDto();
    dto.nombre = registro.nombre;
    dto.descuento = DescuentoMapper.toDto(registro);
    return dto;
  }

  static toDtoList(registros: any[]): CategoriaDto[] {
    return registros.map(registro => this.toDto(registro));
  }

}