/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private idUser: number = 2;
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

  create(createUserDto: CreateUserDto) {
    this.idUser += 1;
    const newUser: User = {
      id: this.idUser,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password
    }

    this.userList.push(newUser);

    return createUserDto;
  }

  findAll() {
    return this.userList;
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
