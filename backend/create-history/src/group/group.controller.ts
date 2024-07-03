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

  @Get(':historyId')
  findAll(@Param('historyId') historyId: string) {
    return this.groupService.findAll(+historyId);
  }

  @Get(':historyId/:groupId')
  findOne(@Param('historyId') historyId: string, @Param('groupId') groupId: string) {
    return this.groupService.findOne({groupId: +groupId, historyId: +historyId});
  }

  @Delete(':historyId/:groupId')
  remove(@Param('historyId') historyId: string, @Param('groupId') groupId: string) {
    return this.groupService.remove({groupId: +groupId, historyId: +historyId});
  }
}
