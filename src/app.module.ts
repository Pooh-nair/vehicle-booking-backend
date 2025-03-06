import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleController } from './controllers/vehicle.controller';
import { BookingController } from './controllers/booking.controller';
import { VehicleService } from './services/vehicle.service';
import { BookingService } from './services/booking.service';
import { Vehicle } from './models/vehicle.entity';
import { Booking } from './models/booking.entity';
import { VehicleCategory } from './models/vehicle-category.entity';
import { VehicleType } from './models/vehicle-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'vehicle_booking',
      synchronize: true,
      entities: [Vehicle, Booking, VehicleCategory, VehicleType],
    }),
    TypeOrmModule.forFeature([Vehicle, Booking, VehicleCategory, VehicleType]),
  ],
  controllers: [VehicleController, BookingController],
  providers: [VehicleService, BookingService],
})
export class AppModule {}
