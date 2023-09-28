/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { knex } from 'src/dataBase/connection';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateLoginDto } from './dto/create-login.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LoginService {

  constructor(private jwtService: JwtService) { }

  async signIn(createLoginDto: CreateLoginDto) {

    const { email, password } = createLoginDto;

    const foundUser: User[] = await knex('users').where('email', email);

    if (foundUser.length === 0) {
      throw new UnauthorizedException('E-mail ou senha não confere.');
    }

    const verifyPassword: boolean = await bcrypt.compare(password, foundUser[0].password);

    if (!verifyPassword) {
      throw new UnauthorizedException('E-mail ou senha não confere.');
    }

    return {
      access_token: await this.jwtService.signAsync({ sub: foundUser[0].id })
    };

  }

}
