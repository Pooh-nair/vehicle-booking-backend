import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VehicleType } from './vehicle-type.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VehicleType)
  type: VehicleType; // 'hatchback', 'suv', 'sedan', etc.

  @Column()
  vehicleName: string; // Specific vehicle name
}
