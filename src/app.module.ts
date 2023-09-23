import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UsersModule, LoginModule],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
