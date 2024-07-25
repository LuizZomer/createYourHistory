import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { cityDto } from './dto/city.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface IGetParam {
  cityId: number;
  historyId: number;
}

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService){}

  async create(city: cityDto) {
    return await this.prisma.city.create({
      data:{
        name: city.name,
        description: city.description,
        historyId: city.historyId
      }
    })
  }

  async findAll(historyId: number) {
    return await this.prisma.city.findMany({
      include:{
        place: true
      },
      where:{
        historyId
      }
    });
  }

  async findOne({cityId, historyId}:IGetParam) {
    const city = await this.prisma.city.findFirst({
      include:{
        place: true
      },
      where: {
        id: cityId,
        historyId
      }
    })

    if(!city) {
      throw new HttpException('Cidade não encontrada', HttpStatus.NOT_FOUND)
    }

    return city
  }

  async update(city: cityDto) {
    if(!city.id) throw new BadRequestException

    const cityId = await this.prisma.city.findFirst({
      select:{
        id: true
      },
      where:{
        id: city.id
      }
    }) 

    if(!cityId) 
      throw new HttpException("Id não existente", HttpStatus.BAD_REQUEST)    

    await this.prisma.city.update({
      data:{
        name: city.name,
        description: city.description,
      },
      where:{
        id: city.id
      }
    })
     
    return {message: "Editado com sucesso" }
  }

  async remove({cityId, historyId}: IGetParam) {
    const cityIdRes = await this.prisma.city.findFirst({
      select:{
        id: true
      },
      where:{
        id: cityId,
        historyId
      }
    })

    if(!cityIdRes) 
      throw new HttpException("Cidade não encontrado", HttpStatus.NOT_FOUND) 

    return await this.prisma.city.delete({
      where: {
        id: cityId,
        historyId
      }
    }) 
  }

  async selectAllCharacter(historyId: number){
    return await this.prisma.city.findMany({
      select: {
        name: true,
        id: true
      },
      where:{
        historyId
      }
    })
  }
}
