import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
