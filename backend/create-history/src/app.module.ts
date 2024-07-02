import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { PrismaModule } from './prisma/prisma.module';
import { WeaponModule } from './weapon/weapon.module';
import { GroupModule } from './group/group.module';
import { PlaceModule } from './place/place.module';
import { CityModule } from './city/city.module';
import { RelationsModule } from './relations/relations.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [CharacterModule, PrismaModule, WeaponModule, GroupModule, PlaceModule, CityModule, RelationsModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
