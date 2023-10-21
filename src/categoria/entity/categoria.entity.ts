import { Descuento } from "src/descuento/entity/descuento.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: "CATEGORIAS" })
export class Categoria {

  @PrimaryColumn({ name: "nombre" })
  nombre: string;

  @Column({ name: "idDescuento" })
  idDescuento: number;

  @ManyToOne(() => Descuento)
  @JoinColumn({ name: "idDescuento" })
  descuento: Descuento;

}