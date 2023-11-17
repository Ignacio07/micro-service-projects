import { IsEmail, IsNumber, IsString } from "class-validator";

export class UpdateMemberDto{
    
    @IsEmail()
    email: string;

    @IsNumber()
    id_team: number;
}