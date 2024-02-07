import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [UsersModule, LoginModule, EmailsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'users/', method: RequestMethod.PUT },
        { path: 'users/cities', method: RequestMethod.PATCH },
        { path: 'users/detach', method: RequestMethod.PATCH },
        { path: 'users/:id', method: RequestMethod.DELETE },
        { path: 'users/user', method: RequestMethod.GET },
        { path: 'users/cities', method: RequestMethod.GET },
      );
  }
}
