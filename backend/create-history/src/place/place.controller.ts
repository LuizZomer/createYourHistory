import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { PlaceService } from './place.service';
import {  placeDto } from './dto/place.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createPlaceDto: placeDto) {
    return this.placeService.create(createPlaceDto);
  }

  @Get(':historyId')
  findAll(@Param('historyId') historyId: string) {
    return this.placeService.findAll(+historyId);
  }

  @Get(':historyId/:placeId')
  findOne(@Param('historyId') historyId: string, @Param('placeId') placeId: string) {
    return this.placeService.findOne({historyId: +historyId, placeId: +placeId});
  }

  @Get('/select')
  selectAllPlace(){
    return this.placeService.selectAllPlace()
  }

  @Put()
  update(@Body() place: placeDto) {
    return this.placeService.update(place);
  }

  @Delete(':historyId/:placeId')
  remove(@Param('historyId') historyId: string, @Param('placeId') placeId: string) {
    return this.placeService.remove({historyId: +historyId, placeId: +placeId});
  }
}
