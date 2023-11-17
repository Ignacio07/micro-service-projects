/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/members/member.service';
import { ProyectService } from 'src/proyect/proyect.service';
import { NewProjectDto } from './dto/new.project.dto';


@Injectable()
export class MiddleService {
    constructor(
        private readonly proyectService: ProyectService, 
        private readonly memberService: MemberService,
    ) {}


    async getProjects(data: { email: string }): Promise<{ ids: number[]; names: string[] }> {
        const email = data.email;
        console.log(email);
    
        const projectIds = await this.memberService.findProjectsByEmail(email);
        const projects = await this.proyectService.findProyectsById(projectIds);
    
        const ids = projects.map((project) => project.id);
        const names = projects.map((project) => project.name);
    
        console.log(ids, names);
        return { ids, names };
    }

    async newProject({name, email, rol} : NewProjectDto){
        const project = await this.proyectService.create({name});
        const id_project = project.id;
        console.log(id_project);
        const member = await this.memberService.create({email, rol, id_project});
        return {project, member};
    }

}
