/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  login(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.signIn(createLoginDto);
  }
}
