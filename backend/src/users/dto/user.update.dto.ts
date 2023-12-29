import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
  firstName: string;
  lastName: string;

  @MinLength(5, { message: 'Длинна никнейма должна быть больше 5 символов' })
  @MaxLength(30, { message: 'Длинна никнейма должна быть меньше 30 символов' })
  nickname: string;

  @IsEmail()
  email: string;

  @MinLength(5, { message: 'Пароль должен содержать больше 5 символов' })
  password: string;

  roles: string[];
}
