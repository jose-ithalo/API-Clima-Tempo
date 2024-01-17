/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseCityDto } from './dto/use-city.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/cities')
  showCities() {
    return this.usersService.showCities();
  }

  @Get('/user')
  findOne() {
    return this.usersService.findOne();
  }

  @Patch('/cities')
  @HttpCode(204)
  addCity(@Body() useCityDto: UseCityDto) {
    return this.usersService.addCity(useCityDto);
  }

  @Patch('/detach')
  detach(@Body() useCityDto: UseCityDto) {
    return this.usersService.detachCity(useCityDto);
  }

  @Put()
  @HttpCode(204)
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete('/cities')
  removeCity(@Body() useCityDto: UseCityDto) {
    return this.usersService.removeCity(useCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
