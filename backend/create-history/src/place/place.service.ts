import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { placeDto } from './dto/place.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface IGetParam{
  historyId: number;
  placeId: number
}

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService){}

  async create(place: placeDto) {
    try{
      await this.prisma.place.create({
        data:{
          name: place.name,
          description: place.description,
          cityId: place.cityId || null,
          historyId: place.historyId
        }
      }) 
  
      return {message: "Criado com sucesso"}
    }catch(err){
      throw new InternalServerErrorException
    }
  }

  async findAll(historyId: number) {
    return await this.prisma.place.findMany({
      include:{
        City: true,
        character: true
      },
      where:{
        historyId
      }
    });
  }

  async findOne({historyId, placeId}: IGetParam) {
    const place = await this.prisma.place.findFirst({
      where: {
        id: placeId,
        historyId
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

  async remove({historyId, placeId}: IGetParam) {
    const placeIdRes = await this.prisma.place.findFirst({
      select:{
        id: true
      },
      where:{
        id: placeId,
        historyId
      }
    })

    if(!placeIdRes) 
      throw new HttpException("Lugar não encontrado", HttpStatus.NOT_FOUND) 

    return await this.prisma.place.delete({
      where: {
        id: placeId,
        historyId
      }
    }) 
  }

  async selectAllPlace(){
    return await this.prisma.place.findMany({
      select:{
        id: true,
        name: true
      }
    })
  }
}
