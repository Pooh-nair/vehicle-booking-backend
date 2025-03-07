import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('get-all-categories')
  getAllCategories() {
    return this.vehicleService.getAllCategoryNames();
  }

  @Get('get-category-wise-types/:categoryId')
  getCategoryWiseTypes(@Param('categoryId') categoryId: number) {
    return this.vehicleService.getAllTypesByCategory(categoryId);
  }

  @Get('get-type-wise-vehicles/:typeId')
  getTypeWiseVehicles(@Param('typeId') typeId: number) {
    return this.vehicleService.getTypeWiseVehicles(typeId);
  }
}
