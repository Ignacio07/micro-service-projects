/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/members/member.service';
import { ProyectService } from 'src/proyect/proyect.service';
import { NewProjectDto } from './dto/new.project.dto';
import { CreateMemberProjectDto } from './dto/create.member.project.dto';
import axios from 'axios';


@Injectable()
export class MiddleService {
    constructor(
        private readonly proyectService: ProyectService, 
        private readonly memberService: MemberService,
    ) {}


    async getProjects( email: string ): Promise<{ ids: number[]; names: string[] }> {
        try{
            const projectIds = await this.memberService.findProjectsByEmail(email);
            const projects = await this.proyectService.findProyectsById(projectIds);
            const ids = projects.map((project) => project.id);
            const names = projects.map((project) => project.name);
            return { ids, names };
        } catch (error) {
            throw new Error('Error al obtener proyectos');
        }
    }

    async newProject({name, email, rol} : NewProjectDto) : Promise<string>{
        try{
            const project = await this.proyectService.create({name});
            const id_project = project.id;
            console.log(id_project);
            const member = await this.memberService.create({email, rol, id_project});
            return 'Proyecto Creado';
        } catch (error) {
         throw new Error('Error al crear proyecto');
        }
    }

    async addMemberToProject({ email, rol, id }: CreateMemberProjectDto): Promise<string> {
        try {
            const id_project = parseInt(id, 10);
            console.log(id_project);
    
            const existingProject = await this.proyectService.findOne(id_project);
    
            if (!existingProject) {
                throw new Error('El proyecto no existe');
            }
    
            //const response = await axios.get(`http://10.0.2.2:3000/api/users/profile/${email}`);
            
            //if (!response.data || !response.data.exists) {
              //  throw new Error('El usuario no existe');
            //}
    
            const member = await this.memberService.findOne(email);
    
            if (member && member.id_project === id_project) {
                throw new Error('El usuario ya pertenece a este proyecto');
            }
    
            const add = await this.memberService.create({ email, rol, id_project });
    
            return 'Miembro agregado al proyecto';
        } catch (error) {
            throw new Error('Error al agregar miembro al proyecto');
        }
    }

    async deleteProjectAndMembers(id: string): Promise<string>{
        try{
        const id_project = parseInt(id, 10);
        const existingProject = await this.proyectService.findOne(id_project);
        console.log(id, existingProject);
        if (!existingProject) {
          throw new Error('El Projecto no existe');
        }
        await this.memberService.deleteMembersByProjectId(id_project);
        await this.proyectService.remove(id_project);
        return 'Proyecto eliminado';
        } catch (error) {
            throw new Error('Error al eliminar proyecto');
        }
    }

}
