/* eslint-disable prettier/prettier */
import { Controller, Get, Body } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';


@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) { }

  @Get()
  sendMail(@Body() createEmailDto: CreateEmailDto) {
    return this.emailsService.sendMail(createEmailDto);
  }

}
