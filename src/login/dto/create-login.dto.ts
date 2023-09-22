/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";

export class CreateLoginDto {
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;
}
