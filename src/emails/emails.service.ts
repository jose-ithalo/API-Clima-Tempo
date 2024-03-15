/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { knex } from 'src/dataBase/connection';
// import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { CreateEmailDto } from './dto/create-email.dto';
import { Email } from './entities/email.entity';
import { ForgotPass } from './htmls/ForgotPass';

@Injectable()
export class EmailsService {
  constructor(private configService: ConfigService) { }

  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });

    return transporter
  }

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

    const htmlContent = htmlBody.createBody();

    const transport = this.mailTransport()

    const mailOption = {
      to: email,
      from: `Clima Tempo <${this.configService.get<string>('EMAIL_USER')}>`,
      subject: 'Redefinição de Senha',
      html: htmlContent
    };

    try {
      await transport.sendMail(mailOption)
    } catch (error) {
      console.log(error);

    }

    return 'Mensagem enviada!'
  }

}
