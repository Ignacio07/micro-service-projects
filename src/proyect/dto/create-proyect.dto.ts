import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateProyectDto{

    @Transform(({value}) => value.trim())
    @IsString()
    @IsNotEmpty()
    name: string;
}