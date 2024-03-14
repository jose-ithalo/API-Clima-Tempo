/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { knex } from 'src/dataBase/connection';
import { MailerService } from '@nestjs-modules/mailer';

import { CreateEmailDto } from './dto/create-email.dto';
import { Email } from './entities/email.entity';
import { ForgotPass } from './htmls/ForgotPass';

@Injectable()
export class EmailsService {
  constructor(private mailerService: MailerService) { }

  async sendMail(createEmailDto: CreateEmailDto): Promise<string> {
    const { email } = createEmailDto;

    const existingEmail: Email = await knex.select('email').from('users').where('email', email).first();

    if (!existingEmail) {
      throw new NotFoundException('Email não cadastrado no sistema.');
    }

    const htmlBody = new ForgotPass();

    htmlBody.createCode();

    await knex('users').update({
      reset_key: htmlBody.msgKey
    }).where({ email });

    // const htmlContent = htmlBody.createBody();

    this.mailerService.sendMail({
      to: email,
      from: `Clima Tempo <${process.env.EMAIL_USER}>`,
      subject: 'Redefinição de Senha',
      // html: htmlContent
      text: 'Testando app'
    });

    return 'Mensagem enviada!'
  }

}
