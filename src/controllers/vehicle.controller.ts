import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}
  // GET /vehicles/category/:categoryId - Fetch vehicles by category
  //   @Get('category/:category')
  //   getVehiclesByCategory(@Param('categoryId') categoryId: number) {
  //     return this.vehicleService.getVehiclesByCategory(categoryId);
  //   }

  @Get('all-categories')
  getAllCategories() {
    return this.vehicleService.getAllCategoryNames();
  }
}
