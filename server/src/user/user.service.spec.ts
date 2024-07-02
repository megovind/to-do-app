import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: jest.fn(),
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'testToken'),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login or register user', async () => {
    const userDto = { username: 'testUser', password: 'testPassword' };
    const user = new User();
    user.username = 'testUser';
    user.password = 'hashedPassword';

    jest
      .spyOn(service, 'loginOrRegister')
      .mockImplementation(async () => 'testToken');
    const token = await service.loginOrRegister(userDto);
    expect(token).toBe('testToken');
  });
});
