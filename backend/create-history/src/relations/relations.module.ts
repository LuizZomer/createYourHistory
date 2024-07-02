import { Module } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { RelationsController } from './relations.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RelationsController],
  providers: [RelationsService, PrismaService],
})
export class RelationsModule {}
