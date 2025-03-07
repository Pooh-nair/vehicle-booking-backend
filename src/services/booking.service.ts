import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingDto } from 'src/dto/booking.dto';
import { Booking } from 'src/models/booking.entity';
import { Vehicle } from 'src/models/vehicle.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async saveBooking(bookingDto: BookingDto): Promise<Booking> {
    if (bookingDto.firstName == null || bookingDto.firstName.trim() == '') {
      throw new BadRequestException(
        'Required Parameter Missing, Please provide firstName',
      );
    }
    if (bookingDto.lastName == null || bookingDto.lastName.trim() == '') {
      throw new BadRequestException(
        'Required Parameter Missing, Please provide lastName',
      );
    }
    if (bookingDto.vehicleId == null) {
      throw new BadRequestException(
        'Required Parameter Missing, Please provide vehicleId',
      );
    }
    if (bookingDto.startDate == null) {
      throw new BadRequestException(
        'Required Parameter Missing, Please provide startDate',
      );
    }
    if (bookingDto.endDate == null) {
      throw new BadRequestException(
        'Required Parameter Missing, Please provide endDate',
      );
    }
    if (new Date(bookingDto.startDate).getTime() < new Date().getTime()) {
      throw new BadRequestException('startDate is Invalid');
    }
    if (new Date(bookingDto.endDate).getTime() < new Date().getTime()) {
      throw new BadRequestException('endDate is Invalid');
    }

    if (
      new Date(bookingDto.startDate).getTime() >
      new Date(bookingDto.endDate).getTime()
    ) {
      throw new BadRequestException('startDate should be greater then endDate');
    }

    const existingBooking = await this.bookingRepository.findOne({
      where: [
        {
          vehicle: { id: bookingDto.vehicleId },
          startDate: LessThanOrEqual(new Date(bookingDto.endDate)),
          endDate: MoreThanOrEqual(new Date(bookingDto.startDate)),
        }
      ],
    });
    console.log('existingBooking: ', existingBooking);

    if (existingBooking) {
      throw new BadRequestException('Vehicle is already booked for same date.');
    }

    const booking = this.bookingRepository.create({
      vehicle: { id: bookingDto.vehicleId },
      firstName: bookingDto.firstName,
      lastName: bookingDto.lastName,
      startDate: bookingDto.startDate,
      endDate: bookingDto.endDate,
    });

    return this.bookingRepository.save(booking);
  }
}
