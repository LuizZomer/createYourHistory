import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
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

  @Put()
  update(@Body() weapon: weaponDto) {
    return this.weaponService.update(weapon);
  }


  @Get()
  findAll() {
    return this.weaponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const numberId = Number(id)
    if(!numberId){
      throw new HttpException("Id precisa ser um número", HttpStatus.BAD_REQUEST)
    }
    return this.weaponService.findOne(numberId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weaponService.remove(+id);
  }
}
