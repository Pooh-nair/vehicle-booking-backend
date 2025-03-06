import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VehicleCategory } from './vehicle-category.entity';

@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeName: string;

  @ManyToOne(() => VehicleCategory)
  category: VehicleCategory;
}
