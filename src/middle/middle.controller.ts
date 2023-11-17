/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Param } from '@nestjs/common';
import { MiddleService } from './middle.service';
import { Post, Body } from '@nestjs/common';
import { NewProjectDto } from './dto/new.project.dto';


@Controller('middle')
export class MiddleController { 
    constructor(private readonly middleService: MiddleService) {}

    @Post('get-projects')
    async getTeamNames(@Body() data: { email: string }){
        return await this.middleService.getProjects(data);
    }

    @Post('new-project')
    async newTeam(@Body() newProjectDto: NewProjectDto){
        return await this.middleService.newProject(newProjectDto);
    }

}
