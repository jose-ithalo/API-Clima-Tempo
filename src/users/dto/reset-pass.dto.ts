/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class ResetPassDto {
    @IsNotEmpty()
    @IsString()
    readonly key: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}