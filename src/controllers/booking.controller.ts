import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { BookingDto } from '../dto/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('save-booking')
  async saveBooking(@Body() bookingDto: BookingDto) {
    return this.bookingService.saveBooking(bookingDto);
  }
}
