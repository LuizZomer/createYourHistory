import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CityService } from './city.service';
import { cityDto } from './dto/city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() city: cityDto) {
    return this.cityService.create(city);
  }

  @Get('/select')
  selectCity(){
    return this.cityService.selectAllCharacter()
  }

  @Get(":historyId")
  findAll(@Param('historyId') historyId: string) {
    return this.cityService.findAll(+historyId);
  }

  @Get(':historyId/:cityId')
  findOne(@Param('historyId') historyId: string, @Param('cityId') cityId: string) {
    return this.cityService.findOne({cityId: +cityId, historyId: +historyId});
  }

  @Put()
  update(@Body() city: cityDto) {
    return this.cityService.update(city);
  }

  @Delete(':historyId/:cityId')
  remove(@Param('historyId') historyId: string, @Param('cityId') cityId: string) {
    return this.cityService.remove({historyId: +historyId, cityId: +cityId});
  }
}
