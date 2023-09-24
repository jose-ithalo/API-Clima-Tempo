/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';

import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  login(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.signIn(createLoginDto);
  }
}
