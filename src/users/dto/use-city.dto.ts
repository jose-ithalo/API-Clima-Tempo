/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class UseCityDto {
    @IsString()
    @IsNotEmpty()
    readonly city: string;
}
