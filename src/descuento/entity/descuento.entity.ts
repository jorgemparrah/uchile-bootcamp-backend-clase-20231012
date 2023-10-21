import { Categoria } from "src/categoria/entity/categoria.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "DESCUENTOS" })
export class Descuento {

  @PrimaryColumn({ name: "id" })
  id: number;

  @Column({ name: "porcentaje" })
  porcentaje: number;

  @OneToMany(() => Categoria, (categoria) => categoria.descuento)
  categorias: Categoria[];

}