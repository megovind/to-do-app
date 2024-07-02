import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, UserResponseDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id);
    return {
      userId: user._id.toString(),
      username: user.username,
      fullName: user.fullName,
    };
  }

  async loginOrRegister(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    let user = await this.userModel.findOne({
      username: loginUserDto.username,
    });

    if (!user) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(loginUserDto.password, salt);
      user = new this.userModel({
        username: loginUserDto.username,
        password: hashedPassword,
      });
      await user.save();
    }

    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      userId: user._id.toString(),
      username: user.username,
      fullName: user.fullName,
    };
  }
}
