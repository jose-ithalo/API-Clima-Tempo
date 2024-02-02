/* eslint-disable prettier/prettier */
import { Controller, Body, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';


@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) { }

  @Post()
  sendMail(@Body() createEmailDto: CreateEmailDto) {
    return this.emailsService.sendMail(createEmailDto);
  }
}
