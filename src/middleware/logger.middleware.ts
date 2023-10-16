/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

import RequestWithUserRole from 'src/interfaces/request';
import { knex } from 'src/dataBase/connection';
import SubJwt from 'src/interfaces/subJwt';
import IUser from 'src/interfaces/user';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) { }

  async use(req: RequestWithUserRole, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization || authorization === 'Bearer undefined' || authorization === 'Bearer') {
      throw new UnauthorizedException('Você não está logado. Faça o login!');
    }

    try {
      const token: string = authorization.replace('Bearer', '').trim();

      const { sub } = this.jwtService.verify(token, { secret: process.env.JWT_SECRETE }) as SubJwt;

      const loggedUser: IUser = await knex.select('id', 'username', 'email')
        .from('users')
        .where('id', sub).first();

      req.user = loggedUser;

      next();

    } catch (error) {

      throw new InternalServerErrorException('Houve um erro interno no servidor.');
    }
  }
}
