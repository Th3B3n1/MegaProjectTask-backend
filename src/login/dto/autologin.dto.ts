import { IsNotEmpty, IsString } from "class-validator";

export class AutoLoginDto {
    @IsString()
    @IsNotEmpty()
    token: string;
}