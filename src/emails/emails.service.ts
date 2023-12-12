import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailsService {
  findAll() {
    return `This action sends a message`;
  }
}
