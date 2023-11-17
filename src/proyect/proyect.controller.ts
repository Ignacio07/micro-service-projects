import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { ProyectService } from './proyect.service';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { Proyect } from './entities/proyect.entity';

@Controller('project')
export class ProyectController {
  constructor(private readonly proyectService: ProyectService) {}

  @Post()
  async create(@Body() createProyectDto: CreateProyectDto) {
    const project = await this.proyectService.create(createProyectDto);
    return project;
  }

  @Get()
  async findAll() {
    const projects = await this.proyectService.findAll();
    return projects;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const project = await this.proyectService.findOne(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProyectDto: UpdateProyectDto) {
    const project = await this.proyectService.update(id, updateProyectDto);
    return project;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.proyectService.remove(id);
    return 'Project deleted';
  }

  @Get('byIds/:ids')
  async getProyectsByIds(@Param('ids') ids: string): Promise<Proyect[]> {
    const projectIds = ids.split(',').map(Number);
    const teams = await this.proyectService.findProyectsById(projectIds);
    return teams;
  }
}
