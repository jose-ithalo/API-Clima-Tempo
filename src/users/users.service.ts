/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Scope
} from '@nestjs/common';

import { knex } from 'src/dataBase/connection';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseCityDto } from './dto/use-city.dto';
import { User } from './entities/user.entity';

import { REQUEST } from '@nestjs/core';
import RequestWithUserRole from 'src/interfaces/request';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {

  constructor(@Inject(REQUEST) readonly req: RequestWithUserRole) { }

  verifyFields(createUserDto: CreateUserDto) {
    if (!createUserDto.username || !createUserDto.username || !createUserDto.password) {
      throw new BadRequestException('Preencha todos os campos');
    }
  }

  async create(createUserDto: CreateUserDto) {
    this.verifyFields(createUserDto);

    if (createUserDto.password.length < 5) {
      throw new NotAcceptableException('Só será aceito uma senha com no mínimo 5 caracteres.');
    }

    const existingEmail: User = await knex('users').where('email', createUserDto.email).first();

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

    const allUser: User[] = await knex.select('id', 'username', 'email').from('users').orderBy('id');

    return allUser;
  }

  async findOne(id: number) {

    const foundUser: User = await knex.select('id', 'username', 'email')
      .from('users')
      .where({ id }).first();

    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, email } = updateUserDto;
    let { password } = updateUserDto;

    const foundUser: User = await this.findOne(id);

    if (!username && !email && !password) {
      throw new NotAcceptableException('Preencha ao menos um campo.');
    }

    if (password) {
      if (password.length < 5) {
        throw new NotAcceptableException('Só será aceito uma senha com no mínimo 5 caracteres.');
      }

      password = await bcrypt.hash(password, 10);
    }

    if (email !== foundUser.email) {
      const existingEmail: User[] = await knex('users').where('email', email);

      if (existingEmail.length > 0) {
        throw new NotAcceptableException('Este e-mail já existe. Por favor escolha um outro.');
      }
    }

    await knex('users').update({ username, email, password }).where({ id });

    return;
  }

  async remove(id: number) {

    const foundUser: User = await this.findOne(id);

    await knex('users').del().where({ id });

    return `Usuário ${foundUser.username} excluído com sucesso.`;

  }

  async addCity(useCityDto: UseCityDto) {
    const { city } = useCityDto;
    const { id: userId } = this.req.user as Pick<User, 'id'>;

    const loggerUser = await knex('users').where('id', userId).first();
    const cityList: string[] = loggerUser.cities;

    const foundCity: string | undefined = cityList.find(function (item) {
      return item.toLowerCase() === city.toLowerCase();
    });

    if (foundCity) {
      throw new NotAcceptableException('Cidade já foi adicionada.');
    }

    cityList.push(city);

    await knex('users').update({
      cities: cityList
    }).where('id', userId);

    return;
  }

  async showCities() {
    const { id: userId } = this.req.user as Pick<User, 'id'>;

    const loggerUser = await knex('users').where('id', userId).first();
    const cityList: string[] = loggerUser.cities;

    return cityList
  }

  async removeCity(useCityDto: UseCityDto) {
    const { city } = useCityDto;
    const { id: userId } = this.req.user as Pick<User, 'id'>;

    const loggerUser = await knex('users').where('id', userId).first();
    const cityList: string[] = loggerUser.cities;

    const newList: string[] = cityList.filter(function (item) {
      return item !== city;
    });

    await knex('users').update({
      cities: newList
    }).where('id', userId);

    return `Cidade ${city} removida com sucesso!`
  }

  async detachCity(useCityDto: UseCityDto) {
    const { city } = useCityDto;
    const { id: userId } = this.req.user as Pick<User, 'id'>;

    await knex('users').update({
      detached: city
    }).where('id', userId);

    return `A cidade ${city} foi escolhida como destaque.`;
  }
}
