/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create.member.dto';
import { UpdateMemberDto } from './dto/update.member.dto';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() createMemberDto: CreateMemberDto){
    const member = await this.memberService.create(createMemberDto);
    return member;
  }

  @Get()
  async findAll(){
    const members = await this.memberService.findAll();
    return members;
  }

  @Get(':email')
  async findOne(@Param('email') email: string){
    const member = await this.memberService.findOne(email);
    if(!member){
        throw new NotFoundException('User not found');
    }
    return member;
  }

  @Put(':email')
  async update(@Param('email') email: string, @Body() updateMemberDto: UpdateMemberDto){
    const member = await this.memberService.update(email, updateMemberDto);
    return member;
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    await this.memberService.remove(email);
    return 'User deleted';
  }

  @Get('projectIdsByEmail/:email')
  async findTeamsByEmail(@Param('email') email: string): Promise<number[]> {
    const projectIds = await this.memberService.findProjectsByEmail(email);
    return projectIds;
  }

  @Get('members/:id_project')
  async findMemberByIdProject(@Param('id_project') id_project: string): Promise<{emails: string[]}>{
    const id = parseInt(id_project,10);
    return await this.memberService.findByIdProject(id);
  }

  @Delete('member-project/:email/:id')
  async deleteMemberProject(@Param('email') email: string, @Param('id') id: string){
    console.log(email,id);
    const id_project = parseInt(id,10);
    return await this.memberService.deleteMemberProject(id_project, email);
  }
}
