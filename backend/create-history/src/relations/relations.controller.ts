import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { relationDto } from './dto/relation.dto';

@Controller('relations')
export class RelationsController {
  constructor(private readonly relationsService: RelationsService) {}

  @Post()
  create(@Body() relation: relationDto) {
    return this.relationsService.create(relation);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationsService.remove(+id);
  }
}
