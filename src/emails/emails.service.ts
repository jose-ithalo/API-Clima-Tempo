/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';

import { knex } from 'src/dataBase/connection';
import { MailerService } from '@nestjs-modules/mailer';

import { Email } from './entities/email.entity';

@Injectable()
export class EmailsService {
  constructor(private mailerService: MailerService) { }

  async sendMail(createEmailDto: CreateEmailDto): Promise<string> {
    const { email } = createEmailDto;

    const existingEmail: Email = await knex.select('email').from('users').where('email', email).first();

    if (!existingEmail) {
      throw new NotFoundException('Email não cadastrado no sistema.');
    }

    const htmlBody: string = `<!DOCTYPE html>
    <html lang="pt-br">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <title>Email</title>
    </head>
    
    <body>
        <div style="display: flex; align-items: center; flex-direction: column;
            margin: auto; height: auto; max-width: 600px;">
            <h1 style="color: #00008b; font-family: Verdana, Geneva; font-size: 170%; margin-top: 10px;">
                Clima Tempo
            </h1>
            <p style="font-size: 120%; font-family: Roboto, sans-serif; font-weight: 400; text-align: center;">
                Você recebeu este email porque optou pela redifinição de senha.<br />
                Clique no botão abaixo para trocá-la
            </p>
            <a href="https://www.youtube.com/" target="_blank" style="margin-bottom: 20px;">
                <button style=" background-color: #0575E6; border: transparent; border-radius: 30px; 
                color: #fff; cursor: pointer; font-family: Roboto, sans-serif; padding: 12px 50px;">
                    Trocar
                </button>
            </a>
        </div>
    </body>
    
    </html>`

    this.mailerService.sendMail({
      to: email,
      from: `Joseph Dev <${process.env.EMAIL_USER}>`,
      subject: 'Teste de envio da API',
      html: htmlBody
    });

    return 'Mensagem enviada!'
  }
}
