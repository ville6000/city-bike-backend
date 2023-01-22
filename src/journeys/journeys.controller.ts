import { Controller, Get, Param } from '@nestjs/common';
import { JourneysService } from './journeys.service';

@Controller('journeys')
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @Get()
  findAll() {
    return this.journeysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journeysService.findOne(+id);
  }
}
