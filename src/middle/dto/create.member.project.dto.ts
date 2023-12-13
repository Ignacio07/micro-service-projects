import { IsEmail, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";


export class CreateMemberProjectDto{
    
    @IsEmail()
    email: string;
    
    
    @IsString()
    @IsNotEmpty()
    rol: string;

    @IsString()
    @IsNotEmpty()
    id: string;
}