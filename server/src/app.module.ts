import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { MONGODB_URI } from './config/config';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    UserModule,
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {}
