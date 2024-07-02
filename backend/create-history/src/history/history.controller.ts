import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryService } from './history.service';
import { historyDto } from './dto/history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() history: historyDto) {
    return this.historyService.create(history);
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

  @Patch()
  update(@Body() history: historyDto) {
    return this.historyService.update(history);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
