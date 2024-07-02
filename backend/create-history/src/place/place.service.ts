import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { placeDto } from './dto/place.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService){}

  async create(place: placeDto) {
    
    return await this.prisma.place.create({
      data:{
        name: place.name,
        description: place.description,
        cityId: place.cityId || null,
        historyId: place.historyId
      }
    }) 
  }

  async findAll() {
    return await this.prisma.place.findMany({
      include:{
        City: true,
        character: true
      }
    });
  }

  async findOne(id: number) {
    const place = await this.prisma.place.findFirst({
      where: {
        id
      }
    })

    if(!place){
      throw new HttpException("Lugar não encontrado", HttpStatus.NOT_FOUND)
    }

    return place
  }

  async update(place: placeDto) {
    if(!place.id) throw new HttpException("Id não enviado", HttpStatus.BAD_REQUEST)

    const placeId = await this.prisma.place.findFirst({
      select:{
        id: true
      },
      where:{
        id: place.id
      }
    })     

    if(!placeId) 
      throw new HttpException("Id não existente", HttpStatus.BAD_REQUEST)    

    await this.prisma.place.update({
      data:{
        name: place.name,
        description: place.description,
        cityId: place.cityId || null
      },
      where:{
        id: place.id
      }
    })
     
    return {message: "Editado com sucesso" }
  }

  async remove(id: number) {
    const placeId = await this.prisma.place.findFirst({
      select:{
        id: true
      },
      where:{
        id
      }
    })

    if(!placeId) 
      throw new HttpException("Lugar não encontrado", HttpStatus.NOT_FOUND) 

    return await this.prisma.place.delete({
      where: {
        id
      }
    }) 
  }
}
