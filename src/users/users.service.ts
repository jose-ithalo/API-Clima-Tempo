/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { knex } from 'src/dataBase/connection';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private userList: User[] = [
    {
      id: 1,
      username: 'Jonas Moura',
      email: 'jonas@email.com',
      password: '123'
    },
    {
      id: 2,
      username: 'Rafael Ferreira',
      email: 'rafa@email.com',
      password: 'teste'
    }
  ];

  verifyFields(createUserDto: CreateUserDto) {
    if (!createUserDto.username || !createUserDto.username || !createUserDto.password) {
      throw new BadRequestException('Preencha todos os campos');
    }
  }

  async create(createUserDto: CreateUserDto) {
    this.verifyFields(createUserDto);

    if (createUserDto.password.length < 5) {
      throw new NotAcceptableException('Só será aceito uma senha com no mínimo 5 caracteres.')
    }

    const existingEmail = await knex('users').where('email', createUserDto.email).first();

    if (existingEmail) {
      throw new NotAcceptableException('Este e-mail de usuário já existe, não será possível cadastrá-lo.');
    }

    const encryptedPassword: string = await bcrypt.hash(createUserDto.password, 10);

    await knex('users').insert({
      username: createUserDto.username,
      email: createUserDto.email,
      password: encryptedPassword
    });

    return;
  }

  async findAll() {

    const allUser: User[] = await knex.select('id', 'username', 'email').from('users');

    return allUser;
  }

  findOne(id: number) {

    const foundUser: User = this.userList.find((user) => user.id === id);

    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return foundUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {

    const updatedUser: User = this.findOne(id);

    updatedUser.username = updateUserDto.username;
    updatedUser.email = updateUserDto.email;
    updatedUser.password = updateUserDto.password;

    return;
  }

  remove(id: number) {

    const deletedUser = this.findOne(id);

    const indexUser: number = this.userList.findIndex((user) => user.id === id);

    this.userList.splice(indexUser, 1);

    return `Usuário ${deletedUser.username} excluído com sucesso.`;
  }
}
