import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { WeaponDto } from './dto/weapon.dto';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Post()
  create(@Body() createWeaponDto: WeaponDto) {
    return this.weaponService.create(createWeaponDto);
  }

  @Get()
  findAll() {
    return this.weaponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weaponService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaponService.remove(+id);
  }
}
