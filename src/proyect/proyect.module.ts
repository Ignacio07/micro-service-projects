import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyect } from './entities/proyect.entity';
import { ProyectController } from './proyect.controller';
import { ProyectService } from './proyect.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proyect])],
  controllers: [ProyectController],
  providers: [ProyectService],
  exports: [ProyectService],
})
export class ProyectModule {}