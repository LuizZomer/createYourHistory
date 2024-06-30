import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { PrismaModule } from './prisma/prisma.module';
import { WeaponModule } from './weapon/weapon.module';

@Module({
  imports: [CharacterModule, PrismaModule, WeaponModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
