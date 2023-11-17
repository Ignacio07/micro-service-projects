import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyect } from './entities/proyect.entity';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';


@Injectable()
export class ProyectService {
  constructor(
    @InjectRepository(Proyect)
    private proyectRepository: Repository<Proyect>,
  ) {}

  async create(createProyectDto: CreateProyectDto): Promise<Proyect> {
    const project = this.proyectRepository.create(createProyectDto);
    return await this.proyectRepository.save(project);
  }


  async findAll(): Promise<Proyect[]> {
    return this.proyectRepository.find();
  }

  async findOne(id: number): Promise<Proyect | undefined> {
    return this.proyectRepository.findOneBy({id});
  }

  async update(id: number, updateProyectDto: UpdateProyectDto): Promise<Proyect | undefined> {
    const project = await this.proyectRepository.findOneBy({id});
    if (!project) {
      throw new BadRequestException('Project not found');
    }
    Object.assign(project, updateProyectDto);
    return await this.proyectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.proyectRepository.findOneBy({id});
    if (!project) {
      throw new BadRequestException('Project not found');
    }
    await this.proyectRepository.remove(project);
  }

  async findProyectsById(projectIds: number[]): Promise<Proyect[]> {
    const projects = await this.proyectRepository.createQueryBuilder('project')
        .whereInIds(projectIds)
        .getMany();
    console.log(projects);
    return projects;
  }
}
