import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { weaponDto } from './dto/weapon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WeaponService {
  constructor(private readonly prisma:PrismaService){}

  async create( weapon: weaponDto) {
    try{
      await this.prisma.weapon.create({
        data: {
          name: weapon.name,
          description: weapon.description,
          power: weapon.power,
          characterId: weapon.characterId || null,
          historyId: weapon.historyId
        }
      })

      return {message: "Criada com sucesso"}
    }catch(err){
      throw new InternalServerErrorException
    }
  }

  async findAll() {
    return await this.prisma.weapon.findMany({
      include: {
        character: true
      }
    })
  }

  async findOne(id: number) {
    try{
      const weapon = await this.prisma.weapon.findFirst({
        where:{
          id
        }
      })

      if(weapon){
        return weapon
      }

      return {message: 'Arma não encontrada'}
    }catch(err){
      throw new InternalServerErrorException
    }
  }

  async update(weapon: weaponDto) {
    if(!weapon.id){
      throw new HttpException("Envie o id", HttpStatus.BAD_REQUEST)
    }

      const weaponId = await this.prisma.weapon.findFirst({
        where:{
          id: weapon.id
        }
      })

      if(!weaponId){
        throw new HttpException("Arma não encontrada", HttpStatus.NOT_FOUND)
      }

    return await this.prisma.weapon.update({
      data:{
        name: weapon.name,
        power: weapon.power,
        characterId: weapon.characterId || null,
        description: weapon.description
      },
      where:{
        id: weapon.id
      }
    })
  }

  async remove(id: number) {
    const weaponId = await this.prisma.weapon.findFirst({
      where:{
        id
      }
    })

    if(!weaponId){
      throw new HttpException("Arma não encontrada", HttpStatus.NOT_FOUND)
    }

    return await this.prisma.weapon.delete({
      where:{
        id
      }
    })

  }
}
 