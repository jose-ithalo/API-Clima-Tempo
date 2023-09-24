import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRETE,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
// eslint-disable-next-line prettier/prettier
export class LoginModule { }
