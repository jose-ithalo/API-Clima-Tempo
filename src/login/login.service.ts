/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';

@Injectable()
export class LoginService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }

}
