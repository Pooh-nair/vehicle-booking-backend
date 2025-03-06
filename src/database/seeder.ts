import { DataSource } from 'typeorm';
import { Vehicle } from '../models/vehicle.entity';
import { VehicleType } from '../models/vehicle-type.entity';
import { VehicleCategory } from '../models/vehicle-category.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

// const dataSource = new DataSource({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'vehicle_booking',
//   entities: [Vehicle],
//   synchronize: true,
// });

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const vehicleCategoryRepo = dataSource.getRepository(VehicleCategory);

  const categories = [
    { categoryName: '2 Wheeler' },
    { categoryName: '4 Wheeler' },
  ];
  const saveCategories = await vehicleCategoryRepo.save(categories);

  const types = {
    '2 Wheeler': ['Crusier', 'Sports'],
    '4 Wheeler': ['Sedan', 'Hatchback', 'SUV'],
  };

  const vehicles = {
    Crusier: ['Royal Enfield Classic'],
    Sports: ['BMW'],
    Sedan: ['Honda City'],
    Hatchback: ['Maruti Swift'],
    SUV: ['Toyota Fortuner'],
  };
  for (let category of saveCategories) {
    const vehicleTypeRepo = dataSource.getRepository(VehicleType);
    const savedTypes: VehicleType[] = await vehicleTypeRepo.save([
      ...types[category.categoryName].map((el: string) => ({
        typeName: el,
        category: category,
      })),
    ]);
    for (let type of savedTypes) {
      const vehicleRepo = dataSource.getRepository(Vehicle);
      await vehicleRepo.save([
        ...vehicles[type.typeName].map((el: string) => ({
          vehicleName: el,
          type: type,
        })),
      ]);
    }
  }
  await dataSource.destroy();
  await app.close();
}

seed();
