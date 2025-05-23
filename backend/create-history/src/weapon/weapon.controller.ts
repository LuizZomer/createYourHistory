import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { weaponDto } from './dto/weapon.dto';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() weapon: weaponDto) {
    return this.weaponService.create(weapon);
  }
  
  @Get('/select/:historyId')
  selectAllWeapon(@Param('historyId') historyId: string){
    return this.weaponService.selectAllWeapon(+historyId)
  }

  @Put()
  update(@Body() weapon: weaponDto) {
    return this.weaponService.update(weapon);
  }

  @Get(':historyId')
  findAll(@Param('historyId') historyId: string) {
    return this.weaponService.findAll(+historyId);
  }

  @Get(':historyId/:weaponId')
  findOne(@Param('historyId') historyId: string, @Param('weaponId') weaponId: string) {
    return this.weaponService.findOne({historyId: +historyId, weaponId: +weaponId});
  }

  @Delete(':historyId/:weaponId')
  remove(@Param('historyId') historyId: string, @Param('weaponId') weaponId: string) {
    return this.weaponService.remove({historyId: +historyId, weaponId: +weaponId});
  }
}
