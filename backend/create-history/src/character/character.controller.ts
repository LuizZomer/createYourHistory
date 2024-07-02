import { CharacterService } from './character.service';
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CharacterDto } from './dto/character.dto';

@Controller('character')
export class CharacterController {

    constructor(readonly characterService:CharacterService){}

    @Get(':id')
    findManyCharacter(@Param('id') id:string){
        return this.characterService.findManyCharactersService(+id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createCharacter(@Body() character: CharacterDto ){
        return this.characterService.createCharacterService(character)
    }

    @Put()
    updateCharacter(@Body() character: CharacterDto){
        return this.characterService.updateCharacterService(character)
    }

    @Get(':historyId/:characterId')
    getById(@Param('historyId') historyId: string, @Param('characterId') characterId: string){
        return this.characterService.getById({historyId: +historyId, characterId: +characterId})
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        if(Number(id)){
            return this.characterService.delete(+id)
        }
        throw new  BadRequestException('id precisa ser um numero')
    }
}
