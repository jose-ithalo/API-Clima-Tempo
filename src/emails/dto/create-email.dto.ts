/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmailDto {
    @IsNotEmpty()
    @IsString()
    readonly email: string;
}
