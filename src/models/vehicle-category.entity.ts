import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class VehicleCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;
}
