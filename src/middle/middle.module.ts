import { ProyectModule } from 'src/proyect/proyect.module';
import { MiddleController } from './middle.controller';
import { MiddleService } from './middle.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MemberModule } from 'src/members/member.module';

@Module({
    imports: [ProyectModule, MemberModule],
    controllers: [MiddleController],
    providers: [MiddleService],
})
export class MiddleModule { }
