import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { historyDto } from './dto/history.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService){}

  async create(history: historyDto) {
    try{
      return await this.prisma.history.create({
        data:{
          name: history.name,
          description: history.description
        }
      })

    }catch(err){
      throw new InternalServerErrorException
    }
  }

  async findAll() {
    return await this.prisma.history.findMany({
      include: {
        character: true,
        city: true,
        group: true,
        place: true,
        weapon: true
      }
    });
  }

  async findOne(id: number) {
    const history = await this.prisma.history.findFirst({
      include:{
        character: true,
        city: true,
        group: true,
        place: true,
        weapon: true
      },
      where:{
        id
      }
    })

    if(history) return history

    throw new HttpException("Historia não encontrada", HttpStatus.NOT_FOUND)
  }

  async update(history: historyDto) {
    return `This action updates a #${history.id} history`;
  }

  async remove(id: number) {
    const historyId = await this.prisma.history.findFirst({
      select:{
        id: true
      },
      where: {
        id
      }
    })

    if(!historyId) throw new HttpException("Id não existente", HttpStatus.NOT_FOUND)

    return await this.prisma.history.delete({
      where:{
        id
      }
    })
  }
}
