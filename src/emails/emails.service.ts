/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {
  constructor(private mailerService: MailerService) { }

  sendMail(createEmailDto: CreateEmailDto): void {
    const { email } = createEmailDto;

    this.mailerService.sendMail({
      to: email,
      from: `Joseph Dev <${process.env.EMAIL_USER}>`,
      subject: 'Teste de envio da API',
      text: 'Esta mensagem foi enviada com sucesso pela API.'
    });
  }
}
