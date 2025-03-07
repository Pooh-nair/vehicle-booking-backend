import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../models/vehicle.entity';
import { Repository } from 'typeorm';
import { VehicleCategory } from 'src/models/vehicle-category.entity';
import { VehicleType } from 'src/models/vehicle-type.entity';
@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleCategory)
    private readonly vehicleCategoryRepository: Repository<VehicleCategory>,
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  async getAllTypesByCategory(categoryId: number): Promise<VehicleType[]> {
    const types = await this.vehicleTypeRepository.find({
      where: { category: { id: categoryId } },
    });
    return types;
  }

  async getAllCategoryNames(): Promise<VehicleCategory[]> {
    const categories = await this.vehicleCategoryRepository.find();
    return categories;
  }

  async getTypeWiseVehicles(typeId: number): Promise<Vehicle[]> {
    const vehicles = await this.vehicleRepository.find({
      where: { type: { id: typeId } },
    });
    return vehicles;
  }
}
