import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/config';
import { JwtStrategy } from 'src/auth/jwt-strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
