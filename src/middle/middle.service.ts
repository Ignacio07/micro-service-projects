/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/members/member.service';
import { ProyectService } from 'src/proyect/proyect.service';


@Injectable()
export class MiddleService {
    constructor(
        private readonly proyectService: ProyectService, 
        private readonly memberService: MemberService,
    ) {}


    async getTeams(data: { email: string }): Promise<{ id: number; name: string }[]> {
        const email = data.email;
        console.log(email);
    
        const projectIds = await this.memberService.findProjectsByEmail(email);
        const projects = await this.proyectService.findProyectsById(projectIds);
    
        const projectInfo = projects.map((project) => ({
            id: project.id,
            name: project.name,
        }));
    
        console.log(projectInfo);
        return projectInfo;
    }

}
