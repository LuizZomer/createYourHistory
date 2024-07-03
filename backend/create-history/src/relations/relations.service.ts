import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { relationDto } from './dto/relation.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RelationsService {
  constructor(private readonly prisma: PrismaService){}

  async create(relation: relationDto) {
    try{
      await this.prisma.relations.create({
        data:{
          relationType: relation.relationType,
          characterId: relation.characterId,
          relationCharacterId: relation.relationCharacterId,
        }
      });
  
      return {message: 'relação criada com sucesso'}
    }catch(err){
      throw new InternalServerErrorException
    }

  }

  async remove(id: number) {
    const relationId = await this.prisma.relations.findFirst({
      select:{
        id: true
      },
      where:{
        id
      }
    })

    if(!relationId) 
      throw new HttpException("Lugar não encontrado", HttpStatus.NOT_FOUND) 

    return await this.prisma.relations.delete({
      where: {
        id
      }
    }) 
  }
}
