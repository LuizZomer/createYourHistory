import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
          characterId: relation.relationCharacterId,
          relationCharacterId: relation.relationCharacterId,
        }
      });
  
      return {message: 'relação criada com sucesso'}
    }catch(err){
      throw new InternalServerErrorException
    }

  }

  async findAll() {
    return await this.prisma.relations.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} relation`;
  }

  update(relation: relationDto) {
    return `This action updates a ${relation.id} relation`;
  }

  remove(id: number) {
    return `This action removes a #${id} relation`;
  }
}
