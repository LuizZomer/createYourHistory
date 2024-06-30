import { CharacterService } from './character.service';
import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CharacterDto } from './dto/character.dto';

@Controller('character')
export class CharacterController {

    constructor(readonly characterService:CharacterService){}

    @Get()
    findManyCharacter(){
        return this.characterService.findManyCharactersService()
    }

    @Post()
    createCharacter(@Body() character: CharacterDto ){
        return this.characterService.createCharacterService(character)
    }

    @Put()
    updateCharacter(@Body() character: CharacterDto){
        return this.characterService.updateCharacterService(character)
    }

    @Get(':id')
    getById(@Param('id') id: string){
        if(Number(id)){
            return this.characterService.getById(+id)
        }
        throw new  BadRequestException('id precisa ser um numero')
    }
}
