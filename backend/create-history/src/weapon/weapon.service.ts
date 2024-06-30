import { Injectable } from '@nestjs/common';
import { WeaponDto } from './dto/weapon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeaponService {
  constructor(private readonly prisma:PrismaService){}

  async create( weapon: WeaponDto) {
    return await this.prisma.weapon.create({
      data: weapon
    })
  }

  async findAll() {
    return await this.prisma.weapon.findMany()
  }

  async findOne(id: number) {
    return `This action returns a #${id} weapon`;
  }

  async update(id: number, weaponDto: WeaponDto) {
    return `This action updates a #${id} weapon`;
  }

  async remove(id: number) {
    return `This action removes a #${id} weapon`;
  }
}
