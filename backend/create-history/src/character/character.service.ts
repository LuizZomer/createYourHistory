import { HttpCode, HttpStatus, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CharacterDto } from './dto/character.dto';

@Injectable()
export class CharacterService {
    constructor(private readonly prisma: PrismaService){}

    @UsePipes(new ValidationPipe)
    @HttpCode(HttpStatus.CREATED)
    async createCharacterService(character: CharacterDto){

        return await this.prisma.character.create({
            data: {
                name: character.name,
                description: character.description,
                personality:character.personality,
                weaponId: character.weapon || null
            }
        })
    }

    async findManyCharactersService(){
        return await this.prisma.character.findMany()
    }

    async updateCharacterService(character: CharacterDto){
        if(!character.id){
            return 
        }

        return await this.prisma.character.update({
            data: {
                name: character.name,
                description: character.description,
                personality: character.personality,
                weaponId: character.weapon || null
            },
            where:{
                id: character.id
            }
        })
    }

    async getById(id: number){
        return await this.prisma.character.findFirst({
            include: {
                Weapon: true
            },
            where: {
                id
            },
        }) 
    } 
}
