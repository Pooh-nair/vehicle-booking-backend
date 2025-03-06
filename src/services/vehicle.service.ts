import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../models/vehicle.entity';
import { Repository } from 'typeorm';
import { VehicleType } from 'src/models/vehicle-type.entity';

@Injectable()
export class VehicleService {
  vehicleCategoryRepository: any;
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  // Fetch vehicles by category
  async getVehiclesByCategory(categoryId: number): Promise<Vehicle[]> {
    return await this.vehicleRepository.find({
      where: { type: { id: categoryId } }, // Assuming 'type' is the relation field in Vehicle
      relations: ['type'], // Include vehicle type in the response
    });
  }

  //   async getAllCategories(): Promise<number[]> {
  //     return await this.vehicleTypeRepository.find({ select: ['category'] });
  //   }
  async getAllCategoryNames(): Promise<string[]> {
    const categories = await this.vehicleCategoryRepository.find({
      select: ['categoryName'],
    });

    return categories.map((category) => category);
  }
}
