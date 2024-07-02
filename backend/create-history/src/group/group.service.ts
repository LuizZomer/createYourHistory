import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { groupDto } from './dto/group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService){}

  async create(group: groupDto) {
    try{
      return await this.prisma.group.create({
        data:{
          name: group.name,
          description: group.description,
          behalf: group.behalf,
          historyId: group.historyId
        }
      })
    }catch(err){
      throw new InternalServerErrorException
    }
  }

  async findAll() {
    return await this.prisma.group.findMany({
      include:{
        Character: true
      }
    });
  }

  async findOne(id: number) {
    try{
      const group = await this.prisma.group.findFirst({
        include:{
          Character: true
        },
        where:{
          id
        }
      })

      if(group){
        return group
      }

      return {message: 'Grupo não encontrada'}
    }catch(err){
      throw new InternalServerErrorException
    }  }

  async update(group: groupDto) {
    if(!group.id){
      throw new HttpException("Envie o id", HttpStatus.BAD_REQUEST)
    }    

      const groupId = await this.prisma.group.findFirst({
        select:{
          id:true
        },
        where:{
          id: group.id
        }
      })      

      if(!groupId){
        console.log('teste');
        
        throw new HttpException("Grupo não encontrada", HttpStatus.NOT_FOUND)
      }

    return await this.prisma.group.update({
      data:{
        name: group.name,
        behalf: group.behalf,
        description: group.description
      },
      where:{
        id: group.id
      }
    })
  }

  async remove(id: number) {
    const groupId = await this.prisma.group.findFirst({
      where:{
        id
      }
    })

    if(!groupId){
      throw new HttpException("Grupo não encontrado", HttpStatus.NOT_FOUND)
    }

    return await this.prisma.group.delete({
      where:{
        id
      }
    })
  }
}
