import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { relationDto } from './dto/relation.dto';

@Controller('relations')
export class RelationsController {
  constructor(private readonly relationsService: RelationsService) {}

  @Post()
  create(@Body() relation: relationDto) {
    return this.relationsService.create(relation);
  }

  @Get()
  findAll() {
    return this.relationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationsService.findOne(+id);
  }

  @Put()
  update(@Body() relation: relationDto) {
    return this.relationsService.update(relation);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationsService.remove(+id);
  }
}
