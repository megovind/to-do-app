export class LoginUserDto {
  readonly username: string;
  readonly password: string;
}

export class RegisterUserDto {
  readonly username: string;
  readonly password: string;
  readonly fullName: string;
}

export class UserResponseDto {
  readonly userId: string;
  readonly accessToken?: string;
  readonly username: string;
  readonly fullName: string;
}

export class UserDto {
  readonly userId: string;
  readonly username: string;
  readonly fullName?: string;
}
