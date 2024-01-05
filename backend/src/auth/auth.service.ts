import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRegistrationDto } from './dto/auth.registration.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.login.dto';
import { verify } from 'argon2';
import { RefreshTokenDto } from './dto/auth.refresh.dto';

type UserDataJwt = {
  email: string;
  userId: number;
  roles: string[];
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(dto: UserRegistrationDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user)
      throw new BadRequestException(
        'Пользователь с таким email уже зарегестрирован',
      );

    const createdUser = await this.userService.createUser(dto);
    return await this.generateToken(createdUser);
  }

  async login(dto: LoginDto) {
    const exist = await this.userService.getUserByEmail(dto.email);
    if (!exist)
      throw new BadRequestException('Пользователя с таким email не существует');

    const user = await this.validateUser(dto);

    return await this.generateToken(user);
  }

  private async validateUser(dto: LoginDto) {
    const exist = await this.userService.getUserByEmail(dto.email);
    if (!exist)
      throw new BadRequestException('Пользователя с таким email не существут');

    const user = await this.userService.getUserByIdWithPassword(exist.userId);

    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException('Неправильный пароль');

    return await this.userService.getUserById(user.userId);
  }

  private async generateToken(user: UserDataJwt) {
    const payload = {
      email: user.email,
      userId: user.userId,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const result = await this.jwtService.verifyAsync(dto.token);
    if (!result) throw new UnauthorizedException('Вход заблокирован');

    const user = await this.userService.getUserById(result.userId);

    const token = await this.generateToken(user);

    return {
      user: { ...user },
      ...token,
    };
  }
}
