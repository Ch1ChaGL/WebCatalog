import {
  BadRequestException,
  ForbiddenException,
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

    const token = await this.generateToken(createdUser);

    return {
      user: { ...createdUser },
      ...token,
    };
  }

  async login(dto: LoginDto) {
    const exist = await this.userService.getUserByEmail(dto.email);
    if (!exist)
      throw new BadRequestException('Пользователя с таким email не существует');

    const user = await this.validateUser(dto);

    const token = await this.generateToken(user);
    return {
      user: { ...user },
      ...token,
    };
  }

  private async validateUser(dto: LoginDto) {
    const exist = await this.userService.getUserByEmail(dto.email);
    if (!exist)
      throw new BadRequestException('Пользователя с таким email не существут');

    const user = await this.userService.getUserByIdWithPassword(exist.userId);

    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new ForbiddenException('Неправильный пароль');

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
    try {
      // Verify the refresh token
      const result = await this.jwtService.verifyAsync(dto.token);

      // Check if verification failed
      if (!result) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Fetch user details based on the userId from the verified token
      const user = await this.userService.getUserById(result.userId);

      // Check if the user exists
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate a new access token and refresh token
      const tokens = await this.generateToken(user);

      // Return the refreshed user and tokens
      return {
        user: { ...user }, // Assuming you want to include user details in the response
        ...tokens,
      };
    } catch (error) {
      // Handle any errors that occur during the refresh process
      throw new UnauthorizedException('Failed to refresh token', error.message);
    }
  }
}
