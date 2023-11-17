import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class NewProjectDto{
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    rol: string;
}