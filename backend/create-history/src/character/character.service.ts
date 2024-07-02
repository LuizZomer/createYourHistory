import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CharacterDto } from './dto/character.dto';

interface IWeaponVerify{
    characterId: number;
    weaponId: number
}

@Injectable()
export class CharacterService {
    constructor(private readonly prisma: PrismaService){}

    async weaponVerify({characterId, weaponId}: IWeaponVerify){
        if(characterId && weaponId){
            try{
                await this.prisma.weapon.update({
                    data:{
                        characterId: characterId
                    },
                    where:{
                        id: weaponId
                    }
                })
            }catch(err){
                console.log(err);
            }
        }

    }

    async createCharacterService(character: CharacterDto){
        try{
            const newCaracter = await this.prisma.character.create({
                data: {
                    name: character.name,
                    description: character.description,
                    personality:character.personality,
                    weaponId: character.weaponId || null,
                    groupId: character.groupId || null,
                    favoritePlaceId: character.favoritePlaceId || null,
                    birthPlaceId: character.birthPlace || null,
                    relationId: character.relationId || null,
                    historyId: character.historyId
                }
            })        

            this.weaponVerify({characterId: newCaracter.id, weaponId: newCaracter.weaponId})
            
            return {message: "Criado com sucesso"}

        }catch(err){
           throw new HttpException("Impossivel criar personagem", HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async findManyCharactersService(id: number){
        return await this.prisma.character.findMany({
            include:{
                weapon: true,
                group: true,
                favoritePlace: true,
                birthPlace: true,
                relations: true,
                related: true,
            },
            where:{
                historyId: id
            }
        })
    }

    async updateCharacterService(character: CharacterDto){
        if(!character.id){
            return 
        }

        try{
            await this.prisma.character.update({
                data: {
                    name: character.name,
                    description: character.description,
                    personality: character.personality,
                    weaponId: character.weaponId || null,
                    groupId: character.groupId || null,
                    birthPlaceId: character.birthPlace || null,
                },
                where:{
                    id: character.id
                }
            })
    
            this.weaponVerify({characterId: character.id, weaponId: character.weaponId})
    
            return {message: "Criado com sucesso"}
        }catch(err){
            throw new HttpException("Impossivel atulaizar personagem", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    async getById({historyId, characterId}: {historyId: number, characterId: number}){
        const characterIdRes = await this.prisma.character.findFirst({
            select:{
                id: true
            },
            where:{
                id: characterId,
                historyId: historyId
            }
        })

        if(!characterIdRes){
            throw new HttpException("Id não encontrado", HttpStatus.NOT_FOUND)
        }

        return await this.prisma.character.findFirst({
            include: {
                weapon: true
            },
            where: {
                id: characterId,
                historyId,
            },
        }) 
    } 

    async delete(id: number){
        const characterId = await this.prisma.character.findFirst({
            select:{
                id: true
            },
            where:{
                id
            }
        })

        if(!characterId){
            throw new HttpException('Id não correspondente', HttpStatus.BAD_REQUEST)
        }

        return await this.prisma.character.delete(
            {
                where:{
                    id:id
                }
            }
        )
    }
}
