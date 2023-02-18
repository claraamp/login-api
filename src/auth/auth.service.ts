import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto:AuthLoginDto) {
    const user = await this.validateUser(authLoginDto)

    const payload = {
      userId: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.userService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException
    }
    return user;
  } 
}
