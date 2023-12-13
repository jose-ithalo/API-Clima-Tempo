/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailsService {
  sendMail(createEmailDto: CreateEmailDto) {

    const { email } = createEmailDto;

    console.log(email);

    return `This action sends a message`;
  }
}
