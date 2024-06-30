import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { groupDto } from './dto/group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: groupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Put()
  update(@Body() group:groupDto){
    return this.groupService.update(group)
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
