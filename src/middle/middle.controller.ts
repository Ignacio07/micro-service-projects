/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Param } from '@nestjs/common';
import { MiddleService } from './middle.service';
import { Post, Body } from '@nestjs/common';
import { NewProjectDto } from './dto/new.project.dto';
import { CreateMemberProjectDto } from './dto/create.member.project.dto';


@Controller('middle')
export class MiddleController { 
    constructor(private readonly middleService: MiddleService) {}

    @Get('get-projects/:email')
    async getTeamNames(@Param('email') email: string ){
        console.log(email);
        return await this.middleService.getProjects(email);
    }

    @Post('new-project')
    async newTeam(@Body() newProjectDto: NewProjectDto){
        return await this.middleService.newProject(newProjectDto);
    }

    @Post('new-member')
    async addMemberToProject(@Body() createMemberProjectDto: CreateMemberProjectDto) {
        const result = await this.middleService.addMemberToProject(createMemberProjectDto);
        console.log(result);
        return result;
        
    }

    @Delete('delete-proyect/:id')
    async deleteTeamAndMembers(@Param('id') id: string){
        return await this.middleService.deleteProjectAndMembers(id);
    }


}
