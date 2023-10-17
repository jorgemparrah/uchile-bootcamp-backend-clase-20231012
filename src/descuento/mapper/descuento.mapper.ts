import { DescuentoDto } from "../dto/descuento.dto";

export class DescuentoMapper {

  static toDto(registro: any): DescuentoDto {
    const dto =  new DescuentoDto();
    dto.id = registro.id;
    dto.porcentaje = registro.porcentaje;
    return dto;
  }

  static toDtoList(registros: any[]): DescuentoDto[] {
    return registros.map(registro => this.toDto(registro));
  }

}