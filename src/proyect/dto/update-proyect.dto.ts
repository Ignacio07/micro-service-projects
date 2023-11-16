import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UpdateProyectDto{

    @IsString()
    @IsNotEmpty()
    name: string;

}