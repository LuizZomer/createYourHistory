import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { PrismaModule } from './prisma/prisma.module';
import { WeaponModule } from './weapon/weapon.module';
import { GroupModule } from './group/group.module';
import { PlaceModule } from './place/place.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [CharacterModule, PrismaModule, WeaponModule, GroupModule, PlaceModule, CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
