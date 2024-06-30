import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PlaceService } from './place.service';
import {  placeDto } from './dto/place.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() createPlaceDto: placeDto) {
    return this.placeService.create(createPlaceDto);
  }

  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(+id);
  }

  @Put()
  update(@Body() place: placeDto) {
    return this.placeService.update(place);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeService.remove(+id);
  }
}
