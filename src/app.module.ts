import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddleController } from './middle/middle.controller';
import { MiddleService } from './middle/middle.service';
import { ProyectModule } from './proyect/proyect.module';
import { MemberModule } from './members/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), ProyectModule, MemberModule],
  controllers: [AppController, MiddleController],
  providers: [AppService, MiddleService],
})
export class AppModule {}
