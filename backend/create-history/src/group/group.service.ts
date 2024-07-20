import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { groupDto } from './dto/group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface IGetParam{
  historyId: number;
  groupId: number
}

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService){}

  async create(group: groupDto) {
    try{
      await this.prisma.group.create({
        data:{
          name: group.name,
          description: group.description,
          behalf: group.behalf,
          historyId: group.historyId
        }
      })

      return {message: "Criado com sucesso"}
    }catch(err){
      throw new InternalServerErrorException
    }
  }

  async findAll(historyId: number) {
    return await this.prisma.group.findMany({
      include:{
        Character: true
      },
      where:{
        historyId
      }
    });
  }

  async findOne({groupId, historyId}: IGetParam) {
    try{
      const group = await this.prisma.group.findFirst({
        include:{
          Character: true
        },
        where:{
          id: groupId,
          historyId
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

    await this.prisma.group.update({
      data:{
        name: group.name,
        behalf: group.behalf,
        description: group.description
      },
      where:{
        id: group.id
      }
    })

    return {message: "Editado com sucesso"}
  }

  async remove({groupId, historyId}: IGetParam) {
    const groupIdRes = await this.prisma.group.findFirst({
      where:{
        id: groupId
      }
    })

    if(!groupIdRes){
      throw new HttpException("Grupo não encontrado", HttpStatus.NOT_FOUND)
    }

    return await this.prisma.group.delete({
      where:{
        id: groupId,
        historyId
      }
    })
  }

  async selectAllGroup(){
    return await this.prisma.group.findMany({
      select:{
        id:true,
        name: true
      }
    })
  }
}
