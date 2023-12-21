/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';

import { knex } from 'src/dataBase/connection';
import { MailerService } from '@nestjs-modules/mailer';

import { Email } from './entities/email.entity';

@Injectable()
export class EmailsService {
  constructor(private mailerService: MailerService) { }

  async sendMail(createEmailDto: CreateEmailDto) {
    const { email } = createEmailDto;

    const existingEmail: Email = await knex.select('email').from('users').where('email', email).first();

    if (!existingEmail) {
      throw new NotFoundException('Email não cadastrado no sistema.')
    }

    this.mailerService.sendMail({
      to: email,
      from: `Joseph Dev <${process.env.EMAIL_USER}>`,
      subject: 'Teste de envio da API',
      text: 'Esta mensagem foi enviada com sucesso pela API.'
    });
  }
}
