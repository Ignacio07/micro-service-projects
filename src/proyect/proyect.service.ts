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
    const proyect = this.proyectRepository.create(createProyectDto);
    return await this.proyectRepository.save(proyect);
  }


  async findAll(): Promise<Proyect[]> {
    return this.proyectRepository.find();
  }

  async findOne(id: number): Promise<Proyect | undefined> {
    return this.proyectRepository.findOneBy({id});
  }

  async update(id: number, updateProyectDto: UpdateProyectDto): Promise<Proyect | undefined> {
    const proyect = await this.proyectRepository.findOneBy({id});
    if (!proyect) {
      throw new BadRequestException('Proyect not found');
    }
    Object.assign(proyect, updateProyectDto);
    return await this.proyectRepository.save(proyect);
  }

  async remove(id: number): Promise<void> {
    const proyect = await this.proyectRepository.findOneBy({id});
    if (!proyect) {
      throw new BadRequestException('Proyect not found');
    }
    await this.proyectRepository.remove(proyect);
  }
}
