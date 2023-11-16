import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { ProyectService } from './proyect.service';
import { UpdateProyectDto } from './dto/update-proyect.dto';

@Controller('proyect')
export class ProyectController {
  constructor(private readonly proyectService: ProyectService) {}

  @Post()
  async create(@Body() createProyectDto: CreateProyectDto) {
    const proyect = await this.proyectService.create(createProyectDto);
    return proyect;
  }

  @Get()
  async findAll() {
    const proyects = await this.proyectService.findAll();
    return proyects;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const proyect = await this.proyectService.findOne(id);
    if (!proyect) {
      throw new NotFoundException('Proyect not found');
    }
    return proyect;
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProyectDto: UpdateProyectDto) {
    const proyect = await this.proyectService.update(id, updateProyectDto);
    return proyect;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.proyectService.remove(id);
    return 'User deleted';
  }
}
