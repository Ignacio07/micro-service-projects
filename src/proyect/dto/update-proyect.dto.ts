import { IsString,IsNotEmpty } from "class-validator";

export class UpdateProyectDto{

    @IsString()
    @IsNotEmpty()
    name: string;

}