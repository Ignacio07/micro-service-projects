/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/members/member.service';
import { ProyectService } from 'src/proyect/proyect.service';
import { NewProjectDto } from './dto/new.project.dto';
import { CreateMemberProjectDto } from './dto/create.member.project.dto';


@Injectable()
export class MiddleService {
    constructor(
        private readonly proyectService: ProyectService, 
        private readonly memberService: MemberService,
    ) {}


    async getProjects(data: { email: string }): Promise<{ ids: number[]; names: string[] }> {
        const email = data.email;
    
        const projectIds = await this.memberService.findProjectsByEmail(email);
        const projects = await this.proyectService.findProyectsById(projectIds);
        const ids = projects.map((project) => project.id);
        const names = projects.map((project) => project.name);
        return { ids, names };
    }

    async newProject({name, email, rol} : NewProjectDto){
        const project = await this.proyectService.create({name});
        const id_project = project.id;
        console.log(id_project);
        const member = await this.memberService.create({email, rol, id_project});
        return {project, member};
    }

    async addMemberToProject({ email, rol, id }: CreateMemberProjectDto) {
        
        const id_project = parseInt(id,10);
        console.log(id_project);
        const existingProject = await this.proyectService.findOne(id_project);
        
        if (!existingProject) {
            throw new Error('El proyecto no existe');
        }

        const member = await this.memberService.findOne(email);
        if (member && member.id_project === id_project) {
          throw new Error('El usuario ya pertenece a este equipo');
        }
        const add = await this.memberService.create({email, rol, id_project})
        return add;
    }

    async deleteProjectAndMembers(id: string): Promise<string>{
        const id_project = parseInt(id, 10);
        const existingProject = await this.proyectService.findOne(id_project);
        console.log(id, existingProject);
        if (!existingProject) {
          throw new Error('El Projecto no existe');
        }
        await this.memberService.deleteMembersByProjectId(id_project);
        await this.proyectService.remove(id_project);
        return 'Proyecto eliminado';
    }

}
