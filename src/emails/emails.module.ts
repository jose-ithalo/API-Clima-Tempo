import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
})
// eslint-disable-next-line prettier/prettier
export class EmailsModule { }
